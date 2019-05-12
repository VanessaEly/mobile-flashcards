import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightGray, white } from '../../utils/colors';

const DeckCard = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.title}
      </Text>
      <Text style={styles.subtitle}>
        {props.questions.length} Cards
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  subtitle: {
    color: lightGray,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
  },
});

export default DeckCard;