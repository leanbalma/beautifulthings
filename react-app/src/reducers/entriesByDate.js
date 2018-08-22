import { EDIT_ENTRY, DELETE_ENTRY } from 'actions/entriesByDate';

function entriesByDate(state = {}, action) {
  const payload = action.payload;
  let nextState;

  switch (action.type) {
    case EDIT_ENTRY:
      return { ...state, [payload.date]: payload.text };
    case DELETE_ENTRY:
      nextState = { ...state };
      delete nextState[payload.date];

      return nextState;
    default:
      return state;
  }
}

export default entriesByDate;
