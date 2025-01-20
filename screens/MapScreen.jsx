
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Button,Image, StyleSheet, TouchableOpacity, ImageBackground, FlatList, TouchableWithoutFeedback, BackHandler, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavigation from '../components/BottomNavigation';
import UpperBarTitle from '../components/UpperBarTitle';
import SectionInfo from '../components/SectionInfo';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ProgressCircle from 'react-native-progress-circle';
import firestore from "@react-native-firebase/firestore";
import { setMCQData, setcurrentMCQlevel } from '../redux/features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';


const MapScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isMaxLevelOutOfView, setIsMaxLevelOutOfView] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up'); // Default to 'up'
  const [selectedLevel, setSelectedLevel] = useState(null); // State for selected level
  const [fetchingLevel, setFetchingLevel] = useState(null); // State for selected level

  const levelsUnlocked = useSelector(state => state.user.userData.levelsUnlocked);

  const levels = Array.from({ length: 63 }, (_, i) => ({
    id: i + 1,
    title: `${i + 1}`,
    isUnlocked: i < levelsUnlocked, // Unlock only the first item initially
  }));

  const flatListRef = useRef(null);

  const scrollToTheLevel = () => {
    if (flatListRef.current) {
      let indexx = levelsUnlocked;
      if (indexx == 1 || indexx == 2 || indexx == 3) {
        flatListRef.current.scrollToIndex({ index: 1, animated: true });
      } else if (indexx <= 62) {
        flatListRef.current.scrollToIndex({ index: indexx - 2, animated: true });
      } else {
        flatListRef.current.scrollToIndex({ index: 1, animated: true });
      }
    }
  }

  useEffect(() => {
    // Automatically scroll to item at index 9 when the FlatList is rendered
    scrollToTheLevel();
  }, []);


  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit World',
        'Are you sure, you dont wanna explore more?',
        [
          { text: 'No', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() }, // Exits the app if "Yes" is pressed
        ]
      );
      return true; // Prevent default back action
    };

    // Add the event listener for the back press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);


  const handleLevelPress = (level) => {
    setSelectedLevel(level); // Show the chat box for the pressed level
  };

  const handleClose = () => {
    setSelectedLevel(null); // Hide the chat box
  };


  const [currentUnit, setCurrentUnit] = useState(1); // Track current unit number
  const [currentSection, setCurrentSection] = useState(1);

  // This function will be called when the viewable items (levels) change during scrolling
  // const onViewableItemsChanged = ({ viewableItems }) => {

  //   const isMaxLevelVisible = viewableItems.some(item => item.index === levelsUnlocked);
  //   setIsMaxLevelOutOfView(!isMaxLevelVisible);

  //   const firstVisibleItem = viewableItems[0]; // Get the first visible level
  //   if (firstVisibleItem) {
  //     const visibleIndex = firstVisibleItem.index;
  //     const newUnit = Math.floor(visibleIndex / 7) + 1; // Assuming each unit has 7 levels
  //     setCurrentUnit(newUnit); // Update the current unit number
  //   }
  // };

// Create a ref to store the previous index
const previousIndexRef = useRef(null);

