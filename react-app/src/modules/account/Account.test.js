import { account, ErrorAccountAlreadyInitialized, ErrorAccountNotInitialized, ErrorInvalidOffsetValue, ErrorAuthenticationFail } from './Account.js';
import naclUtils from 'tweetnacl-util';

const mockUserData = {
  username:           '$/()RUFJ)wuwe84349',
  password:           'dnefu384(/·$873hf7g',
  expectedPublicKey:  '6FUygceUHlKzGu/5ir4FNkmAtUF07uNeAAdp9+5hcy4=',
  expectedSecretKey:  'm4jBZuDiCgcCz94VIWHmeVC9IsXOIavniA2pqeq5Gg0=',
  offset:             -3
};
(mockUserData.offset >= 0) ?
  mockUserData.expectedTz = `GMT+${mockUserData.offset}` :
  mockUserData.expectedTz = `GMT${mockUserData.offset}`;

test('fail when initializes with invalid data', () => {
  expect.assertions(1);
  expect(() => account.initialize(mockUserData.username, mockUserData.password, Infinity))
    .toThrow(ErrorInvalidOffsetValue);
});

test('success when initializes with valid data', () => {
  expect.assertions(6);
  expect(account.initialize(mockUserData.username, mockUserData.password, mockUserData.offset))
    .toBeUndefined();

  expect(account._username).toBe(mockUserData.username);
  expect(account.offset).toBe(mockUserData.offset);
  expect(account.tz).toBe(mockUserData.expectedTz);

  const generatedPublicKey = naclUtils.encodeBase64(account._pk);
  expect(generatedPublicKey).toBe(mockUserData.expectedPublicKey);

  const generatedSecretKey = naclUtils.encodeBase64(account._sk);
  expect(generatedSecretKey).toBe(mockUserData.expectedSecretKey);
});

test('fail when initializes an initialized account', () => {
  expect.assertions(1);
  expect(() => account.initialize(mockUserData.username, mockUserData.password, mockUserData.offset))
    .toThrow(ErrorAccountAlreadyInitialized);
});

test('success when encrypts and decrypts a message', () => {
  expect.assertions(2);
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
