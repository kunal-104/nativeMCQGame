import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native'; // Import for resetting navigation


const SettingsScreen = ({navigation}) => {
  
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
      navigation.goBack();
      return true; // Prevent default back action
    };

    // Add the event listener for the back press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  const signOut = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      console.log('Current session before removal:', session); // Debugging line
  
      await AsyncStorage.removeItem('userSession');
  
      const sessionAfterRemoval = await AsyncStorage.getItem('userSession');
      console.log('Session after removal:', sessionAfterRemoval); // Debugging line
  
      if (!sessionAfterRemoval) {
        console.log('Logout done');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        console.log('Session removal failed');
      }
    } catch (error) {
      console.log('Error clearing session:', error);
    }
  };
  
  
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.sectionContent}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('ProfileEditingScreen')}>
          <Text style={styles.itemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Notifications</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Duolingo for Schools</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Social accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Privacy settings</Text>
        </TouchableOpacity> */}
      </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.sectionContent}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Feedback</Text>
        </TouchableOpacity>
      </View>
      </View>

      <View style={styles.signOutSection}>
        <TouchableOpacity style={styles.signOutButton} onPress={()=> signOut()}>
          <Text style={styles.signOutText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>TERMS</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>PRIVACY POLICY</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>ACKNOWLEDGEMENTS</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001016', // Background color similar to the image
    padding: 20,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2A2A2A',
    paddingBottom:10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  doneText: {
    fontSize: 16,
    color: '#5BC0EB',
  },
  section: {
    marginBottom: 20,
    
  },
  sectionContent: {
    borderWidth:2,
    padding:10,
    borderColor: '#808080',
    borderRadius: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2A2A2A',
  },
  itemText: {
    fontSize: 16,
    color: 'white',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#A6A6A6',
    color: 'white',
    marginBottom: 10,
  },
  signOutSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  signOutButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    width: '100%',
    alignItems: 'center',
  },
  signOutText: {
    color: '#5BC0EB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 30,
  },
  footerText: {
    color: '#5BC0EB',
    fontSize: 14,
  },
});

export default SettingsScreen;
