import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Score from './Score';
import Card from '../card/Card';

class Quiz extends React.Component {
  state = {
    currentCard: 0,
    correctAnswers: 0,
  }
  handleAnswer = answer => {
    this.setState((prevState) => ({
      // go to the next card
      currentCard: prevState.currentCard + 1,
      // if answer is true ('correct'), add 1 to correctAnswers, else, add 0
      correctAnswers: prevState.correctAnswers + (answer ? 1 : 0),
    }));
  }
  restartQuiz = () => {
    console.log('restarting')
  }
  getScore () {
    const { correctAnswers } = this.state;
    const { deck } = this.props;

    return Number(Math.round(correctAnswers/deck.questions.length) * 100).toFixed(2);
  }
  render() {
    const { deck, navigation } = this.props;
    const { currentCard, correctAnswers } = this.state;
    const { index } = navigation.state.params;

    return (
      <View style={styles.container}>
          { currentCard > (deck.questions.length - 1)
            ? (
              <Score
                score={this.getScore()}
                deckIndex={index}
                displayText={`${correctAnswers} of ${deck.questions.length}`}
                navigation={navigation}
                onRestart={this.restartQuiz}
              />
            ) : (
              <View style={styles.header}>
                <Text style={styles.cardCounter}>Question {currentCard + 1}/{deck.questions.length}</Text>
              </View>
            )
          }
          {deck.questions.map((card, key) => (
            <Card
              deckIndex={index}
              key={key}
              card={card}
              displayCard={key === currentCard}
              onAnswer={this.handleAnswer}
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
