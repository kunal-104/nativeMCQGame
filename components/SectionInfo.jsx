import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SectionInfo = ({ 
  sectionNumber, 
  description, 
  onContinue, 
  isCompleted // New prop to determine if the section is unlocked
}) => {

  return (
    <LinearGradient
      colors={
        isCompleted 
        ? ['#0D0D0D','#0D0D0D', '#1B1B1B', '#333333', '#333333'] // Normal gradient when unlocked
        : ['#2E2E2E', '#3A3A3A', '#4B4B4B'] // Gray background when locked
      }
      style={styles.TopsectionContainer}
      start={{ x: 0, y: 0 }} // Starting point of the gradient (top-left)
      end={{ x: 1, y: 1 }}   // Ending point of the gradient (bottom-right)
    >
      <View style={styles.sectionContainer}>
        <Text style={styles.upNextText}>UP NEXT</Text>
        <Text style={styles.sectionTitle}>Section {sectionNumber}</Text>
        <Text style={styles.sectionDescription}>{description}</Text>
        
        {isCompleted ? (
          // Show "Continue" button if section is completed
          <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
        ) : (
          // Show locked icon and "Jump Here?" button if section is not completed
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedText}>🔒</Text>
            <TouchableOpacity style={styles.jumpButton}>
              <Text style={styles.jumpText}>JUMP HERE?</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  TopsectionContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 110,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom:214
  },
  sectionContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  upNextText: {
    color: '#00BFA5',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lockedContainer: {
    alignItems: 'center',
  },
  lockedText: {
    color: '#CCCCCC',
    fontSize: 27,
    marginBottom: 10,
  },
  jumpButton: {
    backgroundColor: '#444444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  jumpText: {
    color: '#00BFA5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SectionInfo;
