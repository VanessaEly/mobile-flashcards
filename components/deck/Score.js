import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { getColor, darkRed, lightBlue } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';

export default class Card extends React.Component {
  render() {
    const { deckIndex, score, displayText, navigation, onRestart } = this.props;

    return (
      <View style={styles.cardContainer}>  
        <View style={[styles.deck, {backgroundColor: getColor(deckIndex)}]}>
          <Text>Score</Text>
          <Text>{score}%</Text>
          <Text>You got {displayText} answers right</Text>
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
  deck: {
    flex: 3,
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    justifyContent: 'space-around',
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
});
