import Account, { ErrorAuthenticationFail } from './Account.js';
import naclUtils from 'tweetnacl-util';

let account;

const mockUserData = {
  username:           '$/()RUFJ)wuwe84349',
  password:           'dnefu384(/·$873hf7g',
  expectedPublicKey:  '6FUygceUHlKzGu/5ir4FNkmAtUF07uNeAAdp9+5hcy4=',
  expectedSecretKey:  'm4jBZuDiCgcCz94VIWHmeVC9IsXOIavniA2pqeq5Gg0='
};

test('match between generated key pairs with expected ones', () => {
  expect.assertions(5);
  account = new Account(mockUserData.username, mockUserData.password);

  expect(account._username).toBe(mockUserData.username);

  const systemTzOffsetInMinutes = -(new Date()).getTimezoneOffset();
  const systemTzOffsetInHours = Math.floor(systemTzOffsetInMinutes / 60);
  const systemTz = (systemTzOffsetInHours >= 0) ?
    `GMT+${systemTzOffsetInHours}` :
    `GMT${systemTzOffsetInHours}`;
  expect(account.offset).toBe(systemTzOffsetInHours);
  expect(account.tz).toBe(systemTz);

  const generatedPublicKey = naclUtils.encodeBase64(account._pk);
  expect(generatedPublicKey).toBe(mockUserData.expectedPublicKey);

  const generatedSecretKey = naclUtils.encodeBase64(account._sk);
  expect(generatedSecretKey).toBe(mockUserData.expectedSecretKey);
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
