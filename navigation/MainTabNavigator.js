import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import DeckList from '../containers/DeckList';
import NewDeck from '../containers/NewDeck';
import DeckDetails from '../components/deck/DeckDetails';
import StartQuiz from '../components/deck/StartQuiz';
import { white, purple } from '../utils/colors';

const DeckListStack = createStackNavigator({
  DeckList: DeckList,
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      title: 'Deck Details',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  StartQuiz: {
    screen: StartQuiz,
    navigationOptions: {
      title: 'Start Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
});

DeckListStack.navigationOptions = {
  tabBarLabel: 'Deck List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={ Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
    />
  ),
};

const NewDeckStack = createStackNavigator({
  NewDeck: NewDeck,
});

NewDeckStack.navigationOptions = {
  tabBarLabel: 'New Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
    />
  ),
};

export default createBottomTabNavigator({
  DeckListStack,
  NewDeckStack,
});
