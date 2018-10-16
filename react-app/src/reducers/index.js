import { combineReducers } from 'redux';

import { SIGN_OUT } from 'actions/account';

import account from './account';
import entries from './entries';
import entriesByDate from './entriesByDate';

const appReducer = combineReducers({
  account,
  entries,
  entriesByDate,
});

const rootReducer = (state, action) => {
  /**
   * As the user's entries are preserved decrypted
   * in the local store, it's important to clean it
   * up when the user signs out for security reasons.
   *
   * For details about this implementation, take a look at:
   * https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
   */
  if (action.type === SIGN_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
