import * as account from './account.js';

afterEach(() => account.clearAccount());

test('creates keypairs from username and password', async () => {
  expect.assertions(4);
  await account.constructor('$/()RUFJ)wuwe84349', 'dnefu384(/·$873hf7g')
    .then(result => {
      expect(result).toBeNull();
      expect(account.getUsername()).toBe('$/()RUFJ)wuwe84349');
      expect(btoa(String.fromCharCode.apply(null, account.getPublicKey())))
        .toBe('6FUygceUHlKzGu/5ir4FNkmAtUF07uNeAAdp9+5hcy4=');
      expect(btoa(String.fromCharCode.apply(null, account.getSecretKey())))
        .toBe('m4jBZuDiCgcCz94VIWHmeVC9IsXOIavniA2pqeq5Gg0=');
    });
});

test('encrypt and decrypt a message', async() => {
  expect.assertions(2);
  account.setKeyPair('6FUygceUHlKzGu/5ir4FNkmAtUF07uNeAAdp9+5hcy4=',
                     'm4jBZuDiCgcCz94VIWHmeVC9IsXOIavniA2pqeq5Gg0=');
  let encryptedMessage = account.encrypt('sómething with ñ and ü\n!_¡?\'{[^]}}à');
  expect(typeof encryptedMessage).toBe('string');
  expect(account.decrypt(encryptedMessage)).toBe('sómething with ñ and ü\n!_¡?\'{[^]}}à');
});