const onViewableItemsChanged = useCallback(({ viewableItems }) => {
  const isMaxLevelVisible = viewableItems.some(item => item.index === levelsUnlocked);
  setIsMaxLevelOutOfView(!isMaxLevelVisible);

  const firstVisibleItem = viewableItems[0];
  if (firstVisibleItem) {
    const visibleIndex = firstVisibleItem.index;
    const newUnit = Math.floor(visibleIndex / 7) + 1; // Assuming each unit has 7 levels
    setCurrentUnit(newUnit);

    // Track scroll direction by comparing with the previous index
    if (previousIndexRef.current !== null) {
      if (visibleIndex > previousIndexRef.current) {
        setScrollDirection('down'); // Scrolling down
      } else if (visibleIndex < previousIndexRef.current) {
        setScrollDirection('up'); // Scrolling up
      }
    }

    // Update the previous index for the next render
    previousIndexRef.current = visibleIndex;
  }
}, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // The item must be 50% visible before considered "viewable"
  };

  const handleContinue = () => {
    console.log('Continue button pressed');
  };

  const calculateChatBoxPosition = (index) => {
    // Adjust the multiplier and offset as needed for your layout
    const offsetX = -25 // Offset from the left of the screen
    const waveWidth = 40; // Width adjustment based on your wave calculation
    const position = Math.sin(index * 0.5 * (Math.PI / 180)) * waveWidth;

    return position + offsetX - 39; // Return calculated position
  };

  const getChatBoxStyle = (index) => {
    const basePosition = 80; // Base position for the chat box
    const adjustment = index % 7 === 6 ? -20 : 0; // Adjust downward if it's the last level of a unit

    return {
      left: calculateChatBoxPosition(index), // Call your position calculation
      top: basePosition + adjustment, // Adjust position
    };
  };

  const handleStart = async (index) => {
    setLoading(true); // Show loading animation
    setFetchingLevel(index+1);


    // Add 1 to make the index 1-based
    const adjustedIndex = index + 1;

    // Calculate unitId (1-based) and levelId (1-based)
    const unitId = Math.ceil(adjustedIndex / 7);
    const levelId = adjustedIndex % 7 === 0 ? 7 : adjustedIndex % 7;

    try {
      // Check if data exists in AsyncStorage with unique key based on unit and level
      // const mcqDataKey = `mcqData-unit${unitId}-level${levelId}`;
      // const mcqDataFromStorage = await AsyncStorage.getItem(mcqDataKey);

      // if (mcqDataFromStorage) {
      // If data is available, parse and dispatch it to Redux
      // const mcqData = JSON.parse(mcqDataFromStorage);
      // dispatch(setMCQData(mcqData));
      // } else {
      // If data is not available, fetch from Firebase
      const mcqDataArray = [];
      const questionsRef = firestore()
        .collection("sections")
        .doc("section1") // Replace with actual sectionId if needed
        .collection("units")
        .doc(`unit${unitId}`)
        .collection("levels")
        .doc(`l${levelId}`)
        .collection("questions");

      const snapshot = await questionsRef.get();
      snapshot.forEach((doc) => {
        mcqDataArray.push(doc.data());
      });
      console.log('fetched questions:, unitId, levelid',mcqDataArray, unitId,levelId, );
      // Store the fetched data in AsyncStorage and Redux
      // await AsyncStorage.setItem(mcqDataKey, JSON.stringify(mcqDataArray));
      dispatch(setMCQData(mcqDataArray));
      dispatch(setcurrentMCQlevel(index+1));

      // }
    } catch (error) {
      console.error("Error fetching MCQ data:", error);
    } finally {
      setLoading(false); // Hide loading animation after data is fetched
      setFetchingLevel(-1);
      navigation.navigate('McqScreen');
      setSelectedLevel(null);
    }
  };



  return (
    <Layout navigation={navigation} selected="MapScreen">
      {/* <TouchableWithoutFeedback onPress={handleClose}> */}

      <View style={styles.container}>
        <LinearGradient
          colors={['#0D0D0D', '#0D0D0D', '#0D0D0D', '#1B1B1B', '#333333', '#333333']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <UpperBarTitle currentUnit={currentUnit} currentSection={currentSection} />
          {/* <View style={{flex:1, backgroundColor:'transparent', marginBottom:40, paddingBottom:30}}>
          <View style={{flex:1,position: 'relative', top: 100, backgroundColor:'white', marginTop:90}}> */}
          <FlatList
            style={{ paddingVertical: 210 }} // Add padding to the top of the FlatList

            data={levels}
            onScroll={handleClose}
            ref={flatListRef}
            keyExtractor={(item) => item.id.toString()}
            onScrollToIndexFailed={(info) => {
              // Attempt to scroll again after a small delay
              flatListRef.current?.scrollToOffset({
                offset: info.averageItemLength * info.index,
                animated: true,
              });
              setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
              }, 100); // Adjust delay as needed
            }}
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.wholeContainer}>
                  {/* Display a unit divider every 7 levels */}
                  {index % 7 === 0 && index !== 0 && (
                    <View style={styles.unitDividerContainer}>
                      <View style={styles.horizontalLine} />
                      <Text style={styles.unitText}>Unit {Math.floor(index / 7) + 1}</Text>
                      <View style={styles.horizontalLine} />

                    </View>
                  )}
                  <View
                    style={[
                      styles.levelContainer,
                      {
                        transform: [{ translateX: Math.sin(index * 50 * (Math.PI / 180)) * 60 }],
                        zIndex: index,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.levelButton,
                        item.isUnlocked ? styles.unlocked : styles.locked,
                        !item.isUnlocked && styles.disabledButton, // Apply opacity for locked levels
                      ]}
                      onPress={() => setSelectedLevel(index + 1)}
                    // disabled={!item.isUnlocked}
                    >
                      {/* Level Icon */}
                      <ImageBackground
                        source={
                          item.isUnlocked
                            ? require('../assets/lockopen-removebg.png')
                            : require('../assets/lockclose-removebg.png')
                        }
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 40 }}
                      />
                      {/* Level Number Label */}
                      <Text style={styles.levelText}>Level {index + 1}</Text>
                    </TouchableOpacity>

                    {/* Chat-like Popup Box */}
                    {(selectedLevel === index + 1) && (
                      <View>
                      <TouchableWithoutFeedback onPress={handleClose} onPressOut={handleClose}>
                        <View style={[styles.chatBox, { left: calculateChatBoxPosition(selectedLevel - 1), zIndex: 9 }]}>
                          {/* Title */}
                          <Text style={styles.chatTitle}>
                            {selectedLevel === 1 ? "Awareness" : `Level ${selectedLevel}`}
                          </Text>

                          {/* Level Display */}
                          <Text style={styles.chatLevel}>Level: {selectedLevel}</Text>

                          {/* Dynamic Button */}
                          {levels[selectedLevel - 1]?.isUnlocked ? (
                            <View>
                            {(loading && (selectedLevel == fetchingLevel)) ? 
                              (
                                <View style={styles.loadingContainer}>
                                  {/* Display the GIF as the loading indicator */}
                                  <FastImage
                                    // source={require('../assets/loader.gif')} // Use your local GIF file here
                                    source={{
                                      uri: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_square_large.gif',
                                      headers: { Authorization: 'someAuthToken' },
                                      priority: FastImage.priority.normal,
                                  }}
                                    style={styles.gifStyle}
                                    resizeMode={FastImage.resizeMode.contain}
                                  />
                                  {/* <Text style={styles.loadingText}>Loading...</Text> */}
                                </View>
                              )
                              :
                              <Button style={styles.startButton} title="Start" onPress={() => handleStart(index)} 
                              color="#FFC107"
                               />
                            }
                            </View>

                          ) : (
                            <Button style={styles.lockedButton} title="Locked"
                             color="#607D8B" 
                            // disabled 
                            />
                          )}

                          {/* Arrow for pointing to level */}
                          <View style={styles.arrow} />
                          
                        </View>
                      </TouchableWithoutFeedback>
                      </View>

                    )}

                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged} // Track viewable items
            viewabilityConfig={viewabilityConfig} // Viewability configuration
            ListFooterComponent={
              <SectionInfo
                sectionNumber={2}
                description="Learn words, phrases, and grammar concepts for basic interactions"
                onContinue={handleContinue}
                isCompleted={false} // Change this to true if all units are unlocked
              />
            }
          />

          {/* Conditionally render the button if max level is out of view */}
          {isMaxLevelOutOfView && (
            <TouchableOpacity style={styles.scrollButton} onPress={scrollToTheLevel}>
              {scrollDirection === 'up' ? (
                <Icon name="arrow-down" size={20} color="#fff" style={styles.icon} />
              ) : (
                <Icon name="arrow-up" size={20} color="#fff" style={styles.icon} />
              )}
            </TouchableOpacity>
          )}


          {/* </View>
          </View> */}
        </LinearGradient>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingBottom: 70,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifStyle: {
    width: 20, // Adjust size
    height: 20, // Adjust size
  },
  levelContainer: {
    position: 'relative',
    marginVertical: 12,
    // backgroundColor:'white',
    // width:"100%"
  },
  wholeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'white',
    // paddingTop:20,
  },
  levelButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 3,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  unlocked: {
    backgroundColor: '#00FFCC',
    borderColor: '#00BFA5',
  },
  locked: {
    backgroundColor: '#2e2e2e',
    borderColor: '#505050',
  },
  disabledButton: {
    opacity: 0.6, // Dimmed appearance for locked levels
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 'auto',
    borderRadius: 40,
    left: 4,
  },
  levelText: {
    position: 'absolute',
    bottom: -20,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  unitDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  unitText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#808080',
  },




  chatBox: {
    position: 'absolute',
    backgroundColor: '#1C1C1C', // Dark slate for a clean base
    borderRadius: 16, // More rounded edges for a modern look
    padding: 18,
    elevation: 8, // Balanced shadow depth
    width: 210, // Slightly wider box for better spacing
    alignItems: 'center',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#444', // Subtle border for contrast
    // bottom: -250, // Move the box higher by reducing this value
    top: -235,
    // right:100,
  },
  chatTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF9800', // Vibrant orange for a cheerful highlight
    textAlign: 'center',
    marginBottom: 8,
  },
  chatLevel: {
    fontSize: 14,
    color: '#DDD', // Light off-white for secondary text
    marginBottom: 16,
  },
  arrow: {
    position: 'absolute',
    top: '138%',
    left: '50%',
    marginLeft: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#444', // Matches the chat box
    // borderTopColor: '#1C1C1C', // Matches the chat box
    
  },
  buttonStyle: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50', // Bright green for "Start"
    color: '#FFF', // White text for clarity
    fontSize: 14,
    fontWeight: 'bold',
  },
  lockedButton: {
    backgroundColor: '#616161', // Mid-gray for "Locked"
    color: '#BDBDBD', // Softer gray for muted contrast
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  gifStyle: {
    width: 36,
    height: 36,
  },
  


  arrowWrapper: {
    position: 'absolute',
    top: '123%',
    left: '50%',
    marginLeft: -12, // Slightly larger to create the "border" effect
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#444', // Match the box's border color
  },
  arrowInner: {
    position: 'absolute',
    top: 2, // Offset to create the inner arrow
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1C1C1C', // Match the box's background color
  },

  

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    backgroundColor: 'transparent',      // Keep it transparent if preferred
    borderWidth: 2,                      // Define border width correctly
    borderColor: 'black',                // Set border color
    padding: 10,                         // Adjust padding for better touch area
    borderRadius: 15,                    // Make it circular if using only an icon
    alignItems: 'center',                // Center the icon
    justifyContent: 'center',            // Center the icon vertically
    shadowColor: '#000',                 // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,                        // Shadow for Android
    zIndex: 100000,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
});

