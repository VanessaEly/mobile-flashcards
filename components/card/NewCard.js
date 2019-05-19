import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView  } from 'react-native'
import { connect } from 'react-redux'
import { saveDeck } from '../../actions/decks';
import { generateId } from '../../utils/shared';
import { lighterBlue, darkBlue } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { question, answer } = this.state;
    const { addDeck, navigation } = this.props;

    if (question.length === 0) {
      alert('Please fill question field')
      return;
    }
    if (answer.length === 0) {
      alert('Please fill answer field')
      return;
    }

    const card = { question, answer };
    addDeck(id, card);
    this.setState({ question: '', answer: '' });
    navigation.navigate('DeckDetails', { id })
  }

  render() {
    const { navigation } = this.props;
    const { deckTitle } = navigation.state.params;

    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding">
        <View style={styles.deck}>
          <View style={styles.deckContent}>
            <View style={[styles.deckBlock, styles.title]}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>{deckTitle}</Text>
              <Text style={{fontSize: 15, padding: 10}}>Insert this deck's new card details</Text>
            </View>
            <View style={styles.deckBlock}>
              <TextInput
                style={styles.input}
                placeholder={'Card Question'}
                onChangeText={(text) => this.setState({ question: text })}
                value={this.state.question}
              />
              <TextInput
                style={styles.input}
                placeholder={'Card Answer'}
                onChangeText={(text) => this.setState({ answer: text })}
                value={this.state.answer}
              />
            </View>
            <View style={{flex: .5}}>
              <CustomTouchable
              backgroundColor={darkBlue}
              onPress={this.submit}
              title='Create Card' />
            </View>
          </View>
        </View>
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
    flex: .7,
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
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    alignItems: 'center',
    color: darkBlue,
  },
})

const mapDispatchToProps = dispatch => {
  return {
    addDeck : (id, deck) => dispatch(saveDeck(id, deck)),
  }
}

export default connect(null, mapDispatchToProps)(NewCard)