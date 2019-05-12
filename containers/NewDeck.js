import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { getNavigationOptions } from '../utils/shared';

export default class NewDeck extends React.Component {
  static navigationOptions = getNavigationOptions('New Deck')

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
