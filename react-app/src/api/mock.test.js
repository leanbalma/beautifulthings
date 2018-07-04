/* eslint-env jest */
import Account from 'account';
import api, { Api, ErrorCannotGetEntries } from './mock.js';

const entry = {
  date: '2018-01-01',
  text: 'Text',
}

describe('use existing account', () => {
  beforeAll(async () => {
    const keyPair = await Account.generateKeyPair(Api.mockUsername, Api.mockPassword);
    api.initAccount(Api.mockUsername, keyPair);
  });

  test('cannot sign up with an existing account', async () => {
    const result = await api.signUp();
    expect(result).toBe(false);
  });

  test('sign in with valid account', async () => {
    const result = await api.signIn();
    expect(result).toBe(true);
  });

  test('add entry', async () => {
    const result = await api.addEntry(entry);
    expect(result).toBe(true);
  });

  test('request entries', async () => {
    let result = await api.getEntries('2018-01-01', '2018-01-02');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(entry);

    result = await api.getEntries('2017-01-01', '2017-01-02');
    expect(result).toHaveLength(0);
  });
});

describe('use unexisting account', () => {
  beforeAll(async () => {
    const username = 'unexistingUsername';
    const keyPair = await Account.generateKeyPair(username, 'pass');
    api.initAccount(username, keyPair);
  });

  test('can sign up with a new account', async () => {
    const result = await api.signUp();
    expect(result).toBe(true);
  });

  test('cannot sign in with an unexisting account', async () => {
    const result = await api.signIn();
    expect(result).toBe(false);
  });

  test('cannot add entry with an unexisting account', async () => {
    const result = await api.addEntry(entry);
    expect(result).toBe(false);
  });

  test('cannot request entries', async () => {
    expect.assertions(1);
    try {
      await api.getEntries('2018-01-01', '2018-01-02');
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorCannotGetEntries);
    }
  });
});
