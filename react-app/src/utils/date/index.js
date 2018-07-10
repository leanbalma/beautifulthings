function isDateStringValid(dateString) {
  const stringFormatRegEx = /^\d{4}-\d{2}-\d{2}$/;
  const isStringFormatValid = dateString.match(stringFormatRegEx);
  if (!isStringFormatValid) return false;

  const isAValidDate = !isNaN(Date.parse(dateString));
  return isAValidDate;
}

function getCurrentDateString() {
  const tzOffsetMs = (new Date()).getTimezoneOffset() * 60000;
  const localeDate = (new Date(Date.now() - tzOffsetMs));
  const localeDateString = localeDate.toISOString().substr(0, 10);

  return localeDateString;
}

export { isDateStringValid, getCurrentDateString }
