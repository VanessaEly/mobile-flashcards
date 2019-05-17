import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Score from './Score';
import Card from '../card/Card';
import { darkBlue } from '../../utils/colors';

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
    this.setState({ currentCard: 0, correctAnswers: 0 });
  }
  getScore () {
    const { correctAnswers } = this.state;
    const { deck } = this.props;

    return Math.round((correctAnswers/deck.questions.length)*100);
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
    backgroundColor: 'transparent',
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
