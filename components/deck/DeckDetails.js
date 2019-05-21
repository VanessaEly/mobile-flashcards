import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Alert, Animated } from 'react-native';
import { connect } from 'react-redux';
import { getColor, darkBlue, darkRed, lightBlue, background, lighterGray } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';
import { removeDeck } from '../../actions/decks';
/**
 * This component is used to display details about a deck, including all functionalities
 * related to it, like starting a quiz, removing a deck or adding a card
 */
class DeckDetails extends Component {
  state = {
    bounceValue: new Animated.Value(0),
  }
  componentDidMount = () => {
    const { bounceValue } = this.state;
    Animated.timing(bounceValue, { duration: 800, toValue: 1 }).start();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.deck){
      this.props.navigation.goBack();
    }
  }
  /**
   * Function responsible for deleting a deck
   * @param {string} id - id of the deck that is being deleted 
   */
  handleDeleteDeck = id => {
    const { deleteDeck } = this.props;
    Alert.alert('Are you sure?', 'This action cannot be undone',
      [{ text: 'Cancel' }, { text: 'OK', onPress: () => deleteDeck(id) }],
      { cancelable: false },
    );
  }
  render() {
    const { deck, navigation } = this.props;
    const { bounceValue } = this.state;
    const { id, index } = navigation.state.params;

    if(deck){
      return (
        <Animated.View style={[styles.container, { transform: [{ scale: bounceValue }] }]}>
          <View style={[styles.deck, {backgroundColor: getColor(index)}]}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={[styles.cardCount]}>{deck.questions.length} cards</Text>
            <View style={[styles.buttonContainer, {flex: .1}]}>
              {deck.questions.length > 0 && (
                <CustomTouchable
                  backgroundColor={darkBlue}
                  onPress={() => navigation.navigate('Quiz', { index, id })}
                  title='Start Quiz'
                  icon={Platform.OS === 'ios' ? 'ios-play-circle' : 'md-play-circle'}
                />
              )}
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <CustomTouchable
              backgroundColor={darkRed}
              onPress={() => this.handleDeleteDeck(id)}
              title='Remove Deck'
              icon={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
            />
            <CustomTouchable
              backgroundColor={lightBlue}
              onPress={() => navigation.navigate('NewCard', { index, id, deckTitle: deck.title })}
              title='Add Card'
              icon={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            />
          </View>
        </Animated.View>
      );
    }
    else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  deck: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  title: {
    borderBottomWidth: 1,
    fontSize: 35,
    fontWeight: 'bold',
    color: lighterGray,
  },
  cardCount: {
    fontSize: 25,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
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
      dispatch(removeDeck(deckId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
