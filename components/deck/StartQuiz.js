import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default class StartQuiz extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Start Quiz</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
