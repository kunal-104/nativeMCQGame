import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'; // Use your preferred icon library
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use your preferred icon library
import Iconn from 'react-native-vector-icons/Ionicons'; // Use your preferred icon library
import { useSelector } from 'react-redux';
const UpperBarTitle = ({ currentSection, currentUnit }) => {

  const streak = useSelector(state => state.user.userData.streak);
  const diamonds = useSelector(state => state.user.userData.diamonds);

    return (
      <View style={styles.container}>
        {/* Upper Bar */}
        <View style={styles.upperBar}>
          <View style={styles.leftIconContainer}>
            <Icons name="fire" size={30} color="#ffbf00" />
            <Text style={styles.counterText}>{streak  >= 0 ? streak : "296"}</Text>
          </View>
          <View style={styles.centerCounterContainer}>
            <Icons name="cards-diamond" size={30} color="#5DE2E7" /> 
            {/* diamond-stone */}
            <Text style={styles.counterText}>{diamonds  >= 0 ? diamonds : "1413"}</Text>
          </View>
          <View style={styles.rightIconContainer}>
            <Icons name="heart-multiple" size={30} color="red" />
            <Text style={styles.counterText}>5</Text>
          </View>
        </View>
  
        {/* Title Box */}
        <View style={styles.titleBox}>
          <View>
            {/* Display current section and unit dynamically */}
            <Text style={styles.sectionText}>SECTION {currentSection}, UNIT {currentUnit}</Text>
            <Text style={styles.titleText}>Life!</Text>
          </View>
          <TouchableOpacity style={styles.menuIconContainer}>
            <Icons name="notebook" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'relative',
    zIndex: 1000,
    // marginBottom: 0, // Adjust as needed
    // padding: 20,
    // backgroundColor:'transparent'
    // backgroundColor: '#20212A',

  },
  upperBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // backgroundColor: '#20212A',
  },
  leftIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3e3e3e',
    padding: 13,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 2,
    borderBottomWidth:4,
    borderBottomColor: '#808080',
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
  },
  sectionText: {
    color: '#808080',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuIconContainer: {
    padding: 5,
    // paddingVertical:0,
    borderLeftWidth: 2,
  },

});

export default UpperBarTitle;
