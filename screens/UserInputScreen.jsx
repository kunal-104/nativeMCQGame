import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateUserSession } from '../redux/features/userSlice';

const UserInputScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [userPurpose, setUserPurpose] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const dispatch = useDispatch();
  const mobileNumber = useSelector(state => state.user.userData.mobileNumber);

  // Check username availability as the user types
  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username.trim() === '') {
        setIsUsernameAvailable(true); // Reset when input is empty
        return;
      }

      try {
        const querySnapshot = await firestore()
          .collection('users')
          .where('username', '==', username)
          .get();

        // Set availability to false if any document matches
        setIsUsernameAvailable(querySnapshot.empty);
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    };

    // Call the function to check username availability
    checkUsernameAvailability();
  }, [username]);

  const handleStartGame = async () => {
    if (!isUsernameAvailable) {
      Alert.alert("Username Taken", "Please choose a different username.");
      return;
    }

    if (name && username && userPurpose && mobileNumber) {
      try {
        const currentDate = new Date().toISOString();

        // Firestore: Update user document without replacing
        await firestore()
          .collection('users')
          .doc(mobileNumber)
          .update({
            name,
            username,
            userPurpose,
          });

        // Redux: Dispatch merged state
        dispatch(setUpdateUserSession({
          name,
          username,
          userPurpose,
        }));

        // AsyncStorage: Merge and save updated data
        const existingSession = await AsyncStorage.getItem('userSession');
        const sessionData = existingSession ? JSON.parse(existingSession) : {};

        await AsyncStorage.setItem(
          'userSession',
          JSON.stringify({
            ...sessionData,
            name,
            username,
            userPurpose,
          })
        );

        Alert.alert("Game Started!", `Welcome ${name}, let's sharpen the brain!`);
        navigation.navigate("MapScreen");

      } catch (error) {
        console.error("Error saving user data: ", error);
        Alert.alert("Error", "Could not save user data. Please try again.");
      }
    } else {
      Alert.alert("Input Error", "Please enter your name, username, and purpose.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Enter Your Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
          {!isUsernameAvailable && (
            <Text style={styles.errorText}>Username is already taken</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Your Purpose of Life"
            placeholderTextColor="#aaa"
            value={userPurpose}
            onChangeText={setUserPurpose}
          />
          <TouchableOpacity
            style={[styles.startButton, !isUsernameAvailable && styles.disabledButton]}
            onPress={handleStartGame}
            disabled={!isUsernameAvailable} // Disable if username is taken
          >
            <Text style={styles.startButtonText}>Let's Start the Game</Text>
          </TouchableOpacity>
          <Text style={styles.brainSharpenText}>Let's Dig the Brain!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    paddingBottom: 70,
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#00FFCC',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  startButtonText: {
    color: '#1B1B1B',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brainSharpenText: {
    marginTop: 20,
    fontSize: 16,
    color: '#00FFCC',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#666', // Disabled button style
  },
});

export default UserInputScreen;
