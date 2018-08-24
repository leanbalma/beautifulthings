import { combineReducers } from 'redux';

import account from './account';
import entries from './entries';
import entriesByDate from './entriesByDate';

const rootReducer = combineReducers({
  account,
  entries,
  entriesByDate,
});

export default rootReducer;
