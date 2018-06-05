/* eslint-env jest */
import Account, { ErrorAuthenticationFail } from './';
import naclUtils from 'tweetnacl-util';

let account, keyPair;

const mockUserData = {
  username:           '$/()RUFJ)wuwe84349',
  password:           'dnefu384(/·$873hf7g',
  expectedPublicKey:  '6FUygceUHlKzGu/5ir4FNkmAtUF07uNeAAdp9+5hcy4=',
  expectedSecretKey:  'm4jBZuDiCgcCz94VIWHmeVC9IsXOIavniA2pqeq5Gg0='
};

test('match generated keypair with expected one', async () => {
  expect.assertions(2);
  keyPair = await Account.generateKeyPair(mockUserData.username, mockUserData.password);

  const generatedPublicKey = naclUtils.encodeBase64(keyPair.publicKey);
  expect(generatedPublicKey).toBe(mockUserData.expectedPublicKey);

  const generatedSecretKey = naclUtils.encodeBase64(keyPair.secretKey);
  expect(generatedSecretKey).toBe(mockUserData.expectedSecretKey);
});

test('success when encrypts and decrypts a message', () => {
  expect.assertions(2);
  account = new Account(mockUserData.username, keyPair);

  const plainText = 'sómething with ñ and ü\n!_¡?\'{[^]}}à';
  const encryptedMessage = account.encrypt(plainText);
  const decryptedMessage = account.decrypt(encryptedMessage);

  expect(typeof encryptedMessage).toBe('string');
  expect(decryptedMessage).toBe(plainText);
});

test('fail when encrypts and decrypts a modified ciphertext', () => {
  expect.assertions(2);
  const plainText = 'sómething with ñ and ü\n!_¡?\'{[^]}}à';
  const encryptedMessage = account.encrypt(plainText);
  expect(typeof encryptedMessage).toBe('string');

  const modifiedEncryptedMessage = `axs${encryptedMessage.substring(3)}`;
  expect(() => account.decrypt(modifiedEncryptedMessage)).toThrow(ErrorAuthenticationFail);
});
