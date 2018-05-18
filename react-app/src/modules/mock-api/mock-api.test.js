import * as api from './mock-api.js';

afterEach(() => api.clearDatabase());

describe('initializes database with one user not logged-in', () => {
  beforeEach(() => api.initializeMockDatabase({
    users: [{
      id:       0,
      username: 'username',
      password: 'password'
    }],
    sessions: []
  }));

  test('signups successfully with a new user', async () => {
    expect.assertions(1);
    await expect(api.signUp('newUsername', 'newPassword', 0)).resolves.toBeNull();
  });

  test('signups unsuccessfully with an existing username', async () => {
    expect.assertions(1);
    await expect(api.signUp('username', 'password', 0))
      .rejects.toBeInstanceOf(api.ErrorUsernameAlreadyExists);
  });

  test('signins successfully with an existing username', async () => {
    expect.assertions(1);
    await api.signIn('username', 'password', 0).then(token => expect(typeof token).toBe('string'));
  });

  test('signins unsuccessfully with unexisting username', async () => {
    expect.assertions(1);
    await expect(api.signIn('unexistingUsername', 'unexistingUsernamePassword', 0))
      .rejects.toBeInstanceOf(api.ErrorInvalidUsernameOrPassword);
  });

  test('signins unsuccessfully with wrong password', async () => {
    expect.assertions(1);
    await expect(api.signIn('username', 'invalidPassword', 0))
      .rejects.toBeInstanceOf(api.ErrorInvalidUsernameOrPassword);
  });
});

describe('initializes database with one user logged-in with three entries and one preference', () => {
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

  test('sets successfully a new entry', async () => {
    expect.assertions(1);
    await expect(api.set('token', new Date().toISOString().slice(0, 10), 'Message', 0))
      .resolves.toBeNull();
  });

  test('sets successfully an existing entry', async () => {
    expect.assertions(2);
    await expect(api.set('token', '2018-01-08', 'Modify second week entry', 0)).resolves.toBeNull();
    expect(api.getDatabase().entries[1]['text']).toBe('Modify second week entry');
  });

  test('sets unsuccessfully a new entry with invalid token', async () => {
    expect.assertions(1);
    await expect(api.set('invalidToken', new Date().toISOString().slice(0, 10), 'Message', 0))
      .rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });

  test('enumerates successfully all entries', async () => {
    expect.assertions(1);
    await api.enumerate('token', '1900-01-01', '2050-01-01', 0)
      .then(result => expect(result.entries.length).toBe(3));
  });

  test('enumerates successfully second entry only', async () => {
    expect.assertions(2);
    await api.enumerate('token', '2018-01-07', '2018-01-09', 0)
      .then(result => {
        expect(result.entries.length).toBe(1);
        expect(result.entries[0]).toEqual(api.getDatabase().entries[1]);
      });
  });

  test('enumerates unsuccessfully with invalid token', async () => {
    expect.assertions(1);
    await expect(api.enumerate('invalidToken', '1900-01-01', '2050-01-01', 0))
      .rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });

  test('sets successfully an existing user preference', async () => {
    expect.assertions(2);
    await expect(api.setPref('token', 'key', 'newValue', 0)).resolves.toBeNull();
    await expect(api.getDatabase().preferences[0].value).toBe('newValue');
  });

  test('sets unsuccessfully an unexisting user preference', async () => {
    expect.assertions(1);
    await expect(api.setPref('token', 'unexistingKey', 'value', 0))
      .rejects.toBeInstanceOf(api.ErrorInvalidPreference);
  });

  test('sets unsuccessfully an user preference with invalid token', async () => {
    expect.assertions(1);
    await expect(
      api.enumerate('invalidToken', 'key', 'new value', 0)
    ).rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });

  test('gets successfully user preferences', async () => {
    expect.assertions(1);
    await api.getPref('token', 0)
      .then(response => expect(response.preferences).toEqual(api.getDatabase().preferences));
  });

  test('gest unsuccessfully user preferences with invalid token', async () => {
    expect.assertions(1);
    await expect(api.getPref('invalidToken', 0)).rejects.toBeInstanceOf(api.ErrorInvalidToken);
  });
});
