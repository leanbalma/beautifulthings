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

describe('initializes database with one user', () => {
  beforeEach(() => api.initializeMockDatabase({
    users: [{
      id:       0,
      username: 'username',
      password: 'password'
    }]
  }));

  test('signups with an existing username', async () => {
    expect.assertions(1);
    await expect(
      api.signUp('username', 'password')
    ).rejects.toBeInstanceOf(api.ErrorUsernameAlreadyExists);
  });
});
