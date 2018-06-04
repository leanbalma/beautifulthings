export function getTzOffset() {
  const systemTzOffsetInMinutes = -(new Date()).getTimezoneOffset();
  const systemTzOffsetInHours = Math.floor(systemTzOffsetInMinutes / 60);
  return systemTzOffsetInHours;
}

export function getTzFromOffset(offset) {
  return (offset >= 0) ? `GMT+${offset}` : `GMT${offset}`;
}
