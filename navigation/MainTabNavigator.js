import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import DeckList from '../containers/DeckList';
import NewDeck from '../containers/NewDeck';
import DeckDetails from '../components/deck/DeckDetails';
import Quiz from '../components/deck/Quiz';
import NewCard from '../components/card/NewCard';
import { getNavigationOptions } from '../utils/shared';

const DeckListStack = createStackNavigator({
  DeckList: DeckList,
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: getNavigationOptions('Deck Details'),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: getNavigationOptions('Quiz'),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: getNavigationOptions('New Card'),
  }
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
