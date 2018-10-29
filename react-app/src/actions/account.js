import Account from 'account';
import api from 'api';

import { getSchedule, DAILY } from 'notifications';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SCHEDULE_NOTIFICATIONS = 'SCHEDULE_NOTIFICATIONS';

async function _generateKeyPairAndInitAccount(username, password) {
  const keyPair = await Account.generateKeyPair(username, password);
  api.initAccount(username, keyPair);
}

const signIn = (username, notifications = DAILY) => ({
  type: SIGN_IN,
  payload: {
    username,
    notifications,
  },
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const scheduleNotifications = notifications => ({
  type: SCHEDULE_NOTIFICATIONS,
  payload: {
    notifications,
  }
});

export const signInAsync = (username, password) => async dispatch => {
  await _generateKeyPairAndInitAccount(username, password);
  const signedIn = await api.signIn();

  if (signedIn) dispatch(signIn(username));

  return signedIn;
}

export const signUpAsync = async (username, password) => {
  await _generateKeyPairAndInitAccount(username, password);
  const signedUp = await api.signUp();

  return signedUp;
}

export const initSavedAccountAsync = () => async dispatch => {
  try {
    const savedAccountUsername = await api.initSavedAccount();
    if (!savedAccountUsername) return false;

    const notifications = await getSchedule();
    dispatch(signIn(savedAccountUsername, notifications));

    return true;
  } catch (error) {
    return false;
  }
}
