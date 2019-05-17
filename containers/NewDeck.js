import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView  } from 'react-native'
import { connect } from 'react-redux'
import { getNavigationOptions, generateId } from '../utils/shared';
import { lightBlue, darkBlue } from '../utils/colors';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    const { title } = this.state
    const { addDeck, navigation } = this.props

    if (title.length === 0) {
      alert('Please fill title field')
      return
    }

    const deck = {id : generateId(), title : title, questions: []}
    addDeck(deck)
    this.reset()
    navigation.navigate('DeckViewScreen', {id: deck.id, title: deck.title})
  }

  reset = () => {
    this.setState({
      title: '',
    })
  }

  render() {
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
        <Header />
        <View style={styles.deck}>
          <View style={styles.deckContent}>
            <View style={styles.deckBlock}>
              <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
            </View>
            <View style={styles.deckBlock}>
              <TextInput
                style={styles.deckInput}
                placeholder={'Deck Title'}
                onChangeText={(text) => this.setState({title: text})}
                value={this.state.title}
              />
            </View>
            <View style={{flex: .4}}>
              <CustomTouchable
              backgroundColor={darkBlue}
              // onPress={onRestart}
              title='Submit' />
            </View>
            
          </View>
        </View>
        <Footer />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deck: {
    flexDirection: 'row',
    flex: 1,
    margin: 15,
    backgroundColor: lightBlue,
    borderRadius: 16,
    padding: 10,
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
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  deckBlock: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  deckTitle: {
    backgroundColor: 'pink',
    fontSize: 18,
    lineHeight: 20,
  },
  deckInput: {
    backgroundColor: 'white',
    borderColor: darkBlue,
    borderWidth: 1,
    height: 38,
    borderRadius: 4,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})


function mapDispatchToProps(dispatch) {
  return {
    addDeck : (deck) => dispatch(addDeck(deck)),
  }
}

export default connect(null, mapDispatchToProps)(NewDeckScreen)