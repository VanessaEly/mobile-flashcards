import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../card/Card';

class Quiz extends React.Component {
  state = {
    currentCard: 0,
  }
  render() {
    const { deck, navigation } = this.props;
    const { currentCard } = this.state;
    const { index } = navigation.state.params;

    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.cardCounter}>Question {currentCard + 1}/{deck.questions.length}</Text>
          </View>
          {deck.questions.map((card, key) => (
            <Card
              deckIndex={index}
              key={key}
              card={card}
              displayCard={key === currentCard}
            />
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCounter: {
    padding: 5,
  }
});

const mapStateToProps = ({decks}, props) => {
  const { id } = props.navigation.state.params;

  return {
    deck : decks[id]
  }
}

export default connect(mapStateToProps)(Quiz);
