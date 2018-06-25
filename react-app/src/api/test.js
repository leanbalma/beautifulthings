/* eslint-env jest */
import naclUtils from 'tweetnacl-util';

import api from 'api';
import { createEntry } from 'utils/entry';

const entry = createEntry('2018-01-01', 'A simple entry to test the API');

beforeAll(async () => {
  const username = 'username';
  // The computed keyPair assumes { username: 'username', password: 'password' }
  const publicKeyBase64Encoded = 'ZYw1z/ZfDN9x4dlQ4H9VXdZWNKdamCG7WbxB9LMytnU=';
  const secretKeyBase64Encoded = 'g2ukZjfSZW+Ag/Y2L3t3soV5djM5eyYaVuV7oWdGm0I=';
  const keyPair = {
    publicKey: naclUtils.decodeBase64(publicKeyBase64Encoded),
    secretKey: naclUtils.decodeBase64(secretKeyBase64Encoded),
  }

  api.initAccount(username, keyPair);
});

test('success when singup with an unexisting account', async () => {
  expect.assertions(1);
  const result = await api.signUp();
  expect(result).toBe(true);
});

test('fails when singup with an existing account', async () => {
  expect.assertions(1);
  const result = await api.signUp();
  expect(result).toBe(false);
});

test('success when signin with an existing account', async() => {
  expect.assertions(1);
  const result = await api.signIn();
  expect(result).toBe(true);
});

test('success when add a new entry', async() => {
  expect.assertions(1);
  const result = await api.addEntry(entry);
  expect(result).toBe(true);
});

test('success when get the entry added', async() => {
  expect.assertions(2);
  const from = '2018-01-01';
  const to = '2018-01-02';

  const entries = await api.getEntries(from, to);
  expect(entries.length).toBe(1);
  expect(entries[0]).toEqual(entry);
});
