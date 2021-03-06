import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { getDecks } from '../actions/decks';
import Header from '../components/Header';
import DeckContent from '../components/deck/DeckContent';
import { background } from '../utils/colors';
/**
 * Component used as the application's home page. This component lists all current decks,
 */
class DeckList extends React.Component {
  // hiding the navigation header
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    const { getAllDecks } = this.props
    //receiving our decks
    getAllDecks();
  }
  renderItem = ({item, index}) => {
    const { navigation } = this.props;
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DeckDetails', { index, id: item.key })}>
        <DeckContent index={index} {...item} />
      </TouchableOpacity>
    )
  }
  render() {
    const { decks } = this.props;

    if (Object.keys(decks).length === 0) {
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    const data = Object.keys(decks).map((key) => {
      return { key, ...decks[key] }
    });

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: background,
  },
});

// receive redux decks as props
function mapStateToProps (decks) {
  return decks;
}

const mapDispatchToProps = dispatch => ({
  getAllDecks: () => {
    dispatch(getDecks());
  },
});
// connecting to get access to dispatch
export default connect(mapStateToProps, mapDispatchToProps)(DeckList)