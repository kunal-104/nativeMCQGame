import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, BackHandler, Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateUnlockedLevels , setIncreaseXP } from '../redux/features/userSlice';

const { width } = Dimensions.get('window');




const mcqData = [
  {
    question: "What does embracing the infinite refer to in the context of enlightenment?",
    options: [
      "Limiting oneself to specific beliefs.",
      "Recognizing the boundless nature of existence and consciousness.",
      "Focusing only on material achievements.",
      "Rejecting all forms of spirituality."
    ],
    correctAnswer: "Recognizing the boundless nature of existence and consciousness."
  },
  {
    question: "How does the concept of infinity relate to personal growth?",
    options: [
      "It suggests there is a fixed limit to human potential.",
      "It encourages an open-minded approach to experiences and learning.",
      "It promotes fear of the unknown.",
      "It is irrelevant to personal development."
    ],
    correctAnswer: "It encourages an open-minded approach to experiences and learning."
  },
  {
    question: "What can prevent individuals from embracing the infinite?",
    options: [
      "Curiosity and exploration.",
      "Rigid thinking and attachment to old beliefs.",
      "A desire for spiritual growth.",
      "Willingness to change."
    ],
    correctAnswer: "Rigid thinking and attachment to old beliefs."
  },
  {
    question: "Which practice is helpful in experiencing the infinite?",
    options: [
      "Engaging in repetitive negative thoughts.",
      "Meditation and mindfulness.",
      "Avoiding self-reflection.",
      "Focusing solely on the past."
    ],
    correctAnswer: "Meditation and mindfulness."
  },
  {
    question: "How does embracing the infinite contribute to a sense of unity?",
    options: [
      "It fosters a belief in separation from others.",
      "It allows individuals to see themselves as part of a greater whole.",
      "It leads to individualism.",
      "It creates conflict between different beliefs."
    ],
    correctAnswer: "It allows individuals to see themselves as part of a greater whole."
  },
  {
    question: "What is a potential benefit of recognizing the infinite nature of reality?",
    options: [
      "Increased anxiety about life's uncertainties.",
      "A deeper appreciation for life's mysteries.",
      "A stronger attachment to material possessions.",
      "A desire to control everything."
    ],
    correctAnswer: "A deeper appreciation for life's mysteries."
  },
  {
    question: "How can acceptance of the infinite influence one's perspective on challenges?",
    options: [
      "It encourages avoidance of problems.",
      "It promotes resilience and adaptability.",
      "It leads to feelings of helplessness.",
      "It creates more stress."
    ],
    correctAnswer: "It promotes resilience and adaptability."
  },
  {
    question: "In what way can embracing the infinite enhance relationships?",
    options: [
      "It fosters competition and jealousy.",
      "It encourages understanding and compassion towards others.",
      "It promotes superficial connections.",
      "It leads to isolation."
    ],
    correctAnswer: "It encourages understanding and compassion towards others."
  },
  {
    question: "What role does gratitude play in experiencing the infinite?",
    options: [
      "It creates a sense of lack.",
      "It enhances awareness of abundance and connection.",
      "It is unrelated to spirituality.",
      "It can cause frustration."
    ],
    correctAnswer: "It enhances awareness of abundance and connection."
  },
  {
    question: "How can one cultivate a mindset that embraces the infinite?",
    options: [
      "By focusing only on immediate results.",
      "By practicing openness, curiosity, and a willingness to explore.",
      "By adhering strictly to dogma.",
      "By avoiding any form of self-inquiry."
    ],
    correctAnswer: "By practicing openness, curiosity, and a willingness to explore."
  },
  {
    question: "What does the journey of embracing the infinite teach us about control?",
    options: [
      "We should strive to control every aspect of our lives.",
      "It reveals the futility of trying to control the uncontrollable.",
      "Control is essential for happiness.",
      "Control has no relevance in life."
    ],
    correctAnswer: "It reveals the futility of trying to control the uncontrollable."
  },
  {
    question: "Which of the following best describes the state of embracing the infinite?",
    options: [
      "A feeling of confinement within rigid beliefs.",
      "A profound sense of freedom and interconnectedness.",
      "An overwhelming sense of chaos.",
      "A need to fit in with societal norms."
    ],
    correctAnswer: "A profound sense of freedom and interconnectedness."
  },
  {
    question: "What is a common misconception about embracing the infinite?",
    options: [
      "It requires letting go of limitations.",
      "It means rejecting all boundaries and structure.",
      "It leads to spiritual growth.",
      "It fosters deeper understanding."
    ],
    correctAnswer: "It means rejecting all boundaries and structure."
  },
  {
    question: "Why is it important to be open to the infinite possibilities in life?",
    options: [
      "It creates confusion and indecision.",
      "It allows for growth, discovery, and creativity.",
      "It leads to disappointment.",
      "It is unnecessary for personal development."
    ],
    correctAnswer: "It allows for growth, discovery, and creativity."
  },
  {
    question: "How can one actively practice embracing the infinite?",
    options: [
      "By limiting exposure to new ideas.",
      "By engaging in exploration and experimentation in life.",
      "By clinging to past experiences.",
      "By avoiding change."
    ],
    correctAnswer: "By engaging in exploration and experimentation in life."
  }
];




