import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, BackHandler } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import Layout from '../components/Layout';
const BarBellScreen = ({navigation}) => {
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
    <Layout navigation={navigation}   selected ="BarBellScreen">
    
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Today's Review Section */}
        <View style={styles.reviewContainer}>
          <Text style={styles.sectionTitle}>Today's Review</Text>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Listen-Up</Text>
              <Text style={styles.cardSubtitle}>
                Sharpen your ear with focused listening practice
              </Text>
              <TouchableOpacity style={styles.unlockButton}>
                <Text style={styles.unlockButtonText}>UNLOCK</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/avatar/avatar0.jpg')} // Change to the correct path of the illustration
              style={styles.cardImage}
            />
          </View>
        </View>

        {/* Conversation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conversation</Text>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Listen</Text>
            <Image
              source={require('../assets/icons/hp1.png')} // Change to the correct icon path
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Your Collections Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Collections</Text>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Mistakes</Text>
            <Image
              source={require('../assets/icons/mistake.png')} // Change to the correct icon path
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Words</Text>
            <Image
              source={require('../assets/icons/words.png')} // Change to the correct icon path
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* Additional Items
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Words</Text>
            <Image
              source={require('../assets/icons/words.png')} // Change to the correct icon path
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemText}>Words</Text>
            <Image
              source={require('../assets/icons/words.png')} // Change to the correct icon path
              style={styles.icon}
            />
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Global Bottom Navigation */}
      {/* <BottomNavigation selected={'BarBellScreen'} /> */}
    </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    paddingBottom: 70, // Added padding to make space for bottom navigation
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reviewContainer: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#262626',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#aaa',
  },
  unlockButton: {
    backgroundColor: '#00FFCC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  unlockButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  listItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#ffd700', // Yellow color for icons
  },
});

export default BarBellScreen;
