import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { getColor, darkRed, lightBlue } from '../../utils/colors';
import CustomTouchable from '../CustomTouchable';

class Quiz extends React.Component {
  render() {
    const { deck, navigation } = this.props;
    const { index } = navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={[styles.deck, {backgroundColor: getColor(index)}]}>
          <Text style={styles.title}>{deck.title}</Text>
        </View>
        <View style={styles.choices}>
          <CustomTouchable
            backgroundColor={darkRed}
            onPress={() => navigation.navigate('AddCard', { id })}
            title='Incorrect'
            icon={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
          />
          <CustomTouchable
            backgroundColor={lightBlue}
            onPress={() => navigation.navigate('AddCard', { id })}
            title='Correct'
            icon={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
          />
        </View>
      </View>
    );
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
    marginVertical: 15,
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
  choices: {
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

export default connect(mapStateToProps)(Quiz);
