import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ImageBackground, Animated } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserSession } from '../redux/features/userSlice';

const LandingScreen = ({ navigation }) => {
  const [showText, setShowText] = useState(false);  // Controls when the text should appear
  const [isUserSession, setIsUserSession] = useState(null);  // Start with null to indicate loading

  const dispatch = useDispatch();
  // Animations for opacity
  const image1Opacity = useRef(new Animated.Value(0)).current; // Initial opacity for first image (hidden initially)
  const image2Opacity = useRef(new Animated.Value(1)).current; // Initial opacity for second image (fully visible)
  const textOpacity = useRef(new Animated.Value(0)).current;   // Initial opacity for text (hidden)

  // Function to check if session exists
// Function to check if session exists and has necessary properties
const checkUserSession = async () => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    if (session) {
      const userSession = JSON.parse(session);
      console.log("session exists data:", userSession);

      dispatch(setUserSession(userSession));
      
      // Check if name, username, and userPurpose are present in the session
      if (userSession.name && userSession.username) {
        console.log('Session exists with all required fields:', userSession);
        setIsUserSession('map');
      } else {
        console.log('Session found but missing required fields.');
        setIsUserSession('setNamePage');
      }
    } else {
      console.log('No session found.');
      setIsUserSession('login');
    }
  } catch (error) {
    console.log('Error checking session:', error);
    setIsUserSession('login'); // Fallback to login if an error occurs
  }
};


  useEffect(() => {
    checkUserSession(); // Check session when component mounts
  }, []);

  useEffect(() => {
    // Only proceed with animation and navigation if isUserSession is not null
    if (isUserSession !== null) {
      // Start the first image fade-in after a 700ms delay
      setTimeout(() => {
        Animated.timing(image1Opacity, {
          toValue: 1,  // Fully fade in the first image
          duration: 1000,  // Duration of the fade-in transition
          useNativeDriver: true,
        }).start(() => {
          // Start the color transition after the first image is fully shown (3s after the image appears)
          setTimeout(() => {
            Animated.timing(image2Opacity, {
              toValue: 0,  // Fade out the first image to reveal the second image
              duration: 1000,  // Duration of the color transition
              useNativeDriver: true,
            }).start(() => {
              // Show the text after the image transition
              setShowText(true);

              // Fade-in text animation
              Animated.timing(textOpacity, {
                toValue: 1,  // Fade in the text
                duration: 3000,
                useNativeDriver: true,
              }).start(() => {
                // Navigate based on user session after animations complete
                setTimeout(() => {
                  if (isUserSession === 'map') {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MapScreen' }],
                      })
                    );
                  } else if (isUserSession === 'setNamePage') {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'UserInputScreen' }],
                      })
                    );
                  }
                  else{
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'loginscreens' }],
                      })
                    );
                  }
                }, 2000);  // Wait for text to appear for 2 seconds before navigating
              });
            });
          }, 3000); // Start the second image animation after 3 seconds
        });
      }, 700); // First image fade-in after 700ms delay
    }
  }, [isUserSession]); // Dependency array includes isUserSession

  return (
    <View style={styles.container}>
      {/* First image (fades in initially) */}
      <Animated.View style={[styles.background, { opacity: image1Opacity }]}>
        <ImageBackground
          source={require('../assets/game22.jpeg')}
          style={styles.background}
        >
          {/* Second image (underneath, becomes visible after the first one fades out) */}
          <Animated.Image
            source={require('../assets/game21.jpeg')}
            style={[styles.background, { opacity: image2Opacity, position: 'absolute' }]}
          />
          
          {/* Text overlay */}
          {showText && (
            <Animated.View style={[styles.overlay, { opacity: textOpacity }]}>
              <Text style={styles.tagline}>Welcome to Cerebral Odyssey</Text>
              <Text style={styles.subtitle}>Your Ultimate Brain Destination</Text>
            </Animated.View>
          )}
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Optional dark overlay
    width: '100%',
    paddingHorizontal: 20,
    position: 'relative',
    top: 200,
  },
  tagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 30,
    textAlign: 'center',
  },
});