export default MapScreen;










// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { View, Text, Button,Image, StyleSheet, TouchableOpacity, ImageBackground, FlatList, TouchableWithoutFeedback, BackHandler, Alert } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import BottomNavigation from '../components/BottomNavigation';
// import UpperBarTitle from '../components/UpperBarTitle';
// import SectionInfo from '../components/SectionInfo';
// import Layout from '../components/Layout';
// import Icon from 'react-native-vector-icons/FontAwesome';
// // import ProgressCircle from 'react-native-progress-circle';
// import firestore from "@react-native-firebase/firestore";
// import { setMCQData, setcurrentMCQlevel } from '../redux/features/userSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import FastImage from 'react-native-fast-image';


// const MapScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const [isMaxLevelOutOfView, setIsMaxLevelOutOfView] = useState(false);
//   const [scrollDirection, setScrollDirection] = useState('up'); // Default to 'up'
//   const [selectedLevel, setSelectedLevel] = useState(null); // State for selected level
//   const [fetchingLevel, setFetchingLevel] = useState(null); // State for selected level

//   const levelsUnlocked = useSelector(state => state.user.userData.levelsUnlocked);

//   const levels = Array.from({ length: 63 }, (_, i) => ({
//     id: i + 1,
//     title: `${i + 1}`,
//     isUnlocked: i < levelsUnlocked, // Unlock only the first item initially
//   }));

