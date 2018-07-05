/* eslint-env jest */
import api from './mock.js';

const MOCK_INITIAL_VALUES = window.mock;
let mock;

const entry = {
  date: '2018-01-01',
  text: 'Text',
};

beforeEach(() => mock = MOCK_INITIAL_VALUES);

describe('sign up', () => {
  test('can sign up with new account', async () => {
    mock.signUpResult = true;
    const result = await api.signUp();
    expect(result).toBe(true);
  });

  test('cannot sign up with an existing account', async () => {
    mock.signUpResult = false;
    const result = await api.signUp();
    expect(result).toBe(false);
  });
});

describe('sign in', () => {
  test('can sign in with valid account', async () => {
    mock.signInResult = true;
    const result = await api.signIn();
    expect(result).toBe(true);
  });

  test('cannot sign in with invalid account', async () => {
    mock.signInResult = false;
    const result = await api.signIn();
    expect(result).toBe(false);
  });
});

describe('user requests when signed in', () => {
  beforeEach(() => mock.signedIn = true);

  test('add a new entry', async () => {
    const result = await api.addEntry(entry);
    expect(result).toBe(true);
  });

  test('request entries', async () => {
    mock.entries = [entry];
    const result = await api.getEntries('2018-01-01', '2019-01-01');
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(entry);
  });
});
