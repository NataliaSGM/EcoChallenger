export interface Challenge {  
  text: string;   
}

export const SET_CHALLENGE = 'SET_CHALLENGE';
export const ACCEPT_CHALLENGE = 'ACCEPT_CHALLENGE';
export const ADD_TO_CHALLENGES_LIST = 'ADD_TO_CHALLENGES_LIST';
export const DELETE_CHALLENGE = 'DELETE_CHALLENGE';
export const ADD_OWN_CHALLENGE = 'ADD_OWN_CHALLENGE'

export const setChallenge = (challenge: Challenge) => ({
  type: SET_CHALLENGE,
  payload: challenge,
});

export const acceptChallenge = () => ({
  type: ACCEPT_CHALLENGE,
});

export const addToChallengesList = (challenge: Challenge) => ({
  type: ADD_TO_CHALLENGES_LIST,
  payload: challenge,
});

export const addOwnChallenge = (challenge: Challenge) => {
  return {
    type: ADD_OWN_CHALLENGE,
    payload: challenge
  }
}

export const deleteChallenge = (challenge: Challenge) => ({
  type: DELETE_CHALLENGE,
  payload: challenge,
});