//   const flatListRef = useRef(null);

//   const scrollToTheLevel = () => {
//     if (flatListRef.current) {
//       let indexx = levelsUnlocked;
//       if (indexx == 1 || indexx == 2 || indexx == 3) {
//         flatListRef.current.scrollToIndex({ index: 1, animated: true });
//       } else if (indexx <= 62) {
//         flatListRef.current.scrollToIndex({ index: indexx - 2, animated: true });
//       } else {
//         flatListRef.current.scrollToIndex({ index: 1, animated: true });
//       }
//     }
//   }

//   useEffect(() => {
//     // Automatically scroll to item at index 9 when the FlatList is rendered
//     scrollToTheLevel();
//   }, []);


//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert(
//         'Exit World',
//         'Are you sure, you dont wanna explore more?',
//         [
//           { text: 'No', onPress: () => null, style: 'cancel' },
//           { text: 'Yes', onPress: () => BackHandler.exitApp() }, // Exits the app if "Yes" is pressed
//         ]
//       );
//       return true; // Prevent default back action
//     };

//     // Add the event listener for the back press
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

//     // Cleanup the event listener on component unmount
//     return () => backHandler.remove();
//   }, []);


//   const handleLevelPress = (level) => {
//     setSelectedLevel(level); // Show the chat box for the pressed level
//   };

