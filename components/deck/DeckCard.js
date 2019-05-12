import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightGray, getColor } from '../../utils/colors';

const DeckCard = (props) => {
  const { index, title, questions } = props;

  return (
    <View style={[styles.container, {backgroundColor: getColor(index)}]}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>
        {questions.length} Cards
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
  },
});

export default DeckCard;