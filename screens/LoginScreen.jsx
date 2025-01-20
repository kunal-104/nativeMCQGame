import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { setUserSession } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // OTP sent status
  const [isEditable, setIsEditable] = useState(true); // Control phone number field editing
  const [isSignup, setIsSignup] = useState(false); // Determine if user is signing up

  const dispatch = useDispatch(); // Initialize Redux dispatch

  const fetchUserDataByPhoneNumber = async (mobileNumber) => {
    try {
      // Reference to the document in 'users' collection with the ID matching the phone number
      const userDocRef = firestore()
        .collection("users")
        .doc(mobileNumber);

      // Fetch the document
      const userDoc = await userDocRef.get();

      // Check if document exists
      if (userDoc.exists) {
        const userData = userDoc.data(); // Get the document data
        console.log("User data:", userData);
        return userData;
      } else {
        console.log("No user found with the provided phone number.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const retryWithBackoff = async (operation, maxRetries = 5, delay = 1000) => {
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        return await operation();
      } catch (error) {
        if (error.code === 'firestore/unavailable' && attempt < maxRetries - 1) {
          attempt++;
          const backoff = delay * Math.pow(2, attempt);
          console.log(`Retrying after ${backoff} ms...`);
          await new Promise((resolve) => setTimeout(resolve, backoff));
        } else {
          throw error; // If max retries reached or another error, throw it
        }
      }
    }
  };


  const saveUserSession = async (mobileNumber) => {
    try {
      const currentDate = new Date().toISOString(); // Convert date to ISO string

      if (isSignup) {
        // Check if user already exists in Firestore
        const existingUser = await retryWithBackoff(() => fetchUserDataByPhoneNumber(mobileNumber));

        if (existingUser) {
          Alert.alert('Error', 'A user with this phone number already exists.');
          return; // Exit early if user already exists
        }

        // Create new user session data for signup
        const signupData = {
          mobileNumber: mobileNumber,
          xp: 0,
          streak: 0,
          followers: 0,
          following: 0,
          dateJoined: currentDate, // Store date as a string
          avatar: 25,
          levelsUnlocked: 1,
          diamonds: 100,
        };

        // Save to Firestore
        await retryWithBackoff(() =>  
          firestore().collection('users').doc(mobileNumber).set(signupData)
        );

        // Save to AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(signupData));
        console.log('Signup session saved successfully', signupData);

        // Save to Redux
        dispatch(setUserSession(signupData));

        // Navigate to the next screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'UserInputScreen' }],
        });
      } else {
        // Fetch user data for login
        const userData = await retryWithBackoff(() => fetchUserDataByPhoneNumber(mobileNumber));
        console.log("fetched user data from firestore: ", userData);
        if (!userData) {
          Alert.alert('Error', 'No user found with this phone number.');
          return; // Exit early if no user data is found
        }

        // Convert date fields to strings if necessary
        const loginData = {
          mobileNumber: mobileNumber,
          name: userData.name || "", // Default to empty string if undefined
          username: userData.username || "", // Default to empty string if undefined
          xp: userData.xp || 0, // Default to 0 if undefined
          streak: userData.streak || 0, // Default to 0 if undefined
          followers: userData.followers || 0, // Default to 0 if undefined
          following: userData.following || 0, // Default to 0 if undefined
          dateJoined: userData.dateJoined || currentDate, // Use existing date or current date if undefined
          avatar: userData.avatar || 0, // Default to 0 if undefined
          levelsUnlocked: userData.levelsUnlocked || 1,
          diamonds: userData.diamonds || 100,
        };


        // Save to Firestore
        await retryWithBackoff(() =>
          firestore().collection('users').doc(mobileNumber).set(loginData, { merge: true })
        );

        // Save to AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(loginData));
        console.log('Login session saved successfully', loginData);

        // Save to Redux
        dispatch(setUserSession(loginData));

        // Navigate to the next screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'MapScreen' }],
        });
      }
    } catch (error) {
      console.log('Error saving session:', error);
      Alert.alert('Error', 'There was an issue saving your session. Please try again later.');
    }
  };





  const handleLogin = (mobileNumber) => {
    saveUserSession(mobileNumber);
  };

  const handleSendOtp = () => {
    const mobileRegex = /^[0-9]{10}$/; // Regex for 10-digit mobile numbers

    if (!mobileRegex.test(mobileNumber)) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // Simulate sending OTP
    Alert.alert('OTP Sent', 'An OTP 1234 has been sent to your mobile number.');
    setOtpSent(true);
    setIsEditable(false); // Lock the phone number field after sending OTP
  };

  const handleVerifyOtp = () => {
    const staticOtp = '1234'; // Example static OTP for demonstration

    if (otp !== staticOtp) {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect. correct OYP is 1234');
      return;
    }

    handleLogin(mobileNumber);
  };

  const handleEditPhoneNumber = () => {
    setOtpSent(false); // Show "Send OTP" button again
    setIsEditable(true); // Allow phone number editing
    setOtp(''); // Clear OTP input field
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? "Signup" : "Login"}</Text>

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        placeholderTextColor="white"
        keyboardType="numeric"
        maxLength={10}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        editable={isEditable} // Make input non-editable when OTP is sent
      />

      {/* Conditionally Render Buttons */}
      {!otpSent ? (
        // Send OTP Button
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* OTP Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="white"
            keyboardType="numeric"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
          />

          {/* Verify OTP Button */}
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          {/* Edit Phone Number Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditPhoneNumber}>
            <Text style={styles.editButtonText}>Edit Phone Number</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Toggle Signup/Login */}
      <TouchableOpacity style={styles.toggleButton} onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.toggleButtonText}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Darker background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00BFFF', // A cool cyan/blue color for titles
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#00BFFF', // Match the input border with the title color
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#1F1F1F', // Slightly lighter dark background for input
    color: 'white',
    fontWeight: '100',
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Arial',
  },
  button: {
    width: '100%',
    backgroundColor: '#0066CC', // A darker blue for buttons
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#333333', // Neutral dark grey for secondary actions
  },
  editButtonText: {
    color: '#00BFFF', // Consistent cyan/blue for secondary buttons text
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#00BFFF', // Cyan color for toggle text
    fontWeight: 'bold',
    fontSize: 16,
  },
});

