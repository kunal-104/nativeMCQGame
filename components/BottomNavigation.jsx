import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = ({selected}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
    <View style={styles.bottomNav}>
      <TouchableOpacity  style={[styles.iconContainer, selected === 'MapScreen' ? styles.select : styles.none]} onPress={() => navigation.navigate('MapScreen')}>
        {
           selected === 'MapScreen' ?  <Icon name="home" size={28} color="#ccc" /> :  <Icon name="home-outline" size={28} color="#ccc" />
        }
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer, selected === 'LeaderBoardScreen' ? styles.select : styles.none]} onPress={() => navigation.navigate('LeaderBoardScreen')}>
        {
          selected === 'LeaderBoardScreen' ?  <Icon name="trophy" size={28} color="#ccc" /> :  <Icon name="trophy-outline" size={28} color="#ccc" />
        }
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer, selected === 'BarBellScreen' ? styles.select : styles.none]} onPress={() => navigation.navigate('BarBellScreen')}>
      {
          selected === 'BarBellScreen' ?  <Icon name="barbell" size={28} color="#ccc" /> :  <Icon name="barbell-outline" size={28} color="#ccc" />
        }
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer, selected === 'ProfileScreen' ? styles.select : styles.none]} onPress={() => navigation.navigate('ProfileScreen')}>
      {
          // selected === 'ProfileScreen' ?   <FontAwesome name="user" size={28} color="#ccc" /> :   <FontAwesome name="user-o" size={28} color="#ccc" />
           selected === 'ProfileScreen' ?   <Icon name="people" size={28} color="#ccc" /> :   <Icon name="people-outline" size={28} color="#ccc" />
        }
       
      </TouchableOpacity>
      {/* <TouchableOpacity style={[styles.iconContainer, selected === 'MapScreen' ? styles.select : styles.none]} onPress={() => navigation.navigate('More')}>
        <Icon name="ellipsis-horizontal-outline" size={28} color="#ccc" />
      </TouchableOpacity> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer:{
    // flex:1,
    // height:'100%',
    // backgroundColor: '#333333',
    // width: '100%',
    // padding:10
  },
  bottomNav: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: '#4d4d4d',
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
  iconContainer: {
    padding: 10, // Increase touchable area around the icons without changing their appearance
    
  },
  select: {
    backgroundColor: '#3c3c3c',
    borderWidth: 0.3,
    borderColor: 'white',
    borderRadius: 10,
    // paddingVertical: 5,
    // marginVertical: 2

  },
  none: {
    //blablabla
  }
});

export default BottomNavigation;
