import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api';
import { receiveDecks } from '../actions/decks'
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    const { decks } = this.props;
    
    if (ready === false) {
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            {Object.keys(decks).map((key) => (
              <Text key={key} style={styles.baseText}>
                {key}
              </Text>
            ))}
          </View>
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
  baseText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});

// receive redux decks as props
function mapStateToProps (decks) {
  return decks;
}
// connecting to get access to dispatch
export default connect(mapStateToProps)(DeckList)