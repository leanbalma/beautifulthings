/* eslint-env jest */
import { getTzFromOffset } from './';

test('tz validation given positive and negative tz offsets', () => {
  expect.assertions(2);
  expect(getTzFromOffset(-3)).toBe('GMT-3');
  expect(getTzFromOffset(3)).toBe('GMT+3');
});
