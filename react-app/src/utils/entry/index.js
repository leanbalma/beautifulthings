import { isDateStringValid } from 'utils/date';

function createEntry(date, text) {
  if (text.length > 240) return null;

  const isDateValid = isDateStringValid(date);
  if (!isDateValid) return null;

  return {
    date,
    text,
  }
}

export { createEntry }