//   const handleClose = () => {
//     setSelectedLevel(null); // Hide the chat box
//   };


//   const [currentUnit, setCurrentUnit] = useState(1); // Track current unit number
//   const [currentSection, setCurrentSection] = useState(1);

//   // This function will be called when the viewable items (levels) change during scrolling
//   // const onViewableItemsChanged = ({ viewableItems }) => {

//   //   const isMaxLevelVisible = viewableItems.some(item => item.index === levelsUnlocked);
//   //   setIsMaxLevelOutOfView(!isMaxLevelVisible);

//   //   const firstVisibleItem = viewableItems[0]; // Get the first visible level
//   //   if (firstVisibleItem) {
//   //     const visibleIndex = firstVisibleItem.index;
//   //     const newUnit = Math.floor(visibleIndex / 7) + 1; // Assuming each unit has 7 levels
//   //     setCurrentUnit(newUnit); // Update the current unit number
//   //   }
//   // };

// // Create a ref to store the previous index
// const previousIndexRef = useRef(null);

// const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//   const isMaxLevelVisible = viewableItems.some(item => item.index === levelsUnlocked);
//   setIsMaxLevelOutOfView(!isMaxLevelVisible);

//   const firstVisibleItem = viewableItems[0];
//   if (firstVisibleItem) {
//     const visibleIndex = firstVisibleItem.index;
//     const newUnit = Math.floor(visibleIndex / 7) + 1; // Assuming each unit has 7 levels
//     setCurrentUnit(newUnit);

//     // Track scroll direction by comparing with the previous index
//     if (previousIndexRef.current !== null) {
//       if (visibleIndex > previousIndexRef.current) {
//         setScrollDirection('down'); // Scrolling down
//       } else if (visibleIndex < previousIndexRef.current) {
//         setScrollDirection('up'); // Scrolling up
//       }
//     }

//     // Update the previous index for the next render
//     previousIndexRef.current = visibleIndex;
//   }
// }, []);

//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50, // The item must be 50% visible before considered "viewable"
//   };

//   const handleContinue = () => {
//     console.log('Continue button pressed');
//   };

