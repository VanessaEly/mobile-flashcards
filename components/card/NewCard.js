import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView  } from 'react-native'
import { connect } from 'react-redux'
import { saveCardToDeck } from '../../actions/decks';
import { darkBlue, lighterGray, getColor, background } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';

/**
 * This component is used to display the card creation page
 */
class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  /**
   * Checks if question and answer are filled and, if yes, submits the new card to the deck
   */
  submit = () => {
    const { question, answer } = this.state;
    const { addCard, navigation } = this.props;
    const { id } = navigation.state.params;

    if (question.trim().length === 0) {
      alert('Please fill question field')
      return;
    }
    if (answer.trim().length === 0) {
      alert('Please fill answer field')
      return;
    }

    const card = { question, answer };
    addCard(id, card);
    this.setState({ question: '', answer: '' });
    navigation.navigate('DeckDetails', { id })
  }

  render() {
    const { navigation } = this.props;
    const { index, deckTitle } = navigation.state.params;

    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding">
        <View style={[styles.card, {backgroundColor: getColor(index)}]}>
          <View style={styles.cardContent}>
            <View style={[styles.cardBlock, styles.title]}>
              <Text style={styles.cardTitle}>{deckTitle}</Text>
              <Text style={styles.cardSubtitle}>Insert this deck's new card details</Text>
            </View>
            <View style={styles.cardBlock}>
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
    backgroundColor: background,
  },
  card: {
    flexDirection: 'row',
    flex: .7,
    top: 30,
    marginHorizontal: 15,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  cardBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: lighterGray,
  },
  cardSubtitle: {
    fontSize: 15,
    padding: 10,
    color: lighterGray,
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
    addCard : (deckId, card) => dispatch(saveCardToDeck(deckId, card)),
  }
}

export default connect(null, mapDispatchToProps)(NewCard)