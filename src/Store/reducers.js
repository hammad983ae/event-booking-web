// reducers.js
import { combineReducers } from 'redux';
import { SIGN_UP, FILL_PROFILE, LIST_SERVICES } from './actionTypes';

const initialState = {
  eventManager: null,
  profile: null,
  services: [],
};

const eventManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        eventManager: action.payload,
      };
    case FILL_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case LIST_SERVICES:
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  eventManager: eventManagerReducer,
  // Add more reducers here if needed
});

export default rootReducer;
