import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView  } from 'react-native'
import { connect } from 'react-redux'
import { saveDeck } from '../actions/decks';
import { generateId } from '../utils/shared';
import { lighterBlue, darkBlue, background } from '../utils/colors';
import Header from '../components/Header';
import CustomTouchable from '../components/CustomTouchable';

class NewDeckScreen extends Component {
  // static navigationOptions = getNavigationOptions('New Deck')
  static navigationOptions = {
    header: null,
  };
  state = {
    title: '',
  }

  submit = () => {
    const { title } = this.state;
    const { addDeck, navigation } = this.props;

    if (title.length === 0) {
      alert('Please fill title field')
      return;
    }

    const deck = { title, questions: [] };
    const id = generateId();
    addDeck(id, deck);
    this.setState({ title: '' });
    navigation.navigate('DeckDetails', { id })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.deckContainer}>
          <KeyboardAvoidingView style={styles.deck} behavior="padding">
            <View style={styles.deckContent}>
              <View style={[styles.deckBlock, styles.title]}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Create Deck</Text>
                <Text style={{fontSize: 15, padding: 10}}>What is the title of your new deck?</Text>
              </View>
              <View style={styles.deckBlock}>
                <TextInput
                  style={styles.input}
                  placeholder={'Deck Title'}
                  onChangeText={(text) => this.setState({ title: text })}
                  value={this.state.title}
                />
              </View>
              <View style={{flex: .4}}>
                <CustomTouchable
                backgroundColor={darkBlue}
                onPress={this.submit}
                title='Create Deck' />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deckContainer: {
    flex: 1,
    backgroundColor: background,
  },
  deck: {
    flexDirection: 'row',
    flex: .8,
    top: 30,
    marginHorizontal: 15,
    backgroundColor: lighterBlue,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  deckContent: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  deckBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: darkBlue,
    borderWidth: 1,
    height: 38,
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    alignItems: 'center',
    marginTop: 20,
    color: darkBlue,
  },
})

const mapDispatchToProps = dispatch => {
  return {
    addDeck : (id, deck) => dispatch(saveDeck(id, deck)),
  }
}

export default connect(null, mapDispatchToProps)(NewDeckScreen)