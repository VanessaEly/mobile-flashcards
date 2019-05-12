import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { white, purple } from '../utils/colors';

export default class NewDeck extends React.Component {
  static navigationOptions = {
    title: 'New Deck',
    headerTintColor: white,
    headerStyle: {
      backgroundColor: purple,
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>New</Text>
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
