import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, BackHandler } from 'react-native';
// import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FriendsScreen = ({navigation}) => {
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
  // Example list of friends
  const friends = [
    { id: 1, name: 'Nitin', userId: 'ph.i5at9H', color: '#F4A261' },
    { id: 2, name: 'Sahil Thakur', userId: 'ph.bFTrKU', color: '#2A9D8F' },
    { id: 3, name: 'Anu', userId: 'ph.AulUIT', color: '#E76F51' },
    { id: 4, name: 'Himani', userId: 'ph.jzS1Bh', color: '#E76F51' },
    { id: 5, name: 'Rama', userId: 'ph.RWMki9', color: '#2A9D8F' },
    { id: 6, name: 'Chanchal', userId: 'ph.8GK1nE', color: '#3DA4F5' },
    { id: 7, name: 'Atul Sharma', userId: 'AtulSharma157381', color: '#F4A261' },
    { id: 8, name: 'Parveen Verma', userId: 'ph.Fmdtip', color: '#9C27B0' },
    { id: 9, name: 'Sahil Thakur', userId: 'ph.bFTrKU', color: '#2A9D8F' },
    { id: 10, name: 'Anu', userId: 'ph.AulUIT', color: '#E76F51' },
    { id: 11, name: 'Himani', userId: 'ph.jzS1Bh', color: '#E76F51' },
    { id: 12, name: 'Rama', userId: 'ph.RWMki9', color: '#2A9D8F' },
    { id: 13, name: 'Chanchal', userId: 'ph.8GK1nE', color: '#3DA4F5' },
    { id: 14, name: 'Atul Sharma', userId: 'AtulSharma157381', color: '#F4A261' },
    { id: 15, name: 'Parveen Verma', userId: 'ph.Fmdtip', color: '#9C27B0' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contacts on Duolingo</Text>
        {/* <TouchableOpacity>
          <Text style={styles.followAllText}>FOLLOW ALL</Text>
        </TouchableOpacity> */}
      </View>

      {/* Contacts */}
      <View style={styles.contactsView}>
      <Text style={styles.contactsCount}>{friends.length} contacts</Text>
              <TouchableOpacity>
          <Text style={styles.followAllText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.friendsList}
                  showsVerticalScrollIndicator={false} 
                  showsHorizontalScrollIndicator={false}
      >
        {friends.map((friend) => (
          <View key={friend.id} style={styles.friendCard}>
            <View style={[styles.avatar, { backgroundColor: friend.color }]}>
              <Text style={styles.avatarText}>{friend.name[0]}</Text>
            </View>
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <Text style={styles.userId}>{friend.userId}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <MaterialIcons name="person-add" size={24} color="#1B1B1B" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1B1B1B',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  contactsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1B1B1B',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft:10,
  },
  followAllText: {
    color: '#00BFFF',
    fontSize: 14,
  },
  contactsCount: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  friendsList: {
    paddingHorizontal: 15,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userId: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: '#00BFFF',
    padding: 6,
    borderRadius: 8,
  },
});

export default FriendsScreen;
