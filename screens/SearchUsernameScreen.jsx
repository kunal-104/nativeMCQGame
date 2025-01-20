import React, {useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const friendSuggestions = [
  { id: '1', name: 'himani', info: 'One of your contacts', avatar: 'H' },
  { id: '2', name: 'Анастасия', info: 'Followed by 2 friends', avatar: 'A' },
  { id: '3', name: '9Gamburger0', info: 'Followed by KoTBop...', avatar: '9' },
  { id: '4', name: 'KINTU MOLLA', info: 'Followed by KoTBop...', avatar: 'K' },
  { id: '5', name: 'jonona', info: 'Followed by KoTBop...', avatar: 'J' },
  { id: '6', name: 'Ritesh Bhadana', info: 'You may know each ...', avatar: 'R' },
  { id: '7', name: 'Fatma zehra Gü...', info: 'Followed by KoTBop...', avatar: 'F' },
];

const SearchUsernameScreen = ({ navigation }) => {
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
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search for friends</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A9A9A9" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Name or username"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      {/* Friend Suggestions */}
      <Text style={styles.suggestionsTitle}>Friend suggestions</Text>
      <FlatList
        data={friendSuggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{item.avatar}</Text>
            </View>
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendInfoText}>{item.info}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="person-add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton}>
                <Ionicons name="close" size={20} color="#A9A9A9" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Dark background color
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  suggestionsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendInfoText: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#1E90FF', // Blue color for the add button
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  removeButton: {
    padding: 8,
  },
});

export default SearchUsernameScreen;
