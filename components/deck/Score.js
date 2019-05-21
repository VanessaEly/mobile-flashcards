import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Progress from 'react-native-progress';
import { getColor, darkRed, lightBlue, white, lighterGray } from '../../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../../utils/notification';
import CustomTouchable from '../CustomTouchable';
/**
 * This component is used to display the user score at the end of each quiz
 */
export default class Score extends React.Component {
  state = {
    progress: 0,
  }
  componentDidMount() {
    const { score } = this.props;
    // clearing today's notification and setting a new one fro tomorrow
    clearLocalNotification()
      .then(setLocalNotification);

    setTimeout(() => {
      this.setState({ progress: score })
    }, 500);
  }
  render() {
    const { deckIndex, score, displayText, navigation, onRestart } = this.props;
    const { progress } = this.state;

    return (
      <View style={styles.cardContainer}>  
        <View style={[styles.score, {backgroundColor: getColor(deckIndex)}]}>
          <Progress.Circle
            size={100}
            formatText={() => `${score}%`}
            animated={true}
            progress={progress/100}
            showsText={true}
            color={white}
          />
          <Text style={styles.text}>Your score is {score}%</Text>
          <Text style={styles.text}>You got {displayText} answers right</Text>
        </View>
        <View style={styles.choices}>
          <CustomTouchable
            backgroundColor={darkRed}
            onPress={()=> {navigation.goBack()}}
            title='Back to Deck'
            icon={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} />
          <CustomTouchable
            backgroundColor={lightBlue}
            onPress={onRestart}
            title='Restart Quiz'
            icon={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  score: {
    flex: 3,
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 0,
    shadowOpacity: 0.8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    transform: [
      { perspective: 1000 }
    ],
  },
  choices: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: lighterGray,
  }
});
