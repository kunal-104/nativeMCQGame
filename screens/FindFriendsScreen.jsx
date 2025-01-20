import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FindFriendsScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const avatars = [
    require('../assets/avatar/avatar0.jpg'),
    // Other avatars
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="grey" />
        </TouchableOpacity>
        <Text style={styles.header}>Find your friends</Text>

        {/* Options */}
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('FriendsScreen')}>
          <Icon name="contacts" size={36} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>Choose from contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('SearchUsernameScreen')}>
          <Entypo name="magnifying-glass" size={36} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>Search by name</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="person-circle-outline" size={36} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>Share your profile</Text>
        </TouchableOpacity>

        {/* Friend Suggestions */}
        <View style={styles.friendSuggestionsHeader}>
          <Text style={styles.sectionTitle}>Friend suggestions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsContainer}>
          <View style={styles.friendCard}>
            <Image source={require('../assets/icons/cat.png')} style={styles.friendAvatar} />
            <Text style={styles.friendName}>nik</Text>
            <Text style={styles.friendInfo}>You may know each other</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>FOLLOW</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.friendCard}>
            <Image source={require('../assets/icons/cat.png')} style={styles.friendAvatar} />
            <Text style={styles.friendName}>nik</Text>
            <Text style={styles.friendInfo}>You may know each other</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>FOLLOW</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.friendCard}>
            <Image source={require('../assets/icons/cat.png')} style={styles.friendAvatar} />
            <Text style={styles.friendName}>nik</Text>
            <Text style={styles.friendInfo}>You may know each other</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>FOLLOW</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.friendCard}>
            <Image source={require('../assets/icons/cat.png')} style={styles.friendAvatar} />
            <Text style={styles.friendName}>nik</Text>
            <Text style={styles.friendInfo}>You may know each other</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>FOLLOW</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.friendCard}>
            <Image source={require('../assets/icons/cat.png')} style={styles.friendAvatar} />
            <Text style={styles.friendName}>nik</Text>
            <Text style={styles.friendInfo}>You may know each other</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>FOLLOW</Text>
            </TouchableOpacity>
          </View>

          {/* Add other friend cards as needed */}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    paddingBottom: 70,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
    
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  friendSuggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#00FFCC',
    fontSize: 14,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  friendCard: {
    backgroundColor: '#262626',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: 140,
    marginRight: 12,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  friendName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  friendInfo: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
    textAlign: 'center',
  },
  followButton: {
    backgroundColor: '#00FFCC',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  followText: {
    color: '#1B1B1B',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default FindFriendsScreen;
