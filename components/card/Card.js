import React from 'react';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { getColor, darkRed, lightBlue } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';
import CardDetails from './CardDetails';
/**
 * This component is used to display cards during the quiz
 */
export default class Card extends React.Component {
  state = {
    isFlipped: false,
    rotate: new Animated.Value(0),
  }
  /**
   * This function starts an animation responsible for flipping the current card.
   * This is triggered whenever a quiz card is pressed
   */
  flipCard = () => {
    const { isFlipped, rotate } = this.state;

    Animated.timing(rotate, {
      friction: 8,
      tension: 40,
      useNativeDriver: true,
      toValue: isFlipped ? 0 : 1,
    }).start();

    setTimeout(() => {
      this.setState({ isFlipped: !isFlipped })
    }, 10);
  }
  render() {
    const { deckIndex, card, displayCard, onAnswer } = this.props;
    const { isFlipped } = this.state;

    if (!displayCard) {
        return null
    }

    return (
      <View style={styles.cardContainer}>  
        <Animated.View  style={[styles.card, {backgroundColor: getColor(deckIndex), transform: [{rotateY: this.state.rotate.interpolate({inputRange: [0, 1],  outputRange: [ '0deg', '180deg' ]})},]}]}>
        {!isFlipped && (
          <CardDetails
            onPress={() => this.flipCard()}
            cardText={card.question}
            buttonText='Show Answer'
            scaleX={1} />
        )}
        {isFlipped && (
          <CardDetails
            onPress={() => this.flipCard()}
            cardText={card.answer}
            buttonText='Show Question'
            scaleX={-1} />
        )}
        </Animated.View>
        <View style={styles.choices}>
          <CustomTouchable
            backgroundColor={darkRed}
            onPress={() => onAnswer(false)}
            title='Incorrect'
            icon={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} />
          <CustomTouchable
            backgroundColor={lightBlue}
            onPress={() => onAnswer(true)}
            title='Correct'
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
  card: {
    flex: 3,
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 15,
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