//   const calculateChatBoxPosition = (index) => {
//     // Adjust the multiplier and offset as needed for your layout
//     const offsetX = -25 // Offset from the left of the screen
//     const waveWidth = 40; // Width adjustment based on your wave calculation
//     const position = Math.sin(index * 0.5 * (Math.PI / 180)) * waveWidth;

//     return position + offsetX - 6; // Return calculated position
//   };

//   const getChatBoxStyle = (index) => {
//     const basePosition = 80; // Base position for the chat box
//     const adjustment = index % 7 === 6 ? -20 : 0; // Adjust downward if it's the last level of a unit

//     return {
//       left: calculateChatBoxPosition(index), // Call your position calculation
//       top: basePosition + adjustment, // Adjust position
//     };
//   };

//   const handleStart = async (index) => {
//     setLoading(true); // Show loading animation
//     setFetchingLevel(index+1);


//     // Add 1 to make the index 1-based
//     const adjustedIndex = index + 1;

//     // Calculate unitId (1-based) and levelId (1-based)
//     const unitId = Math.ceil(adjustedIndex / 7);
//     const levelId = adjustedIndex % 7 === 0 ? 7 : adjustedIndex % 7;

//     try {
//       // Check if data exists in AsyncStorage with unique key based on unit and level
//       // const mcqDataKey = `mcqData-unit${unitId}-level${levelId}`;
//       // const mcqDataFromStorage = await AsyncStorage.getItem(mcqDataKey);

//       // if (mcqDataFromStorage) {
//       // If data is available, parse and dispatch it to Redux
//       // const mcqData = JSON.parse(mcqDataFromStorage);
//       // dispatch(setMCQData(mcqData));
//       // } else {
//       // If data is not available, fetch from Firebase
//       const mcqDataArray = [];
//       const questionsRef = firestore()
//         .collection("sections")
//         .doc("section1") // Replace with actual sectionId if needed
//         .collection("units")
//         .doc(`unit${unitId}`)
//         .collection("levels")
//         .doc(`l${levelId}`)
//         .collection("questions");

//       const snapshot = await questionsRef.get();
//       snapshot.forEach((doc) => {
//         mcqDataArray.push(doc.data());
//       });
//       console.log('fetched questions:, unitId, levelid',mcqDataArray, unitId,levelId, );
//       // Store the fetched data in AsyncStorage and Redux
//       // await AsyncStorage.setItem(mcqDataKey, JSON.stringify(mcqDataArray));
//       dispatch(setMCQData(mcqDataArray));
//       dispatch(setcurrentMCQlevel(index+1));

//       // }
//     } catch (error) {
//       console.error("Error fetching MCQ data:", error);
//     } finally {
//       setLoading(false); // Hide loading animation after data is fetched
//       setFetchingLevel(-1);
//       navigation.navigate('McqScreen');
//       setSelectedLevel(null);
//     }
//   };



//   return (
//     <Layout navigation={navigation} selected="MapScreen">
//       {/* <TouchableWithoutFeedback onPress={handleClose}> */}

//       <View style={styles.container}>
//         <LinearGradient
//           colors={['#0D0D0D', '#0D0D0D', '#0D0D0D', '#1B1B1B', '#333333', '#333333']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.gradient}
//         >
//           <UpperBarTitle currentUnit={currentUnit} currentSection={currentSection} />
//           {/* <View style={{flex:1, backgroundColor:'transparent', marginBottom:40, paddingBottom:30}}>
//           <View style={{flex:1,position: 'relative', top: 100, backgroundColor:'white', marginTop:90}}> */}
//           <FlatList
//             style={{ paddingVertical: 110 }} // Add padding to the top of the FlatList

