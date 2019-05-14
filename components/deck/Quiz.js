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
          <Text>{currentCard + 1}/{deck.questions.length}</Text>
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
});

const mapStateToProps = ({decks}, props) => {
  const { id } = props.navigation.state.params;

  return {
    deck : decks[id]
  }
}

export default connect(mapStateToProps)(Quiz);
