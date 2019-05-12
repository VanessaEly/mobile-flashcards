import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api';
import { receiveDecks } from '../actions/decks'
import Header from '../components/Header';
import Footer from '../components/Footer';
import DeckCard from '../components/deck/DeckCard';

class DeckList extends React.Component {
  // hiding the navigation header
  static navigationOptions = {
    header: null,
  };

  state ={
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props
    //receiving our decks
    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { ready } = this.state;
    const { decks, navigation } = this.props;
    
    if (ready === false) {
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {Object.keys(decks).map(id => (
            <TouchableOpacity key={id} onPress={() => navigation.navigate('DeckDetails', { id })}>
              <DeckCard key={id} {...decks[id]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

// receive redux decks as props
function mapStateToProps (decks) {
  return decks;
}
// connecting to get access to dispatch
export default connect(mapStateToProps)(DeckList)