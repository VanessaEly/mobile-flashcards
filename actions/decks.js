import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from './types';
import { fetchDecks, removeDeckById } from '../utils/api';

const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks,
});

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});

deleteDeck = (deck) => ({
  type: DELETE_DECK,
  deck,
});

export const getDecks = () => dispatch => fetchDecks()
  .then((decks) => {
    dispatch(receiveDecks(decks));
  });

  export const removeDeck = (id) => dispatch => removeDeckById(id)
  .then(() => {
    dispatch(deleteDeck(id));
  });
  