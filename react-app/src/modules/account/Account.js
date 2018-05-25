import scrypt from 'scrypt-async';
import nacl from 'tweetnacl';
import sha256 from 'fast-sha256';
import blake from 'blakejs';

nacl.util = require('tweetnacl-util');

export const OFFSET_MIN = -12;
export const OFFSET_MAX = 14;

class Account {
  constructor() {
    this._initialized = false;
  }

  initialize(username, password, offset) {
    if (this._initialized) throw new ErrorAccountAlreadyInitialized();

    this.offset = offset;

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
      this._username = username;
      this._pk = keyPair.publicKey;
      this._sk = keyPair.secretKey;
      this._initialized = true;
    };

    scrypt(hashedPassword, salt, options, callback);
  }

  bytes() {
    if (this._initialized) throw new ErrorAccountAlreadyInitialized();

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
    if (this._initialized) throw new ErrorAccountAlreadyInitialized();

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
    if (this._initialized) throw new ErrorAccountAlreadyInitialized();
    
    const input = nacl.util.decodeBase64(cipherText);
    const originalEphemeralPublicKey = input.subarray(0, nacl.box.publicKeyLength);

    const nonce = this._generateNonce(originalEphemeralPublicKey, this._pk);
    const encryptedMessage = input.subarray(nacl.box.publicKeyLength);
    const decryptedMessage
      = nacl.box.open(encryptedMessage, nonce, originalEphemeralPublicKey, this._sk);

    return nacl.util.encodeUTF8(decryptedMessage);
  }

  get offset() {
    return this._offset;
  }

  set offset(offset) {
    if (offset !== parseInt(offset, 10) || offset < OFFSET_MIN || offset > OFFSET_MAX) {
      throw new ErrorInvalidOffsetValue();
    }

    this._offset = offset;
    (offset >= 0) ? this._tz = `GMT+${offset}` : this._tz = `GMT${offset}`;
  }

  get tz() {
    return this._tz;
  }
}

export let account = new Account();
export class ErrorAccountAlreadyInitialized extends Error {}
export class ErrorInvalidOffsetValue extends Error {}
