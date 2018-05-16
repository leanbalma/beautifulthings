import * as api from './mock-api.js';

afterEach(() => api.clearDatabase());

describe('initializes database with no users', () => {
  beforeEach(() => api.initializeMockDatabase({
    users: []
  }));

  test('signups successfully', async () => {
    expect.assertions(1);
    await expect(api.signUp('username', 'password')).resolves.toBeNull();
  });
});

describe('initializes database with one user not logged-in', () => {
  beforeEach(() => api.initializeMockDatabase({
    users: [{
      id:       0,
      username: 'username',
      password: 'password'
    }],
    sessions: []
  }));

  test('signups with an existing username', async () => {
    expect.assertions(1);
    await expect(
      api.signUp('username', 'password')
    ).rejects.toBeInstanceOf(api.ErrorUsernameAlreadyExists);
  });

  test('signins successfully', async () => {
    expect.assertions(1);
    await api.signIn('username', 'password').then(token => expect(typeof token).toBe('string'));
  });

  test('signins with unexisting username', async () => {
    expect.assertions(1);
    await expect(
      api.signIn('unexistingUsername', 'unexistingUsernamePassword')
    ).rejects.toBeInstanceOf(api.ErrorInvalidUsernameOrPassword);
  });

  test('signins with wrong password', async () => {
    expect.assertions(1);
    await expect(
      api.signIn('username', 'invalidPassword')
    ).rejects.toBeInstanceOf(api.ErrorInvalidUsernameOrPassword);
  });
});

describe('initializes database with one user logged-in with one entry', () => {
  beforeEach(() => api.initializeMockDatabase({
    users: [{
      id:       0,
      username: 'username',
      password: 'password'
    }],
    sessions: [{
      idUser: 0,
      token:  'token'
    }],
    entries: [{
      id:     0,
      idUser: 0,
      date:   '1900-01-01',
      text:   'Original message'
    }]
  }));

  test('sets a new entry successfully', async () => {
    expect.assertions(1);
    await expect(
      api.set('token', new Date().toISOString().slice(0, 10), 'Message')
    ).resolves.toBeNull();
  });

  test('sets an existing entry', async () => {
    expect.assertions(1);
    await expect(
      api.set('token', '1900-01-01', 'Trying to modify an existing entry')
    ).rejects.toBeInstanceOf(api.ErrorEntryAlreadyExists);
  });

  test('sets a new entry with invalid token', async () => {
    expect.assertions(1);
    await expect(
      api.set('invalidToken', new Date().toISOString().slice(0, 10), 'Message')
    ).rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });
});
