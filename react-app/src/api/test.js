/* eslint-env jest */
import naclUtils from 'tweetnacl-util';

import api from 'api';
import { createEntry } from 'utils/entry';

// Account data
const username = 'username';
const base64EncodedPublicKey = 'ZYw1z/ZfDN9x4dlQ4H9VXdZWNKdamCG7WbxB9LMytnU=';
const base64EncodedSecretKey = 'g2ukZjfSZW+Ag/Y2L3t3soV5djM5eyYaVuV7oWdGm0I=';
const keyPair = {
  publicKey: naclUtils.decodeBase64(base64EncodedPublicKey),
  secretKey: naclUtils.decodeBase64(base64EncodedSecretKey),
};

// Encrypted/decrypted message usign the account
const encryptedValueWithKeyPair = 'gw1U4yWauDaMY4OojNkaeP6AqHOmmq/UMLQvk7bJkzQGhCLbZeV0AQhdq1z0lQkIBUORprg=';
const decryptedValueWithKeyPair = 'Token';

/**
 * This function replaces the real `fetch` (which we use to query the server)
 * with a custom mock that returns whatever we want to.
 *
 * This is used basically to emulate a server that behaves as we need for each
 * test.
 */
function mockServer(ok, data = null) {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok,
      json: () => data,
    })
  );
}
const originalFetch = global.fetch;

beforeEach(async () => api.initAccount(username, keyPair));
afterAll(() => global.fetch = originalFetch);

describe('sign up', () => {
  test('can sign up with a new account', async () => {
    mockServer(true);
    const result = await api.signUp();
    expect(result).toBe(true);
  });

  test('cannot sign up with an existing account', async () => {
    mockServer(false);
    const result = await api.signUp();
    expect(result).toBe(false);
  });
});

describe('sign in', () => {
  test('can sign in with valid account', async () => {
    const serverData = {
      EncryptedToken: encryptedValueWithKeyPair,
      EncryptedKey: encryptedValueWithKeyPair,
    };
    mockServer(true, serverData);
    const result = await api.signIn();
    expect(result).toBe(true);
  });

  test('cannot sign in with invalid account', async () => {
    mockServer(false);
    const result = await api.signIn();
    expect(result).toBe(false);
  });
});

describe('user requests when signed in', () => {
  test('add a new entry', async () => { /** TODO */ });

  test('request entries', async () => { /** TODO */ });
});
