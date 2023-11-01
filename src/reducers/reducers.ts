import { combineReducers } from 'redux';

import {
  Challenge,
  SET_CHALLENGE,
  ACCEPT_CHALLENGE,
  ADD_TO_CHALLENGES_LIST,
  DELETE_CHALLENGE,
  ADD_OWN_CHALLENGE
} from '../actions';


const initialChallengeState: Challenge = {
  text: '',  
};

const challengeReducer = (state = initialChallengeState, action: any) => {
  switch (action.type) {
    case SET_CHALLENGE:
      return action.payload;

    case ACCEPT_CHALLENGE:
      return { ...state};
    
    default:
      return state;
  }
};

const initialChallengesListState: Challenge[] = [];

export const challengesListReducer = (state = initialChallengesListState, action: any) => {
  switch (action.type) {
    case ADD_TO_CHALLENGES_LIST:
      if (!state.some((c) => c.text === action.payload.text)) {
        return [...state, action.payload];
      }
      return state;

    case ADD_OWN_CHALLENGE:      
      return  [...state, action.payload]
      

    case DELETE_CHALLENGE:
      return state.filter((c) => c.text !== action.payload.text);

    default:
      return state;
  }
};

const reducers = combineReducers({
  challenge: challengeReducer,
  challengesList: challengesListReducer,
});

export default reducers;
