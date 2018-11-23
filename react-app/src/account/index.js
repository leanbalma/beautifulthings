import scrypt from 'scrypt-async';
import nacl from 'tweetnacl';
import sha256 from 'fast-sha256';
import blake from 'blakejs';
import { getTzOffset, getTzFromOffset } from 'utils/timezone';

nacl.util = require('tweetnacl-util');

const KEY_LENGTH = 32;
const NONCE_COMPUTE_LENGTH = 32;
const NONCE_LENGTH = 24;

class Account {
  static validateUsername(username) {
    return username.length;
  }

  static validatePassword(password) {
    return password.length;
  }

  static encodeBase64(uint8Array) {
    return nacl.util.encodeBase64(uint8Array);
  }

  static encodeUTF8(plainText) {
    return nacl.util.encodeUTF8(plainText);
  }

  static decodeBase64(uint8Array) {
    return nacl.util.decodeBase64(uint8Array);
  }

  static decodeUTF8(plainText) {
    return nacl.util.decodeUTF8(plainText);
  }

  static generateKeyPair(username, password) {
    return new Promise(resolve => {
      const hashedPassword = sha256(nacl.util.decodeUTF8(password));
      const salt = sha256(nacl.util.decodeUTF8(username));
      const options = {
        N: 1 << 16,
        r: 8,
        p: 1,
        dkLen: 32,
        interruptStep: 10,
        encoding: 'binary',
      };

      const callback = (derivedKey) => {
        resolve(nacl.box.keyPair.fromSecretKey(derivedKey));
      }

      scrypt(hashedPassword, salt, options, callback);
    });
  }

  constructor(username, keyPair) {
    this._username = username;
    this._pk = keyPair.publicKey;
    this._sk = keyPair.secretKey;
    this._key = nacl.randomBytes(KEY_LENGTH);
    this._offset = getTzOffset();
    this._tz = getTzFromOffset(this._offset);
  }

  set key(key) {
    this._key = key;
  }

  toString() {
    const pkAsArray = Array.from(this._pk);
    const encryptedKey = this._encryptWithKeyPair(this._key);
    const encryptedKeyAsArray = Array.from(encryptedKey);

    return JSON.stringify({
      Username: this._username,
      Pk: pkAsArray,
      EncryptedKey: encryptedKeyAsArray,
      Tz: this._tz,
      Offset: this._offset
    });
  }

  serialize() {
    const publicKey = Array.from(this._pk);
    const secretKey = Array.from(this._sk);

    return JSON.stringify({
      username: this._username,
      publicKey,
      secretKey,
    });
  }

  _generateNonce(publicKeyA, publicKeyB) {
    let state = blake.blake2bInit(NONCE_COMPUTE_LENGTH, null);
    blake.blake2bUpdate(state, publicKeyA);
    blake.blake2bUpdate(state, publicKeyB);

    return blake.blake2bFinal(state).subarray(0, NONCE_LENGTH);
  }

  _encryptWithKeyPair(valueToEncrypt) {
    const ephemeralKeyPair = nacl.box.keyPair();
    const nonce = this._generateNonce(ephemeralKeyPair.publicKey, this._pk);
    const cipherText = nacl.box(valueToEncrypt, nonce, this._pk, ephemeralKeyPair.secretKey);

    const output = new Uint8Array(nacl.box.publicKeyLength + cipherText.length);
    output.set(ephemeralKeyPair.publicKey);
    output.set(cipherText, nacl.box.publicKeyLength);

    return output;
  }

  decryptWithKeyPair(cipherText) {
    const input = Account.decodeBase64(cipherText);
    const originalEphemeralPublicKey = input.subarray(0, nacl.box.publicKeyLength);

    const nonce = this._generateNonce(originalEphemeralPublicKey, this._pk);
    const encryptedValue = input.subarray(nacl.box.publicKeyLength);
    const decryptedValue = nacl.box.open(encryptedValue, nonce, originalEphemeralPublicKey, this._sk);

    if (!decryptedValue) throw new Error();

    return decryptedValue;
  }

  encrypt(plainText) {
    const messageToEncrypt = Account.decodeUTF8(plainText);
    const randomBytes = nacl.randomBytes(NONCE_COMPUTE_LENGTH);
    const nonce = this._generateNonce(randomBytes, this._key);
    const cipherText = nacl.secretbox(messageToEncrypt, nonce, this._key);

    const output = new Uint8Array(NONCE_LENGTH + cipherText.length);
    output.set(nonce);
    output.set(cipherText, NONCE_LENGTH);

    return Account.encodeBase64(output);
  }

  decrypt(cipherText) {
    const input = Account.decodeBase64(cipherText);
    const nonce = input.subarray(0, NONCE_LENGTH);
    const encryptedMessage = input.subarray(NONCE_LENGTH);
    const decryptedMessage = nacl.secretbox.open(encryptedMessage, nonce, this._key);

    return Account.encodeUTF8(decryptedMessage);
  }
}

export default Account;
