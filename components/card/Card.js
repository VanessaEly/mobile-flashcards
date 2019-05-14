import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColor, darkRed, lightBlue, darkGray } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';

export default class Card extends React.Component {
  state = {
    currentCard: 0,
    isFlipped: false,
    rotate: new Animated.Value(0),
  }
  flipCard = () => {
    console.log('flip')
    const { isFlipped } = this.state
    Animated.spring(this.state.rotate, {
      friction: 6,
      tension: 20,
      useNativeDriver: true,
      toValue: isFlipped ? 0 : 180,
    }).start();
    this.setState({ isFlipped: !isFlipped} );
  }
  render() {
    const { deckIndex, card, displayCard } = this.props;
    const { isFlipped } = this.state;

    if (!displayCard) {
        return null
    }

    return (
      <View style={styles.cardContainer}>  
        <Animated.View style={[styles.deck, {backgroundColor: getColor(deckIndex), transform: [{rotateY: this.state.rotate.interpolate({inputRange: [0, 1],  outputRange: [ '0deg', '180deg' ]})},]}]}>
        {!isFlipped && (
          <TouchableOpacity onPress={this.flipCard}>
            <Text style={styles.title}>{card.question}</Text>
            <View style={styles.cardFrontButtonContainer}>
              <Ionicons
                style={styles.cardFrontButtonIcon}
                onPress={this.flip}
                name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
                size={24} />
              <Text style={styles.cardFrontButtonText}>Show Answer</Text>
            </View>
          </TouchableOpacity>
        )}
        {isFlipped && (
          <TouchableOpacity onPress={this.flipCard}>
            <Text>Oi</Text>
          </TouchableOpacity>
        )}
        </Animated.View>
        <View style={styles.choices}>
          <CustomTouchable
            backgroundColor={darkRed}
            onPress={() => navigation.navigate('AddCard', { id })}
            title='Incorrect'
            icon={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
          />
          <CustomTouchable
            backgroundColor={lightBlue}
            onPress={() => navigation.navigate('AddCard', { id })}
            title='Correct'
            icon={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  deck: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  choices: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardFrontButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cardFrontButtonIcon: {
    width: 24,
    flex: 1,
    maxWidth: 24,
    color: darkGray,
  },
  cardFrontButtonText: {
    fontSize: 17,
    flex: 10,
    maxWidth: 130,
    paddingLeft: 5,
    color: darkGray,
  },
});
