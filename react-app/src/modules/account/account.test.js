import * as account from './account.js';
import naclUtils from 'tweetnacl-util';

afterEach(() => account.clearAccount());

test('creates keypair and checks it against server side generated keypair', async () => {
  expect.assertions(4);
  const username = '$/()RUFJ)wuwe84349';
  const password = 'dnefu384(/·$873hf7g';
  const result = await account.constructor(username, password);
  expect(result).toBeNull();
  expect(account.getUsername()).toBe(username);

  const expectedPublicKey = '6FUygceUHlKzGu/5ir4FNkmAtUF07uNeAAdp9+5hcy4=';
  const generatedPublicKey = naclUtils.encodeBase64(account.getPublicKey());
  expect(generatedPublicKey).toBe(expectedPublicKey);

  const expectedSecretKey = 'm4jBZuDiCgcCz94VIWHmeVC9IsXOIavniA2pqeq5Gg0=';
  const generatedSecretKey = naclUtils.encodeBase64(account.getSecretKey());
  expect(generatedSecretKey).toBe(expectedSecretKey);
});

test('encrypts and decrypts a message', () => {
  expect.assertions(2);
  account._setKeyPair('6FUygceUHlKzGu/5ir4FNkmAtUF07uNeAAdp9+5hcy4=',
                      'm4jBZuDiCgcCz94VIWHmeVC9IsXOIavniA2pqeq5Gg0=');
  const plainText = 'sómething with ñ and ü\n!_¡?\'{[^]}}à';
  const encryptedMessage = account.encrypt(plainText);
  const decryptedMessage = account.decrypt(encryptedMessage);
  expect(typeof encryptedMessage).toBe('string');
  expect(decryptedMessage).toBe(plainText);
});
