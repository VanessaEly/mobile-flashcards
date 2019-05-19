import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK } from '../actions/types';

const decks = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_DECKS:
      // when decks are received, merge the current state with the decks returned
      return { ...state, ...action.decks };
    case ADD_DECK:
      // merging decks
      return { ...state, ...action.deck };
    case ADD_CARD:
      const { deckKey, card } = action;
      return {
        ...state,
        [deckKey]: {
          ...state[deckKey],
          questions: state[deckKey].questions.concat(card),
        }
      }
    case DELETE_DECK :
      delete state[action.deck];
      return { ...state };
    default:
      return state;
  }
};

export default decks;