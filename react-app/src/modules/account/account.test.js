import * as account from './account.js';

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

// TODO: redefine this test in order not to be dependant of the previous one
test('encrypt and decrypt a message', async() => {
  expect.assertions(2);
  let encryptedMessage = account.encrypt('sómething with ñ and ü\n!_¡?\'{[^]}}à');
  expect(typeof encryptedMessage).toBe('string');
  expect(account.decrypt(encryptedMessage)).toBe('sómething with ñ and ü\n!_¡?\'{[^]}}à');
});
