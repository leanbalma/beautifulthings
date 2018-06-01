export function getTzFromOffset(offset) {
  return (offset >= 0) ? `GMT+${offset}` : `GMT${offset}`;
}
