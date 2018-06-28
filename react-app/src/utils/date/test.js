/* eslint-env jest */
import { isDateStringValid } from './';

test('valid date string varification', () => {
  expect.assertions(1);

  const date = '2018-01-01';
  const result = isDateStringValid(date);
  expect(result).toBe(true);
});

test('invalid dates string varification', () => {
  expect.assertions(2);

  const wrongFormattedDate = '01-01-2018';
  let result = isDateStringValid(wrongFormattedDate);
  expect(result).toBe(false);

  const unexistingValidDate = '2018-13-01';
  result = isDateStringValid(unexistingValidDate);
  expect(result).toBe(false);
});
