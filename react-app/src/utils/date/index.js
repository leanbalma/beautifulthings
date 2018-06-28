function isDateStringValid(dateString) {
  const stringFormatRegEx = /^\d{4}-\d{2}-\d{2}$/;
  const isStringFormatValid = dateString.match(stringFormatRegEx);
  if (!isStringFormatValid) return false;

  const isAValidDate = !isNaN(Date.parse(dateString));
  return isAValidDate;
}

export { isDateStringValid }
