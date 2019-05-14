import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { darkGray } from '../../utils/colors';

const CardDetails = (props) => {
  const { onPress, cardText, buttonText, scaleX } = props;

  return (
    <TouchableOpacity style={[styles.card, {transform: [{scaleX}]}]} onPress={() => onPress()} >
      <View style={styles.textContainer}>
        <Text style={styles.cardText}>{cardText}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Ionicons
          style={styles.buttonIcon}
          onPress={this.flip}
          name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
          size={24} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    width: 24,
    flex: 1,
    maxWidth: 24,
    color: darkGray,
  },
  buttonText: {
    fontSize: 17,
    flex: 10,
    maxWidth: 130,
    paddingLeft: 5,
    color: darkGray,
  },
});

export default CardDetails;
