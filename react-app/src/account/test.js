/* eslint-env jest */
import Account from './';

let account, keyPair;

const mockUserData = {
  username:           '$/()RUFJ)wuwe84349',
  password:           'dnefu384(/·$873hf7g',
  expectedPublicKey:  'QPnhimpSgSRC0leCAhAOdCXFIXiKIQurSCh4/j9GAho=',
  expectedSecretKey:  'pLWFtUsKSQV6/5UmC2zYEtwbs8+0oNgyTYBDUqYg2Wo=',
};

test('match generated keypair with expected one', async () => {
  expect.assertions(2);
  keyPair = await Account.generateKeyPair(mockUserData.username, mockUserData.password);

  const generatedPublicKey = Account.encodeBase64(keyPair.publicKey);
  expect(generatedPublicKey).toBe(mockUserData.expectedPublicKey);

  const generatedSecretKey = Account.encodeBase64(keyPair.secretKey);
  expect(generatedSecretKey).toBe(mockUserData.expectedSecretKey);
});

test('encrypt and decrypt the key', () => {
  expect.assertions(1);
  account = new Account(mockUserData.username, keyPair);

  const key = account._key;
  const encryptedKey = account._encryptWithKeyPair(key);
  const encryptedKeyUTF8 = Account.encodeBase64(encryptedKey);
  const decryptedKey = account.decryptWithKeyPair(encryptedKeyUTF8);

  expect(key).toEqual(decryptedKey);
});

test('fail decrypting an invalid cipherkey', () => {
  expect.assertions(1);
  account = new Account(mockUserData.username, keyPair);

  const key = account._key;
  const encryptedKey = account._encryptWithKeyPair(key);
  const encryptedKeyUTF8 = Account.encodeBase64(encryptedKey);
  const modifiedEncryptedKeyUTF8 = `axs${encryptedKeyUTF8.substring(3)}`;

  expect(() => account.decryptWithKeyPair(modifiedEncryptedKeyUTF8)).toThrow();
});

test('encrypt and decrypt a message', () => {
  expect.assertions(2);
  account = new Account(mockUserData.username, keyPair);

  const plainText = 'sómething with ñ and ü\n!_¡?\'{[^]}}à';
  const encryptedMessage = account.encrypt(plainText);
  const decryptedMessage = account.decrypt(encryptedMessage);

  expect(typeof encryptedMessage).toBe('string');
  expect(decryptedMessage).toBe(plainText);
});

test('fail decrypting an invalid ciphertext', () => {
  expect.assertions(2);
  const plainText = 'sómething with ñ and ü\n!_¡?\'{[^]}}à';
  const encryptedMessage = account.encrypt(plainText);
  expect(typeof encryptedMessage).toBe('string');

  const modifiedEncryptedMessage = `axs${encryptedMessage.substring(3)}`;
  expect(() => account.decrypt(modifiedEncryptedMessage)).toThrow();
});