//             data={levels}
//             onScroll={handleClose}
//             ref={flatListRef}
//             keyExtractor={(item) => item.id.toString()}
//             onScrollToIndexFailed={(info) => {
//               // Attempt to scroll again after a small delay
//               flatListRef.current?.scrollToOffset({
//                 offset: info.averageItemLength * info.index,
//                 animated: true,
//               });
//               setTimeout(() => {
//                 flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
//               }, 100); // Adjust delay as needed
//             }}
//             renderItem={({ item, index }) => (
//               <TouchableWithoutFeedback onPress={handleClose}>
//                 <View style={styles.wholeContainer}>
//                   {/* Display a unit divider every 7 levels */}
//                   {index % 7 === 0 && index !== 0 && (
//                     <View style={styles.unitDividerContainer}>
//                       <View style={styles.horizontalLine} />
//                       <Text style={styles.unitText}>Unit {Math.floor(index / 7) + 1}</Text>
//                       <View style={styles.horizontalLine} />

//                     </View>
//                   )}
//                   <View
//                     style={[
//                       styles.levelContainer,
//                       {
//                         transform: [{ translateX: Math.sin(index * 50 * (Math.PI / 180)) * 60 }],
//                         zIndex: index,
//                       },
//                     ]}
//                   >
//                     <TouchableOpacity
//                       style={[
//                         styles.levelButton,
//                         item.isUnlocked ? styles.unlocked : styles.locked,
//                         !item.isUnlocked && styles.disabledButton, // Apply opacity for locked levels
//                       ]}
//                       onPress={() => setSelectedLevel(index + 1)}
//                     // disabled={!item.isUnlocked}
//                     >
//                       {/* Level Icon */}
//                       <ImageBackground
//                         source={
//                           item.isUnlocked
//                             ? require('../assets/lockopen-removebg.png')
//                             : require('../assets/lockclose-removebg.png')
//                         }
//                         style={styles.backgroundImage}
//                         imageStyle={{ borderRadius: 40 }}
//                       />
//                       {/* Level Number Label */}
//                       <Text style={styles.levelText}>Level {index + 1}</Text>
//                     </TouchableOpacity>

//                     {/* Chat-like Popup Box */}
//                     {(selectedLevel === index + 1) && (
//                       <TouchableWithoutFeedback onPress={handleClose} onPressOut={handleClose}>
//                         <View style={[styles.chatBox, { left: calculateChatBoxPosition(selectedLevel - 1), top: -111, zIndex: 9 }]}>
//                           {/* Title */}
//                           <Text style={styles.chatTitle}>
//                             {selectedLevel === 1 ? "Awareness" : `Level ${selectedLevel}`}
//                           </Text>

//                           {/* Level Display */}
//                           <Text style={styles.chatLevel}>Level: {selectedLevel}</Text>

//                           {/* Dynamic Button */}
//                           {levels[selectedLevel - 1]?.isUnlocked ? (
//                             <View>
//                             {(loading && (selectedLevel == fetchingLevel)) ? 
//                               (
//                                 <View style={styles.loadingContainer}>
//                                   {/* Display the GIF as the loading indicator */}
//                                   <FastImage
//                                     // source={require('../assets/loader.gif')} // Use your local GIF file here
//                                     source={{
//                                       uri: 'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_square_large.gif',
//                                       headers: { Authorization: 'someAuthToken' },
//                                       priority: FastImage.priority.normal,
//                                   }}
//                                     style={styles.gifStyle}
//                                     resizeMode={FastImage.resizeMode.contain}
//                                   />
//                                   {/* <Text style={styles.loadingText}>Loading...</Text> */}
//                                 </View>
//                               )
//                               :
//                               <Button title="Start" onPress={() => handleStart(index)} color="#4CAF50" />
//                             }
//                             </View>

//                           ) : (
//                             <Button title="Locked" color="#B0BEC5" disabled />
//                           )}

//                           {/* Arrow for pointing to level */}
//                           <View style={styles.arrow} />
//                         </View>
//                       </TouchableWithoutFeedback>

//                     )}

//                   </View>
//                 </View>
//               </TouchableWithoutFeedback>
//             )}
//             showsVerticalScrollIndicator={false}
//             onViewableItemsChanged={onViewableItemsChanged} // Track viewable items
//             viewabilityConfig={viewabilityConfig} // Viewability configuration
//             ListFooterComponent={
//               <SectionInfo
//                 sectionNumber={2}
//                 description="Learn words, phrases, and grammar concepts for basic interactions"
//                 onContinue={handleContinue}
//                 isCompleted={true} // Change this to true if all units are unlocked
//               />
//             }
//           />

