import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkGray, getColor } from '../../utils/colors';

const DeckContent = (props) => {
  const { index, title, questions } = props;

  return (
    <View style={[styles.container, {backgroundColor: getColor(index)}]}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text style={[styles.subtitle, {color: darkGray}]}>
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
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
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

export default DeckContent;