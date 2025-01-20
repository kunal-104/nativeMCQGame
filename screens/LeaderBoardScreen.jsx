import React, {useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity,BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons
import BottomNavigation from '../components/BottomNavigation';
import Layout from '../components/Layout';

// Sample data for the leaderboard
const leaderboardData = [
    { id: '1', name: 'Taslima', xp: 4588, rank: 1, avatar: require('../assets/avatar/avatar0.jpg') },
    { id: '2', name: 'Andrew Smith', xp: 555, rank: 2, avatar: require('../assets/avatar/avatar1.jpg') },
    { id: '3', name: 'Max', xp: 384, rank: 3, avatar: require('../assets/avatar/avatar2.jpg') },
    { id: '4', name: 'Elena Johnson', xp: 270, rank: 4, avatar: require('../assets/avatar/avatar3.jpg') },
    { id: '5', name: 'Catherine', xp: 223, rank: 5, avatar: require('../assets/avatar/avatar4.jpg') },
    { id: '6', name: 'Ulyana', xp: 190, rank: 6, avatar: require('../assets/avatar/avatar5.jpg') },
    // Add more entries as needed
];


const LeaderBoardScreen = ({navigation}) => {
    // Render each leaderboard entry
    const renderItem = ({ item }) => (
        <View style={styles.leaderboardItem}>
            <Text style={styles.rankText}>{item.rank}</Text>
            <Image
                source={item.avatar} // item.id should match the index+1 of the array
                style={styles.avatar}
            />
            <View style={styles.userInfo}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.xpText}>{item.xp} XP</Text>
            </View>
        </View>
    );

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
    <Layout navigation={navigation}  selected="LeaderBoardScreen">
        
        <View style={styles.container}>
            <Text style={styles.header}>Emerald League</Text>
            <FlatList
                data={leaderboardData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.button}>
                <Icon name="trophy" size={20} color="#fff" />
                <Text style={styles.buttonText}>View Trophies</Text>
            </TouchableOpacity>

            {/* <BottomNavigation selected={'LeaderBoardScreen'} /> */}
        </View>
        </Layout>
    );
};
export default LeaderBoardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1B1B',
        paddingBottom: 70,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00FFCC',
        textAlign: 'center',
        marginVertical: 20,
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#262626',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
    },
    rankText: {
        color: '#00FFCC',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userInfo: {
        flex: 1,
    },
    nameText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    xpText: {
        color: '#aaa',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#00FFCC',
        fontSize: 16,
        marginLeft: 10,
    },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1a1a2e', // Slightly darker background for contrast
//     padding: 10,
//     paddingBottom: 70,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#f9b233',
//     textAlign: 'center',
//     marginVertical: 15,
//   },
//   leaderboardItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2d2d44', // Darker card background for better contrast
//     padding: 12,
//     borderRadius: 12,
//     marginVertical: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     elevation: 5, // Slight shadow effect for elevation on dark background
//   },
//   rankText: {
//     color: '#ffd700', // Gold color for rank
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginRight: 12,
//   },
//   avatar: {
//     width: 55,
//     height: 55,
//     borderRadius: 27.5,
//     borderColor: '#f9b233',
//     borderWidth: 2, // Border around the avatar for emphasis
//     marginRight: 15,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   nameText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   xpText: {
//     color: '#a0aec0', // Subtle gray for XP text
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: '#334257', // Button color darkened for contrast
//     padding: 15,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 17,
//     marginLeft: 10,
//   },
// });


// theme example 2



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1e2d3a', // Dark background
//     padding: 10,
//     paddingBottom:70,

//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#f9b233',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   subHeader: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   leaderboardItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2b3a4a',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   rankText: {
//     color: '#f9b233',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   nameText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   xpText: {
//     color: '#b0c4de',
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: '#3a506b',
//     padding: 15,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom:20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     marginLeft: 10,
//   },
// });

// export default LeaderBoardScreen;
