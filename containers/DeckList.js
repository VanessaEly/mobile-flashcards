import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, View, ActivityIndicator } from 'react-native';
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

  renderItem = ({item, index}) => {
    const { navigation } = this.props;
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DeckDetails', { index, id: item.key })}>
        <DeckCard index={index} {...item} />
      </TouchableOpacity>
    )
  }

  render() {
    const { ready } = this.state;
    const { decks } = this.props;
    

    if (ready === false) {
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    const data = Object.keys(decks).map((key) => {
      return { key, ...decks[key] }
    });

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
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
    paddingTop: 20,
  },
});

// receive redux decks as props
function mapStateToProps (decks) {
  return decks;
}
// connecting to get access to dispatch
export default connect(mapStateToProps)(DeckList)