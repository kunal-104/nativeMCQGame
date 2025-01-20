import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Modal, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavigation from '../components/BottomNavigation';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../redux/features/userSlice';
import firestore from '@react-native-firebase/firestore'; 
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProfilePage = () => {
  const { height } = Dimensions.get('window');
  const navigation = useNavigation();
  const name = useSelector(state => state.user.userData.name);
  const username = useSelector(state => state.user.userData.username);
  const avataar = useSelector(state => state.user.userData.avatar);
  
  const following = useSelector(state => state.user.userData.following);
  const followers = useSelector(state => state.user.userData.followers);
  const streak = useSelector(state => state.user.userData.streak);
  const xp = useSelector(state => state.user.userData.xp);
  const mobileNumber = useSelector(state => state.user.userData.mobileNumber);
  
  const dateJoin = useSelector(state => state.user.userData.dateJoined);

  // Convert dateJoined to a Date object
const date = new Date(dateJoin);

// Format to show only month and year
const options = { month: 'long', year: 'numeric' };
const dateJoined = date.toLocaleDateString('en-US', options);

  const dispatch = useDispatch(); // Initialize Redux dispatch
  // Avatar images array
  const avatars = [
    require('../assets/avatar/avatar0.jpg'),
    require('../assets/avatar/avatar1.jpg'),
    require('../assets/avatar/avatar2.jpg'),
    require('../assets/avatar/avatar3.jpg'),
    require('../assets/avatar/avatar4.jpg'),
    require('../assets/avatar/avatar5.jpg'),
    require('../assets/avatar/avatar6.jpg'),
    require('../assets/avatar/avatar7.jpg'),
    require('../assets/avatar/avatar8.jpg'),
    require('../assets/avatar/avatar9.jpg'),
    require('../assets/avatar/avatar10.jpg'),
    require('../assets/avatar/avatar11.jpg'),
    require('../assets/avatar/avatar12.jpg'),
    require('../assets/avatar/avatar13.jpg'),
    require('../assets/avatar/avatar14.jpg'),
    require('../assets/avatar/avatar15.jpg'),
    require('../assets/avatar/avatar16.jpg'),
    require('../assets/avatar/avatar17.jpg'),
    require('../assets/avatar/avatar18.jpg'),
    require('../assets/avatar/avatar19.jpg'),
    require('../assets/avatar/avatar20.jpg'),
    require('../assets/avatar/avatar21.jpg'),
    require('../assets/avatar/avatar22.jpg'),
    require('../assets/avatar/avatar23.jpg'),
    require('../assets/avatar/avatar24.jpg'),
    require('../assets/avatar/avatar25.jpg'),
  ];

  // Avatar selection modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle avatar selection
  const handleAvatarSelect = async (newAvatarIndex) => {
    // Get the mobile number or unique identifier for the user
  
    try {
      // Update the avatar field in the user's document
      await firestore()
        .collection('users')
        .doc(mobileNumber)
        .update({
          avatar: newAvatarIndex, // Update the avatar field with the new value
        });
        // AsyncStorage: Merge and save updated data
        const existingSession = await AsyncStorage.getItem('userSession');
        const sessionData = existingSession ? JSON.parse(existingSession) : {};

        await AsyncStorage.setItem(
          'userSession',
          JSON.stringify({
            ...sessionData,
            avatar: newAvatarIndex,
          })
        );
  
      // If Firestore update is successful, dispatch the Redux action to update the avatar in local state
      dispatch(setAvatar(newAvatarIndex));
      setModalVisible(false); // Close modal after selection
    } catch (error) {
      console.error('Error updating avatar in Firestore:', error);
      // Optionally handle the error, such as showing a notification to the user
    }
  };

  useEffect(() => {
    const backAction = () => {
      // Alert.alert(
      //   'Exit World',
      //   'Are you sure, you dont wanna explore more?',
      //   [
      //     { text: 'No', onPress: () => null, style: 'cancel' },
      //     { text: 'Yes', onPress: () => BackHandler.exitApp() }, // Exits the app if "Yes" is pressed
      //   ]
      // );
      navigation.navigate('MapScreen');
      return true; // Prevent default back action
    };

    // Add the event listener for the back press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  return (
    <Layout navigation={navigation} selected="ProfileScreen">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
        >
          {/* Settings Icon */}
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
            <Icon name="settings-outline" size={28} color="#fff" />
          </TouchableOpacity>

          {/* User Info Section */}
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View>
                <Image source={avatars[avataar]} style={styles.avatar} resizeMode="contain" />
              </View>
            </TouchableOpacity>

            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userHandle}>{username}</Text>
            <Text style={styles.joinedDate}>Joined {dateJoined}</Text>

            {/* Follow Info */}
            <View style={styles.followInfo}>
              <Text style={styles.followText}>{following} Following</Text>
              <Text style={styles.followText}>{followers} Followers</Text>
            </View>

            {/* Add Friends Button */}
            <TouchableOpacity style={styles.addFriendButton} onPress={()=> navigation.navigate('FindFriendsScreen')}>
              <Icon name="person-add-outline" size={20} color="#00FFCC" />
              <Text style={styles.addFriendText}>ADD FRIENDS</Text>
            </TouchableOpacity>
          </View>

          {/* Statistics Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Icon name="flame-outline" size={25} color="#FFA726" />
              <Text style={styles.statNumber}>{streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="flash-outline" size={25} color="#FFC107" />
              <Text style={styles.statNumber}>{xp}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="leaf-outline" size={25} color="#66BB6A" />
              <Text style={styles.statNumber}>Emerald</Text>
              <Text style={styles.statLabel}>Current League</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="podium-outline" size={25} color="#FFD700" />
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Top 3 Finishes</Text>
            </View>
          </View>
        </ScrollView>

        {/* Avatar Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Choose Your Avatar</Text>
              <View style={styles.avatarOptions}>
                {avatars.map((avt, index) => (
                  <TouchableOpacity key={index} onPress={() => handleAvatarSelect(index)}>
                    <Image source={avt} style={styles.avatarOption} />
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </Layout>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    paddingBottom:70,
    
  },
  scrollContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  avatar: {
    // width: '50%',
    width: 250,    // Set a fixed width
    height: 250,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
    resizeMode: ''
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userHandle: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 2,
  },
  joinedDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  followInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 10,
  },
  followText: {
    fontSize: 16,
    color: '#00FFCC',
    fontWeight: '600',
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  addFriendText: {
    color: '#00FFCC',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginBottom: 80,
  },
  statBox: {
    backgroundColor: '#262626',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    marginVertical: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  // Modal styles
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  avatarOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  avatarOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeModalText: {
    color: '#00FFCC',
    fontSize: 16,
  },
});

export default ProfilePage;



// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import BottomNavigation from '../components/BottomNavigation';

// const avatarOptions = [
//   require('../assets/avatar/avatar.jpg'), // Add more avatars here
//   require('../assets/avatar/avatar1.jpg'),
//   require('../assets/avatar/avatar2.jpg'),
//   require('../assets/avatar/avatar3.jpg'),
//   require('../assets/avatar/avatar4.jpg'),
//   require('../assets/avatar/avatar5.jpg'),
//   require('../assets/avatar/avatar6.jpg'),
//   require('../assets/avatar/avatar7.jpg'),
//   require('../assets/avatar/avatar8.jpg'),
//   require('../assets/avatar/avatar9.jpg'),
//   require('../assets/avatar/avatar10.jpg'),
//   require('../assets/avatar/avatar11.jpg'),
//   require('../assets/avatar/avatar12.jpg'),
//   require('../assets/avatar/avatar13.jpg'),
//   require('../assets/avatar/avatar14.jpg'),
//   require('../assets/avatar/avatar15.jpg'),
//   require('../assets/avatar/avatar16.jpg'),
//   require('../assets/avatar/avatar17.jpg'),
//   require('../assets/avatar/avatar18.jpg'),
//   require('../assets/avatar/avatar19.jpg'),
//   require('../assets/avatar/avatar20.jpg'),
//   require('../assets/avatar/avatar21.jpg'),
//   require('../assets/avatar/avatar22.jpg'),
// ];

// const ProfilePage = () => {
//   const [selectedAvatar, setSelectedAvatar] = useState(require('../assets/avatar/avatar.jpg')); // Default avatar
//   const { height } = Dimensions.get('window');

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {/* Settings Icon */}
//         <TouchableOpacity style={styles.settingsButton}>
//           <Icon name="settings-outline" size={30} color="#ccc" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* User Info Section */}
//         <View style={styles.userInfo}>
//           <Image source={selectedAvatar} style={styles.avatar} />
//           <Text style={styles.userName}>Kunal</Text>
//           <Text style={styles.userHandle}>kunal_104</Text>
//           <Text style={styles.joinedDate}>Joined June 2023</Text>

//           {/* Follow Info */}
//           <View style={styles.followInfo}>
//             <Text style={styles.followText}>12 Following</Text>
//             <Text style={styles.followText}>15 Followers</Text>
//           </View>

//           {/* Add Friends Button */}
//           <TouchableOpacity style={styles.addFriendButton}>
//             <Icon name="person-add-outline" size={20} color="#00FFCC" />
//             <Text style={styles.addFriendText}>ADD FRIENDS</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Avatar Selection Section */}
//         <Text style={styles.sectionTitle}>Choose Your Avatar</Text>
//         <FlatList
//           data={avatarOptions}
//           horizontal
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => setSelectedAvatar(item)}>
//               <Image source={item} style={styles.avatarOption} />
//             </TouchableOpacity>
//           )}
//         />

//         {/* Statistics Section */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statBox}>
//             <Icon name="flame-outline" size={25} color="#FFA726" />
//             <Text style={styles.statNumber}>296</Text>
//             <Text style={styles.statLabel}>Day Streak</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Icon name="flash-outline" size={25} color="#FFC107" />
//             <Text style={styles.statNumber}>12031</Text>
//             <Text style={styles.statLabel}>Total XP</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Icon name="leaf-outline" size={25} color="#66BB6A" />
//             <Text style={styles.statNumber}>Emerald</Text>
//             <Text style={styles.statLabel}>Current League</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Icon name="podium-outline" size={25} color="#FFD700" />
//             <Text style={styles.statNumber}>1</Text>
//             <Text style={styles.statLabel}>Top 3 Finishes</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Global Bottom Navigation */}
//       <BottomNavigation />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1B1B1B',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   settingsButton: {
//     padding: 10,
//   },
//   scrollContainer: {
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   userInfo: {
//     alignItems: 'center',
//   },
//   avatar: {
//     width: '50%',
//     aspectRatio: 1,
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: '#fff',
//     marginBottom: 10,
//   },
//   avatarOption: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginHorizontal: 10,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   userHandle: {
//     fontSize: 16,
//     color: '#aaa',
//     marginTop: 2,
//   },
//   joinedDate: {
//     fontSize: 14,
//     color: '#666',
//     marginVertical: 5,
//   },
//   followInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '60%',
//     marginVertical: 10,
//   },
//   followText: {
//     fontSize: 16,
//     color: '#00FFCC',
//     fontWeight: '600',
//   },
//   addFriendButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#333',
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   addFriendText: {
//     color: '#00FFCC',
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: '#fff',
//     marginVertical: 20,
//     textAlign: 'center',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//     marginBottom: 80,
//   },
//   statBox: {
//     backgroundColor: '#262626',
//     padding: 15,
//     borderRadius: 10,
//     width: '48%',
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#aaa',
//     marginTop: 5,
//     textAlign: 'center',
//   },
// });

// export default ProfilePage;
