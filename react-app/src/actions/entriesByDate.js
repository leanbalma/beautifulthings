import api from 'api';

import { createEntry } from 'utils/entry';

export const EDIT_ENTRY = 'EDIT_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';

const editEntry = (date, text) => ({
  type: EDIT_ENTRY,
  payload: {
    date,
    text,
  },
});

const deleteEntry = date => ({
  type: DELETE_ENTRY,
  payload: {
    date,
  },
});

export const retrieveEntriesAsync = (from, to) => async dispatch => {
  const entries = await api.getEntries(from, to);

  entries.forEach(entry => dispatch(editEntry(entry.date, entry.text)));
}

export const editEntryAsync = (date, text) => async dispatch => {
  const entry = createEntry(date, text);
  const edited = await api.addEntry(entry);

  if (edited) dispatch(editEntry(date, text));

  return edited;
}

export const deleteEntryAsync = date => async dispatch => {
  const entry = createEntry(date, '');
  const deleted = await api.addEntry(entry);

  if (deleted) dispatch(deleteEntry(date));

  return deleted;
}
