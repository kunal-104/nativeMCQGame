import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar, setUpdateUserSession, setUserSession } from '../redux/features/userSlice';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileEditingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // For avatar selection modal
  const [name, setName] = useState(useSelector(state => state.user.userData.name));
  const [userName, setUserName] = useState(useSelector(state => state.user.userData.username));
  const [avatarIndex, setAvatarIndex] = useState(useSelector(state => state.user.userData.avatar));

  const Name = useSelector(state => state.user.userData.name);
  const UserName = useSelector(state => state.user.userData.username);
  const AvatarIndex = useSelector(state => state.user.userData.avatar);

  // const avataar = useSelector(state => state.user.userData.avatar);
  const mobileNumber = useSelector(state => state.user.userData.mobileNumber);
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const avatars = [
    require('../assets/avatar/avatar0.jpg'), // Add more avatars here
    require('../assets/avatar/avatar1.jpg'),
    require('../assets/avatar/avatar2.jpg'),
    require('../assets/avatar/avatar3.jpg'),
    require('../assets/avatar/avatar4.jpg'),
    require('../assets/avatar/avatar5.jpg'),
    require('../assets/avatar/avatar6.jpg'),
    require('../assets/avatar/avatar7.jpg'),
    require('../assets/avatar/avatar8.jpg'),
    require('../assets/avatar/avatar9.jpg'),
    require('../assets/avatar/avatar10.jpg'),
    require('../assets/avatar/avatar11.jpg'),
    require('../assets/avatar/avatar12.jpg'),
    require('../assets/avatar/avatar13.jpg'),
    require('../assets/avatar/avatar14.jpg'),
    require('../assets/avatar/avatar15.jpg'),
    require('../assets/avatar/avatar16.jpg'),
    require('../assets/avatar/avatar17.jpg'),
    require('../assets/avatar/avatar18.jpg'),
    require('../assets/avatar/avatar19.jpg'),
    require('../assets/avatar/avatar20.jpg'),
    require('../assets/avatar/avatar21.jpg'),
    require('../assets/avatar/avatar22.jpg'),
    require('../assets/avatar/avatar23.jpg'),
    require('../assets/avatar/avatar24.jpg'),
    require('../assets/avatar/avatar25.jpg'),
  ]; // Add more avatar paths here

  // Function to handle avatar selection
  const handleAvatarSelect = (index) => {
    try {
      setAvatarIndex(index)
      setModalVisible(false); // Close modal after selection
    } catch (error) {
      console.error('Error updating avatar in Firestore:', error);
      // Optionally handle the error, such as showing a notification to the user
    }
  };

  // Function to handle saving user details (name and username)
  const handleDone = async () => {
    if ((name != Name) || (userName != UserName) || (avatarIndex != AvatarIndex)) {

      try {
        // Update name and username in Firestore
        await firestore()
          .collection('users')
          .doc(mobileNumber)
          .update({
            name: name,       // Update name
            username: userName, // Update username
            avatar: avatarIndex,
          });

        // AsyncStorage: Merge and save updated data
        const existingSession = await AsyncStorage.getItem('userSession');
        const sessionData = existingSession ? JSON.parse(existingSession) : {};

        await AsyncStorage.setItem(
          'userSession',
          JSON.stringify({
            ...sessionData,
            name: name,       // Update name
            username: userName, // Update username
            avatar: avatarIndex,
          })
        );
        // If Firestore update is successful, dispatch the Redux action to update the user session in local state
        dispatch(setUpdateUserSession({ name: name, username: userName, avatar: avatarIndex }));
        // dispatch(setAvatar(avatarIndex));

        
        
      } catch (error) {
        console.error('Error updating user details in Firestore:', error);
        // Optionally handle the error
      }
      
    }
    
    navigation.goBack();

  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={avatars[avatarIndex]} // Placeholder image
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.changeAvatarButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.changeAvatarText}>Change Avatar</Text>
      </TouchableOpacity>

      {/* Name Input */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Kunal" placeholderTextColor='white' value={name} onChangeText={setName} />

      {/* Username Input */}
      <Text style={styles.label}>Username</Text>
      <TextInput placeholderTextColor='white' style={styles.input} placeholder="Kunal_104" value={userName} onChangeText={setUserName} />

      {/* Done Button */}
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteAccountButton}>
        <Text style={styles.deleteAccountText}>DELETE ACCOUNT</Text>
      </TouchableOpacity>

      {/* Avatar Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Choose Your Avatar</Text>
            <View style={styles.avatarOptions}>
              {avatars.map((avt, index) => (
                <TouchableOpacity key={index} onPress={() => handleAvatarSelect(index)}>
                  <Image source={avt} style={styles.avatarOption} />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001016',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, // Circular avatar
    alignSelf: 'center',
    marginBottom: 10,
  },
  changeAvatarButton: {
    marginBottom: 20,
  },
  changeAvatarText: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  label: {
    fontSize: 18,
    fontFamily: 'monospace',
    marginBottom: 5,
    fontWeight: '700',
    color: 'white',
  },
  input: {
    fontSize: 18,
    fontFamily: 'monospace',
    height: 50,
    borderColor: '#808080',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white',
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
  },
  doneButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  deleteAccountButton: {
    marginTop: 50,
    borderWidth: 2,
    padding: 15,
    borderColor: 'gray',
    borderRadius: 10,
  },
  deleteAccountText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'monospace',
  },

  // Modal styles
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  avatarOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  avatarOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeModalText: {
    color: '#00FFCC',
    fontSize: 16,
  },
});

export default ProfileEditingScreen;
