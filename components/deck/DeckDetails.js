import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { connect } from "react-redux";
import { getColor, purple, white } from "../../utils/colors";
import CustomTouchable from '../CustomTouchable';

class DeckDetails extends Component {
  componentWillReceiveProps(nextProps){
    if(!nextProps.deck){
      this.props.navigation.goBack();
    }
  }
  
  render() {
    const { deck, navigation, deleteDeck } = this.props;
    const { id, index } = navigation.state.params;

    if(deck){
      return (
        <View style={[styles.container, {backgroundColor: getColor(index)}]}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckCardCount}>{deck.questions.length} cards</Text>
          <CustomTouchable
            onPress={() => navigation.navigate('StartQuiz', { id })}
            title='Start Quiz'
            icon={Platform.OS === 'ios' ? 'ios-play-circle' : 'md-play-circle'}
          />
          <CustomTouchable
            onPress={() => navigation.navigate('AddCard', { id })}
            title='Add Card'
            icon={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
          />
          <CustomTouchable
            onPress={() => deleteDeck(id)}
            title='Remove Deck'
            icon={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
          />
        </View>
      );
    }
    else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 35,
    fontWeight:"bold",
    marginBottom: 40
  },
  deckCardCount: {
    fontSize: 30,
    marginBottom: 40
  },
  button: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  buttonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  iconContainer: {
    padding: 10, 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = ({decks}, props) => {
  const { id } = props.navigation.state.params;

  return {
    deck : decks[id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDeck: (deckId) => {
      dispatch(handleDeleteDeck(deckId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
