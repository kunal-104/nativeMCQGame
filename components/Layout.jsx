// components/Layout.js
import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigation from './BottomNavigation';


const Layout = ({ children, navigation, selected }) => {
    const [selectedTab, setSelectedTab] = useState('MapScreen'); // Keep track of the selected tab

    // Update the selected tab whenever it changes
    useEffect(() => {
        setSelectedTab(selected);
    }, [selected]);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <BottomNavigation selected={selectedTab} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // Your content styling here
  },
});

export default Layout;
