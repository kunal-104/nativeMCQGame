import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import the store
import Loginscreen from './screens/LoginScreen';
import Landingscreen from './screens/LandingScreen';
import MapScreen from './screens/MapScreen';
import McqScreen from './screens/McqScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileEditingScreen from './screens/ProfileEditingScreen';
import BarBellScreen from './screens/BarBellScreen';
import LeaderBoardScreen from './screens/LeaderBoardScreen';
import UserInputScreen from './screens/UserInputScreen';
import FindFriendsScreen from './screens/FindFriendsScreen';
import FriendsScreen from './screens/FriendsScreen';
import SearchUsernameScreen from './screens/SearchUsernameScreen';
import { Easing } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Landingscreen} 
        options={{
            headerShown: false,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 2000, // Transition duration (milliseconds)
                  easing: Easing.out(Easing.poly(4)), // Easing function for smooth effect
                },
              },
            //   close: {
            //     animation: 'timing',
            //     config: {
            //       duration: 2000,
            //       easing: Easing.in(Easing.poly(4)),
            //     },
            //   },
            },
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress, // Fades in
              },
            }),
          }}/>
        <Stack.Screen name="loginscreens" component={Loginscreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ProfileEditingScreen" component={ProfileEditingScreen} />
        <Stack.Screen name="BarBellScreen" component={BarBellScreen} />
        <Stack.Screen name="LeaderBoardScreen" component={LeaderBoardScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="McqScreen" component={McqScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="UserInputScreen" component={UserInputScreen} />
        <Stack.Screen name="FindFriendsScreen" component={FindFriendsScreen} />
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
        <Stack.Screen name="SearchUsernameScreen" component={SearchUsernameScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
