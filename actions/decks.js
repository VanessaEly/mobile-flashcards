import { RECEIVE_DECKS, ADD_DECK} from './types';

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks,
});

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});