//           {/* Conditionally render the button if max level is out of view */}
//           {isMaxLevelOutOfView && (
//             <TouchableOpacity style={styles.scrollButton} onPress={scrollToTheLevel}>
//               {scrollDirection === 'up' ? (
//                 <Icon name="arrow-down" size={20} color="#fff" style={styles.icon} />
//               ) : (
//                 <Icon name="arrow-up" size={20} color="#fff" style={styles.icon} />
//               )}
//             </TouchableOpacity>
//           )}


//           {/* </View>
//           </View> */}
//         </LinearGradient>
//       </View>
//       {/* </TouchableWithoutFeedback> */}
//     </Layout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//     paddingBottom: 70,
//   },
//   loadingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gifStyle: {
//     width: 20, // Adjust size
//     height: 20, // Adjust size
//   },
//   levelContainer: {
//     position: 'relative',
//     marginVertical: 12,
//     // backgroundColor:'white',
//     // width:"100%"
//   },
//   wholeContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor:'white',
//     // paddingTop:20,
//   },
//   levelButton: {
//     width: 80,
//     height: 80,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 40,
//     borderWidth: 3,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//   },
//   unlocked: {
//     backgroundColor: '#00FFCC',
//     borderColor: '#00BFA5',
//   },
//   locked: {
//     backgroundColor: '#2e2e2e',
//     borderColor: '#505050',
//   },
//   disabledButton: {
//     opacity: 0.6, // Dimmed appearance for locked levels
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '90%',
//     height: 'auto',
//     borderRadius: 40,
//     left: 4,
//   },
//   levelText: {
//     position: 'absolute',
//     bottom: -20,
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   unitDividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 30,
//   },
//   unitText: {
//     color: '#fff',
//     fontSize: 16,
//     marginHorizontal: 10,
//   },
//   horizontalLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#808080',
//   },


//   chatBox: {
//     position: 'absolute',
//     backgroundColor: '#2e2e2e', // Dark background color
//     borderRadius: 8,
//     padding: 10,
//     elevation: 6, // More shadow depth for Android
//     width: 160, // Slightly wider for spacing
//     alignItems: 'center',
//     zIndex: 100,
//     shadowColor: '#000', // Shadow for iOS
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   chatTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#FFF', // White text for contrast
//     textAlign: 'center',
//   },
//   chatLevel: {
//     marginTop: 8,
//     fontSize: 14,
//     color: '#B0BEC5', // Light gray for subtext
//   },
//   arrow: {
//     position: 'absolute',
//     top: '123%', // Position directly below the chat box
//     left: '50%',
//     marginLeft: -10, // Center the arrow
//     width: 0,
//     height: 0,
//     borderLeftWidth: 10,
//     borderRightWidth: 10,
//     borderTopWidth: 10,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: '#2e2e2e', // Same color as chat box
//   },
//   buttonStyle: {
//     marginTop: 10,
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   startButton: {
//     backgroundColor: '#4CAF50', // Green for "Start"
//   },
//   lockedButton: {
//     backgroundColor: '#B0BEC5', // Gray for "Locked"
//   },
//   buttonText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   scrollButton: {
//     position: 'absolute',
//     bottom: 80,
//     right: 30,
//     backgroundColor: 'transparent',      // Keep it transparent if preferred
//     borderWidth: 2,                      // Define border width correctly
//     borderColor: 'black',                // Set border color
//     padding: 10,                         // Adjust padding for better touch area
//     borderRadius: 15,                    // Make it circular if using only an icon
//     alignItems: 'center',                // Center the icon
//     justifyContent: 'center',            // Center the icon vertically
//     shadowColor: '#000',                 // Add shadow for depth
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,                        // Shadow for Android
//     zIndex: 100000,
//   },
//   horizontalLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#FFFFFF',
//     opacity: 0.5,
//   },
// });

// export default MapScreen;









