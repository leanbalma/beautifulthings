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
const encryptedToken = 'gw1U4yWauDaMY4OojNkaeP6AqHOmmq/UMLQvk7bJkzQGhCLbZeV0AQhdq1z0lQkIBUORprg=';
const decryptedToken = 'Token';

const entryDate = '2018-05-01';
const encryptedEntry = createEntry(entryDate, decryptedToken);
const decryptedEntry = createEntry(entryDate, decryptedToken);

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

beforeAll(async () => api.initAccount(username, keyPair));
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
    const serverData = { EncryptedToken: encryptedToken };
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
  test('add a new entry', async () => {
    mockServer(true);
    const result = await api.addEntry(encryptedEntry);
    expect(result).toBe(true);
  });

  test('request entries', async () => {
    const serverData = [{
      Date: entryDate,
      Content: encryptedToken
    }];
    mockServer(true, serverData);
    const result = await api.getEntries('2018-01-01', '2019-01-01');
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(decryptedEntry);
  });
});
