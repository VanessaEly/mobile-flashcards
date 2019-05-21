// AsyncStorage is a simple, unencrypted, asynchronous, persistent,
// key-value storage system that is global to the app. It should be used instead of LocalStorage.
import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

const getInitialData = () => (
  {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
  }
);
/**
 * Fetching all application decks
 */
export const fetchDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(response => JSON.parse(response))
      .then(data => {
        if (data !== null) {
          return data;
        }
        else {
          AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getInitialData()))
          return getInitialData();
        }
  });
}
/**
 * Saving a new deck
 * @param {Number} id - deck index
 * @param {Object} deck - a deck with a title string and an empty questions array
 */
export const saveDeckTitle = (id, deck) => {
  // merge the deck received into the asyncStorage key that was passed
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [id]: deck
  }));
}
/**
 * Remove a deck from the storage based on its id
 * @param {Number} key - id of the deck that will be removed
 */
export const removeDeckById = (key) => {
  // search for and remove item with that key from the asyncStorage
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(response => JSON.parse(response))
  .then(data => {
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
} 
/**
 * Add a new card to the selected deck
 * @param {Number} key - deck key
 * @param {Object} card - card that will be added, which is an object with question and answer strings
 */
export function addCardToDeck(key, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    const decks = JSON.parse(result);
    decks[key].questions.push(card);
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
}