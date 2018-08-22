import { EDIT_ENTRY, DELETE_ENTRY } from 'actions/entriesByDate';

const sortByDateDec = (dateStringA, dateStringB) => {
  const dateA = new Date(dateStringA);
  const dateB = new Date(dateStringB);

  return dateA < dateB;
}

function entries(state = [], action) {
  const payload = action.payload;
  let index, nextState;

  switch (action.type) {
    case EDIT_ENTRY:
      index = state.indexOf(payload.date);
      if (index !== -1) return state; // Existing entry

      nextState = Array.from(state);
      nextState.push(payload.date);
      nextState.sort(sortByDateDec);

      return nextState;
    case DELETE_ENTRY:
      return state.filter(date => date !== payload.date);
    default:
      return state;
  }
}

export default entries;
