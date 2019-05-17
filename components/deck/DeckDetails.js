import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getColor, darkGray, darkBlue, darkRed, lightBlue } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';
import { removeDeck } from '../../actions/decks';

class DeckDetails extends Component {
  componentWillReceiveProps(nextProps){
    if(!nextProps.deck){
      this.props.navigation.goBack();
    }
  }
  handleDeleteDeck = id => {
    const { deleteDeck } = this.props;
    Alert.alert('Are you sure?', 'This action cannot be undone',
      [{ text: 'Cancel' }, { text: 'OK', onPress: () => deleteDeck(id) }],
      { cancelable: false },
    );
  }
  
  render() {
    const { deck, navigation } = this.props;
    const { id, index } = navigation.state.params;

    if(deck){
      return (
        <View style={styles.container}>
          <View style={[styles.deck, {backgroundColor: getColor(index || 0)}]}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={[styles.cardCount, {color: darkGray}]}>{deck.questions.length} cards</Text>
          </View>
          <View style={styles.buttonContainer}>
            {deck.questions.length > 0 && (
              <CustomTouchable
                backgroundColor={darkBlue}
                onPress={() => navigation.navigate('Quiz', { index, id })}
                title='Start Quiz'
                icon={Platform.OS === 'ios' ? 'ios-play-circle' : 'md-play-circle'}
              />
            )}
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
              onPress={() => navigation.navigate('AddCard', { id })}
              title='Add Card'
              icon={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            />
          </View>
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
    flex: 1,
    backgroundColor: 'transparent',
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
  },
  cardCount: {
    fontSize: 25,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
