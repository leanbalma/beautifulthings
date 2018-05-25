import { account, ErrorAccountAlreadyInitialized, ErrorInvalidOffsetValue } from './Account.js';
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

test('initializes unsuccessfully the account with invalid offset', () => {
  expect.assertions(1);
  expect(() => account.initialize(mockUserData.username, mockUserData.password, Infinity))
    .toThrow(ErrorInvalidOffsetValue);
});

test('initializes successfully the account instance with valid data', () => {
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

test('initializes unsuccessfully the account a second time', () => {
  expect.assertions(1);
  expect(() => account.initialize(mockUserData.username, mockUserData.password, mockUserData.offset))
    .toThrow(ErrorAccountAlreadyInitialized);
});

test('encrypts and decrypts a message', () => {
  expect.assertions(2);
  account._pk = naclUtils.decodeBase64(mockUserData.expectedPublicKey);
  account._sk = naclUtils.decodeBase64(mockUserData.expectedSecretKey);

  const plainText = 'sómething with ñ and ü\n!_¡?\'{[^]}}à';
  const encryptedMessage = account.encrypt(plainText);
  const decryptedMessage = account.decrypt(encryptedMessage);

  expect(typeof encryptedMessage).toBe('string');
  expect(decryptedMessage).toBe(plainText);
});
