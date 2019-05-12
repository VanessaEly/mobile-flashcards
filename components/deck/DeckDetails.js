import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { lightGray, purple, white } from "../../utils/colors";

class DeckDetails extends Component {
  onAddCardPress(id) {
    this.props.navigation.navigate("AddCard", {
      deckId : id
    });
  }

  startQuiz(id) {
    this.props.navigation.navigate("Quiz", {
      deckId : id
    });
  }

  onDeleteDeckPress(id) {
    this.props.deleteDeck(id);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.deck){
      this.props.navigation.goBack();
    }
  }
  
  render() {
    const { deck, navigation } = this.props;
    const { id } = navigation.state.params;

    if(deck){
      return (
        <View style={styles.container}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckCardCount}>{deck.questions.length} cards</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("StartQuiz", { id })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconContainer, {backgroundColor: purple}]}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
              color={white}
              size={25}
            />
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconContainer, {backgroundColor: purple}]}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
              color={white}
              size={25}
            />
            <Text>Remove Deck</Text>
          </TouchableOpacity>
        </View>
        // <TouchableOpacity style={styles.btn} onPress={()=> this.onAddCardPress(deck.id) } bordered block >
        //     <Text style={{color: lightGray}}>Add Card</Text>
        // </TouchableOpacity>
        // <TouchableOpacity style={styles.btn} onPress={()=> this.onDeleteDeckPress(deck.id) } transparent danger block >
        //     <Text>Delete Deck</Text>
        // </TouchableOpacity>
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
    backgroundColor: lightGray,
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
