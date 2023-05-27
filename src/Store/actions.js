// actions.js
import { SIGN_UP, FILL_PROFILE, LIST_SERVICES } from './actionTypes';

export const signUp = (userData) => ({
  type: SIGN_UP,
  payload: userData,
});

export const fillProfile = (profileData) => ({
  type: FILL_PROFILE,
  payload: profileData,
});

export const listServices = (serviceData) => ({
  type: LIST_SERVICES,
  payload: serviceData,
});
