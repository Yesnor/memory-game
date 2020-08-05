import { createStore } from "redux";

const initialState = {
  cards: [],
  shuffledCards: [],
  match1: { id: false, uniqueId: false },
  match2: { id: false, uniqueId: false },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MATCH1":
      return { ...state, match1: { id: action.id, uniqueId: action.uniqueId } };
    case "MATCH2":
      return { ...state, match2: { id: action.id, uniqueId: action.uniqueId } };
    case "FETCH":
      return { ...state, cards: action.cards };
    case "SHUFFLE":
      return { ...state, shuffledCards: action.cards };
    default:
      return state;
  }
};

export const store = createStore(reducer);
