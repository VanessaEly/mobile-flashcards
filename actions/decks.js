import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK } from './types';
import { fetchDecks, removeDeckById, saveDeckTitle, addCardToDeck } from '../utils/api';

const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks,
});

const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});

const addCard = (deckKey, card) => ({
  type: ADD_CARD,
  deckKey,
  card,
});

const deleteDeck = (deck) => ({
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

export const saveDeck = (id, deck) => dispatch => saveDeckTitle(id, deck)
  .then(() => {
    dispatch(addDeck({ [id]: deck }));
  });

export const saveCardToDeck = (deckKey, card) => dispatch => addCardToDeck(deckKey, card)
  .then(() => {
    dispatch(addCard(deckKey, card));
  });
  