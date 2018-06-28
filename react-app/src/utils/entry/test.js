/* eslint-env jest */
import { createEntry } from './';

test('success creating a valid entry from valid data', () => {
  expect.assertions(1);

  const date = '2018-01-01';
  const text = 'Text';
  const expectedResult = { date, text }

  const result = createEntry(date, text);
  expect(result).toEqual(expectedResult);
});

test('fails creating entry from invalid data', () => {
  expect.assertions(2);

  const invalidDate = '01-01-2018';
  const validText = 'Text';
  let result = createEntry(invalidDate, validText);
  expect(result).toBeNull();

  const validDate = '2018-01-01';
  const xLText = 'A'.repeat(241);
  result = createEntry(validDate, xLText);
  expect(result).toBeNull();
});
