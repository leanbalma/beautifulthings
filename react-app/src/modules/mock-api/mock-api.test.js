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
      date:   '1900-01-01',
      text:   'Original message'
    }],
    usersEntries: [{
      idUser:   0,
      idEntry:  0
    }]
  }));

  test('sets a new entry successfully', async () => {
    expect.assertions(1);
    await expect(
      api.set('token', new Date().toISOString().slice(0, 10), 'Message')
    ).resolves.toBeNull();
  });

  test('sets an existing entry', async () => {
    expect.assertions(2);
    await expect(api.set('token', '1900-01-01', 'Modify an existing entry')).resolves.toBeNull();
    expect(api.getDatabase().entries[0]['text']).toBe('Modify an existing entry');
  });

  test('sets a new entry with invalid token', async () => {
    expect.assertions(1);
    await expect(
      api.set('invalidToken', new Date().toISOString().slice(0, 10), 'Message')
    ).rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });
});

describe('initializes database with one user logged-in with three entries', () => {
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
      date:   '2018-01-01',
      text:   'First week'
    }, {
      id:     1,
      date:   '2018-01-08',
      text:   'Second week'
    }, {
      id:     2,
      date:   '2018-01-15',
      text:   'Third week'
    }],
    usersEntries: [{
      idUser:   0,
      idEntry:  0
    }, {
      idUser:   0,
      idEntry:  1
    }, {
      idUser:   0,
      idEntry:  2
    }]
  }));

  test('enumerates all entries', async () => {
    expect.assertions(1);
    await api.enumerate('token', '1900-01-01', '2020-01-01')
      .then(result => expect(result.entries.length).toBe(3));
  });

  test('enumerates second entry only', async () => {
    expect.assertions(2);
    await api.enumerate('token', '2018-01-07', '2018-01-09')
      .then(result => {
        expect(result.entries.length).toBe(1);
        expect(result.entries[0]).toEqual(api.getDatabase().entries[1]);
      });
  });

  test('enumerates with invalid token', async () => {
    expect.assertions(1);
    await expect(
      api.enumerate('invalidToken', '1900-01-01', '2020-01-01')
    ).rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });
});

describe('initializes database with one user logged-in with one preference', () => {
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
    preferences: [{
      id:     0,
      key:    'key',
      value:  'value'
    }],
    usersPreferences: [{
      idUser:       0,
      idPreference: 0
    }]
  }));

  test('sets the user preference', async () => {
    expect.assertions(2);
    await expect(api.setPref('token', 'key', 'newValue')).resolves.toBeNull();
    await expect(api.getDatabase().preferences[0].value).toBe('newValue');
  });

  test('sets an unexisting user preference', async () => {
    expect.assertions(1);
    await expect(api.setPref('token', 'unexistingKey', 'value'))
      .rejects.toBeInstanceOf(api.ErrorInvalidPreference);
  });

  test('sets the user preference with invalid token', async () => {
    expect.assertions(1);
    await expect(
      api.enumerate('invalidToken', 'key', 'new value')
    ).rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });
});
