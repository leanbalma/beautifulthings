import scrypt from 'scrypt-async';
import nacl from 'tweetnacl';
import sha256 from 'fast-sha256';
import blake from 'blakejs';

nacl.util = require('tweetnacl-util');

var _username, _pk, _sk, _tz, _offset;

function _generateNonce(publicKeyA, publicKeyB) {
  let state = blake.blake2bInit(nacl.box.nonceLength, null);
	blake.blake2bUpdate(state, publicKeyA);
  blake.blake2bUpdate(state, publicKeyB);
  return blake.blake2bFinal(state);
}

export function constructor(username, password) {
  return new Promise(resolve => {
    scrypt(sha256(nacl.util.decodeUTF8(password)), sha256(nacl.util.decodeUTF8(username)), {
      N: 1 << 20,
      r: 8,
      p: 1,
      dkLen: 32,
      encoding: 'binary'
    }, (function(derivedKey) {
      const keypair = nacl.box.keyPair.fromSecretKey(derivedKey);
      _username = username;
      _pk = keypair.publicKey;
      _sk = keypair.secretKey;
      resolve(null);
    }));
  });
}

export function bytes() {
  return JSON.stringify({
    username: _username,
    pk: _pk,
    tz: _tz,
    offset: _offset
  });
}

export function encrypt(plainText) {
  const messageToEncrypt = nacl.util.decodeUTF8(plainText);
  let encryptedMessage =
    new Uint8Array(nacl.box.publicKeyLength + nacl.box.overheadLength + messageToEncrypt.length);

	const ephemeralKeyPair = nacl.box.keyPair();
	encryptedMessage.set(ephemeralKeyPair.publicKey);

  const nonce = _generateNonce(ephemeralKeyPair.publicKey, _pk);
  const boxed = nacl.box(messageToEncrypt, nonce, _pk, ephemeralKeyPair.secretKey);

	encryptedMessage.set(boxed, ephemeralKeyPair.publicKey.length);
  return nacl.util.encodeBase64(encryptedMessage);
}

export function decrypt(cipherText) {
  const encryptedMessage = nacl.util.decodeBase64(cipherText);
  const ephemeralKeyPair = encryptedMessage.subarray(0, nacl.box.publicKeyLength);

  const nonce = _generateNonce(ephemeralKeyPair, _pk);

  const boxData = encryptedMessage.subarray(nacl.box.publicKeyLength);
	return nacl.util.encodeUTF8(nacl.box.open(boxData, nonce, ephemeralKeyPair, _sk));
}

export function getUsername() {
  return _username;
}

export function getPublicKey() {
  return _pk;
}

export function getSecretKey() {
  return _sk;
}

export function getTimezone() {
  return _tz;
}

export function setOffset(offset) {
  // TODO: Note that tz could be HH:30 or even HH:45. setOffset have to set _offset and _tz.
}

export function getOffset() {
  return _offset;
}