const McqScreen = ({navigation}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false); // State to handle the error alert visibility
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [wrongAnswersStarted, setWrongAnswersStarted] = useState(false);
  const [progressHandler, setProgressHandler] = useState(0);

  const mobileNumber = useSelector(state => state.user.userData.mobileNumber);

  const levelsUnlocked = useSelector(state => state.user.userData.levelsUnlocked);

  const currentMCQlevel = useSelector(state => state.user.currentMCQlevel);
  
  const mcqData = useSelector(state => state.user.mcqData);
  // console.log('totalQuestions:',mcqData);
    const totalQuestions = mcqData.length;
    
    const currentQuestion = mcqData[currentQuestionIndex];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };


  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit Session',
        'Are you sure you want to quit this MCQ session?',
        [
          { text: 'No', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: () => navigation.goBack() },
        ]
      );
      return true; // Prevent default back action
    };

    // Add the event listener for the back press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation]);


  const updateUserLevelAndXP = async () => {
    try {
      // Reference the user document
      if(levelsUnlocked == currentMCQlevel){
        dispatch(setUpdateUnlockedLevels());
        const userDocRef = firestore().collection('users').doc(mobileNumber);
  
        // Update the fields
        await userDocRef.update({
          levelsUnlocked: firestore.FieldValue.increment(1),  // Increment unlockedLevel by 1
          xp: firestore.FieldValue.increment(20),            // Increment xp by 20
        });
    
        console.log('User level and XP updated successfully');
  
  
  
          // 1. Retrieve the current data from AsyncStorage
      const userDataString = await AsyncStorage.getItem('userSession');
      if (userDataString) {
        // Parse the retrieved data
        const userData = JSON.parse(userDataString);
  
        // 2. Modify the values (increase unlocked level by 1 and XP by 20)
        userData.levelsUnlocked = userData.levelsUnlocked + 1;
        userData.xp = userData.xp + 20;
  
        // 3. Store the updated data back into AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(userData));
  
        console.log('Updated data:', userData);
      } else {
        console.log('No user data found in AsyncStorage');
      }
      } else {
        dispatch(setIncreaseXP());

        const userDocRef = firestore().collection('users').doc(mobileNumber);
  
        // Update the fields
        await userDocRef.update({
          xp: firestore.FieldValue.increment(20),            // Increment xp by 20
        });
    
        console.log('User level and XP updated successfully');
  
  
  
          // 1. Retrieve the current data from AsyncStorage
      const userDataString = await AsyncStorage.getItem('userSession');
      if (userDataString) {
        // Parse the retrieved data
        const userData = JSON.parse(userDataString);
  
        // 2. Modify the values (increase unlocked level by 1 and XP by 20)
        userData.xp = userData.xp + 20;
  
        // 3. Store the updated data back into AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify(userData));
  
        console.log('Updated data:', userData);
      } else {
        console.log('No user data found in AsyncStorage');
      }
      }
    



    } catch (error) {
      console.error('Error updating level and XP: ', error);
    }
  };
  
  const dispatch = useDispatch();

  const quizCompleted = async()=>{
    // dispatch(setUpdateUnlockedLevels());
    updateUserLevelAndXP();
    // navigation.navigate('MapScreen');
    
  };

  const handleCheckAnswer = () => {
    if (!isAnswered) {
      // console.log('1');
      const isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;
      setIsAnswered(true);
      setIsCorrect(isAnswerCorrect);
  
      // If the answer is wrong, show the error alert and add to wrong answers
      if (!isAnswerCorrect) {
      // console.log('2');

        setShowErrorAlert(true);
        setWrongAnswers((prev) => [...prev, currentQuestionIndex]);
        
      }
    } else {
      // console.log('3');

      // Handle when the answer has been checked
      if (isCorrect) {
      // console.log('4');

        handleNextQuestion();
      } else {
      // console.log('5');

        setProgressHandler(progressHandler-1);
        setIsAnswered(false);
        setSelectedOption(null);
        setShowErrorAlert(false);
        handleNextQuestion();
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1 && !wrongAnswersStarted) {
      // console.log('6');
      // Example usage:
      // addMCQData("section1", "unit9", "l7", mcqData);
      // Move to the next question in main quiz
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgressHandler(currentQuestionIndex + 1);

    } else if (wrongAnswers.length > 0) {
      // console.log('7');
      // Start going through wrong answers
      const newWrongAnswers = [...wrongAnswers];
      const nextIndex = newWrongAnswers.shift(); // Take first wrong answer question
      setWrongAnswers(newWrongAnswers); // Update wrong answers array
      setCurrentQuestionIndex(nextIndex); // Move to the wrong answer question
      setProgressHandler(progressHandler + 1);
      setWrongAnswersStarted(true);
    } else {
      // End of quiz if no more questions
      alert('Quiz Completed!');
      quizCompleted();
      setWrongAnswersStarted(false); // Reset this for a possible quiz restart
      navigation.navigate('MapScreen');

    }
  
    // Reset question state for the new question
    setIsAnswered(false);
    setSelectedOption(null);
    setShowErrorAlert(false);
  };
  
// Function to add multiple questions in nested Firestore structure
// const addMCQData = async(sectionId, unitId, levelId, mcqDataArray)=> {
//   try {
//     const batch = firestore().batch(); // Batch write for efficiency

//     mcqDataArray.forEach((questionData, index) => {
//       const questionDocRef = firestore()
//         .collection("sections")
//         .doc(sectionId)
//         .collection("units")
//         .doc(unitId)
//         .collection("levels")
//         .doc(levelId)
//         .collection("questions")
//         .doc(`q${index + 1}`); // Assigning unique ID to each question

//       batch.set(questionDocRef, questionData); // Adding each question to the batch
//     });

//     await batch.commit(); // Commit the batch to Firestore

//     console.log("All questions added successfully.", levelId);
//   } catch (error) {
//     console.error("Error adding questions:", error);
//   }
// }




  const getProgress = () => {
    console.log('progress ',(((progressHandler+0.3)) / (totalQuestions + wrongAnswers.length)) * 100);
    // console.log('progressHandler',progressHandler);
    const progress = ((progressHandler+0.3) / (totalQuestions + wrongAnswers.length)) * 100;
    if (progress >= 95 && wrongAnswers.length >= 1){
      // console.log('11');
      return 95;
    }else{
      // console.log('12',wrongAnswers.length);
      return progress;
    }
  };

  return (
<View style={styles.container}>
    {/* Progress Bar */}
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${getProgress()}%` }]} />
    </View>

  <ScrollView contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false} 
    showsHorizontalScrollIndicator={false}
  >
    {/* Question Text */}
    <Text style={styles.questionText}>{currentQuestion.question}</Text>

    {/* Options */}
    <View style={styles.optionsContainer}>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === option && !isAnswered && styles.selectedOption,
            isAnswered && selectedOption === option &&
            (selectedOption === currentQuestion.correctAnswer ? styles.correctOption : styles.incorrectOption),
            isAnswered && option === currentQuestion.correctAnswer && !isCorrect && styles.correctOption, // Show correct answer in green if wrong
          ]}
          onPress={() => handleOptionPress(option)}
          disabled={isAnswered}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>

    {/* Error Alert */}
    {showErrorAlert && (
      <View style={styles.errorAlert}>
        <Text style={styles.errorAlertText}>
          Wrong Answer! The correct answer is: {currentQuestion.correctAnswer}
        </Text>
      </View>
    )}

    {/* Check/Got It/Continue Button */}
    {selectedOption != null ? 
      <TouchableOpacity style={styles.actionButton} onPress={handleCheckAnswer}>
        <Text style={styles.actionButtonText}>
          {isAnswered ? (isCorrect ? "Continue" : "Got It") : "Check"}
        </Text>
      </TouchableOpacity>
      : 
      <TouchableOpacity style={styles.offButton} disabled={true}>
        <Text style={styles.actionButtonText}>
          {isAnswered ? (isCorrect ? "Continue" : "Got It") : "Check"}
        </Text>
      </TouchableOpacity>
    }
  </ScrollView>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    // paddingVertical:50,
    paddingTop:50,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '100%', // Ensure it takes full width
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  optionText: {
    fontSize: 18,
    color: '#FFF',
  },
  correctOption: {
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    borderColor: '#F44336',
  },
  selectedOption: {
    backgroundColor: '#3A3A3A',
    borderColor: '#2196F3',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    width: 330,
    textAlign: 'center',
  },
  offButton: {
    backgroundColor: '#808080',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    width: 330,
    textAlign: 'center',
  },
  actionButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 25,
    width: '100%',
    backgroundColor: '#444',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  errorAlert: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  errorAlertText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default McqScreen;



// //   const [question, setQuestion] = useState(route.params.question);
// //   const [options, setOptions] = useState(route.params.options);
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// const McqScreen = ({ navigation, route }) => {
//   const [question, setQuestion] = useState("What is Life?");
//   const [options, setOptions] = useState(['Book', 'Journey', 'TimePass']);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1); // Assuming 1st question
//   const totalQuestions = 5; // Assuming there are 5 questions in total

//   useEffect(() => {
//     const shuffledOptions = shuffleArray([...options]);
//     setOptions(shuffledOptions);
//   }, []);

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   const handleOptionPress = (option) => {
//     setSelectedOption(option);
//     setIsAnswered(true);
//     if (option === 'Journey') {
//       setIsCorrect(true);
//     } else {
//       setIsCorrect(false);
//     }
//   };

//   const handleNextQuestion = () => {
//     setIsAnswered(false);
//     setSelectedOption(null);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);

//     // Logic to navigate or update question
//     navigation.navigate('McqScreen', {
//       question: "What is your name?",
//       options: ['Kunal', 'Sumit', 'Divesh', 'Rohan'],
//     });
//   };

//   const getProgress = () => {
//     return (currentQuestionIndex / totalQuestions) * 100;
//   };

//   return (
//     <View style={styles.container}>
//       {/* Progress Bar */}
//       <View style={styles.progressBarContainer}>
//         <View style={[styles.progressBar, { width: `${getProgress()}%` }]} />
//       </View>

//       {/* Question Text */}
//       <Text style={styles.questionText}>{question}</Text>

//       {/* Options */}
//       <View style={styles.optionsContainer}>
//         {options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.option,
//               isAnswered && selectedOption === option && (isCorrect ? styles.correctOption : styles.incorrectOption),
//             ]}
//             onPress={() => handleOptionPress(option)}
//           >
//             <Text style={styles.optionText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Next Button */}
//       {isAnswered ? (
//         <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>)
//         : 
//        ( <View style={styles.nextButtonOff} >
//           <Text style={styles.nextButtonTextOff}>Next</Text>
//         </View>)
//        } 
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E1E1E',
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   questionText: {
//     fontSize: 24,
//     color: '#FFF',
//     marginBottom: 20,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   optionsContainer: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   option: {
//     backgroundColor: '#2A2A2A',
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     marginVertical: 10,
//     width: '80%',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#444',
//   },
//   optionText: {
//     fontSize: 18,
//     color: '#FFF',
//   },
//   correctOption: {
//     borderColor: '#4CAF50',
//   },
//   incorrectOption: {
//     borderColor: '#F44336',
//   },
//   nextButton: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     marginTop: 20,
//   },
//   nextButtonText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   nextButtonOff: {
//     backgroundColor: 'gray',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     marginTop: 20,
//   },
//   nextButtonTextOff: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   // Progress Bar Styles
//   progressBarContainer: {
//     height: 10,
//     width: width - 40, // Reduce some padding
//     backgroundColor: '#444',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#4CAF50', // Progress bar color
//     borderRadius: 10,
//   },
// });

// export default McqScreen;
