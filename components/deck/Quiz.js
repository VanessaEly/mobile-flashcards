import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Score from './Score';
import Card from '../card/Card';
import { darkBlue, background } from '../../utils/colors';
/**
 * This component is used to display the deck's quiz
 */
class Quiz extends React.Component {
  state = {
    currentCard: 0,
    correctAnswers: 0,
    attempts: 0,
  }
  /**
   * Whenever the user presses 'correct' (true) or 'incorrect' (false) buttons, we receive the answer and
   * add 1 to the correctAnswers if the answer is correct. We also add 1 to the currectCard count, to make
   * the next card be displayed.
   * @param {bool} answer - user answer, true for correct and false for incorrect
   */
  handleAnswer = answer => {
    this.setState((prevState) => ({
      // go to the next card
      currentCard: prevState.currentCard + 1,
      // if answer is true ('correct'), add 1 to correctAnswers, else, add 0
      correctAnswers: prevState.correctAnswers + (answer ? 1 : 0),
    }));
  }
  /**
   * This function restarts the quiz state, also adding one attempt to the quiz
   */
  restartQuiz = () => {
    this.setState((prevState) =>({ currentCard: 0, correctAnswers: 0, attempts: prevState.attempts + 1 }));
  }
  /**
   * Function responsible for getting the score percent
   */
  getScore () {
    const { correctAnswers } = this.state;
    const { deck } = this.props;

    return Math.round((correctAnswers/deck.questions.length)*100);
  }
  render() {
    const { deck, navigation } = this.props;
    const { currentCard, correctAnswers, attempts } = this.state;
    const { index } = navigation.state.params;
    
    return (
      <View style={styles.container} key={attempts}>
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
                <Text style={styles.progressText}>{currentCard + 1}/{deck.questions.length}</Text>
                <Progress.Bar color={darkBlue} progress={((currentCard + 1)/deck.questions.length)} width={200}/>
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
    backgroundColor: background,
  },
  header: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCounter: {
    padding: 5,
  },
  progressText: {
    color: darkBlue,
    fontSize: 18,
    lineHeight: 18
  }
});

const mapStateToProps = ({decks}, props) => {
  const { id } = props.navigation.state.params;

  return {
    deck : decks[id]
  }
}

export default connect(mapStateToProps)(Quiz);
