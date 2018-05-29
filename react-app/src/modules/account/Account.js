import scrypt from 'scrypt-async';
import nacl from 'tweetnacl';
import sha256 from 'fast-sha256';
import blake from 'blakejs';

nacl.util = require('tweetnacl-util');

class Account {
  constructor(username, password) {
    const hashedPassword = sha256(nacl.util.decodeUTF8(password));
    const salt = sha256(nacl.util.decodeUTF8(username));
    const options = {
      N: 1 << 20,
      r: 8,
      p: 1,
      dkLen: 32,
      encoding: 'binary'
    };

    const callback = (derivedKey) => {
      const keyPair = nacl.box.keyPair.fromSecretKey(derivedKey);

      const systemTzOffsetInMinutes = -(new Date()).getTimezoneOffset();
      const systemTzOffsetInHours = Math.floor(systemTzOffsetInMinutes / 60);

      this._username = username;
      this._pk = keyPair.publicKey;
      this._sk = keyPair.secretKey;
      this._offset = systemTzOffsetInHours;
      this._tz = (systemTzOffsetInHours >= 0) ?
        `GMT+${systemTzOffsetInHours}` :
        `GMT${systemTzOffsetInHours}`;
    };

    scrypt(hashedPassword, salt, options, callback);
  }

  bytes() {
    return JSON.stringify({
      username: this._username,
      pk: this._pk,
      tz: this._tz,
      offset: this._offset
    });
  }

  _generateNonce(publicKeyA, publicKeyB) {
    let state = blake.blake2bInit(nacl.box.nonceLength, null);
    blake.blake2bUpdate(state, publicKeyA);
    blake.blake2bUpdate(state, publicKeyB);
    return blake.blake2bFinal(state);
  }

  encrypt(plainText) {
    const messageToEncrypt = nacl.util.decodeUTF8(plainText);
    const ephemeralKeyPair = nacl.box.keyPair();
    const nonce = this._generateNonce(ephemeralKeyPair.publicKey, this._pk);
    const cipherText
      = nacl.box(messageToEncrypt, nonce, this._pk, ephemeralKeyPair.secretKey);

    const output = new Uint8Array(nacl.box.publicKeyLength + cipherText.length);
    output.set(ephemeralKeyPair.publicKey);
    output.set(cipherText, nacl.box.publicKeyLength);

    return nacl.util.encodeBase64(output);
  }

  decrypt(cipherText) {
    const input = nacl.util.decodeBase64(cipherText);
    const originalEphemeralPublicKey = input.subarray(0, nacl.box.publicKeyLength);

    const nonce = this._generateNonce(originalEphemeralPublicKey, this._pk);
    const encryptedMessage = input.subarray(nacl.box.publicKeyLength);
    const decryptedMessage
      = nacl.box.open(encryptedMessage, nonce, originalEphemeralPublicKey, this._sk);

    if (decryptedMessage === null) throw new ErrorAuthenticationFail();

    return nacl.util.encodeUTF8(decryptedMessage);
  }
}

class ErrorAuthenticationFail extends Error {}

export default Account;
export { ErrorAuthenticationFail }
