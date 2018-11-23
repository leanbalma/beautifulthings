import Account from 'account';
import * as keystore from 'keystore';
import { createEntry } from 'utils/entry';
import { setNotifications, clearNotifications } from 'notifications';


const _HOST = 'https://server.beautifulthings.app/';
// const _HOST = 'http://localhost:8080/';

const fromDate = '2018-01-01';

class ErrorCannotGetEntries extends Error {}

class Api {
  initAccount(username, keyPair) {
    this._account = new Account(username, keyPair);
  }

  _getUrl(path) {
    let url = `${_HOST}${path}`;
    if (this._token) url += `?token=${this._token}`;

    return url;
  }

  async _get(path) {
    const url = this._getUrl(path);

    return fetch(url);
  }

  async _post(path, body) {
    const url = this._getUrl(path);

    const options = {
      method: 'POST',
      body
    }

    return fetch(url, options);
  }

  async signUp() {
    const data = this._account.toString();
    const response = await this._post('signup', data);

    return response.ok;
  }

  async _getKey() {
    const response = await this._get('bootstrap');

    if (!response.ok) throw new Error();

    const receivedJson = await response.json();
    const encryptedKey = receivedJson.EncryptedKey;
    const key = this._account.decryptWithKeyPair(encryptedKey);

    return key;
  }
  
  async signIn() {
    const data = this._account.toString();
    const response = await this._post('signin', data);
    
    if (!response.ok) return false;

    try {
      const receivedJson = await response.json();
      const encryptedToken = receivedJson.EncryptedToken;
      const uint8Token = this._account.decryptWithKeyPair(encryptedToken);
      this._token = Account.encodeUTF8(uint8Token);

      const key = await this._getKey();
      this._account.key = key;
    } catch(error) {
      return false;
    }

    await this._saveAccountData();

    await setNotifications();

    return true;
  }

  async signOut() {
    await this._clearAccountSavedData();

    await clearNotifications();
  }

  async addEntry(entry) {
    const cipherText = this._account.encrypt(entry.text);
    const data = JSON.stringify({
      Date: entry.date,
      Ct: cipherText,
    });

    const response = await this._post('things', data);

    return response.ok;
  }

  async getEntries(to) {
    const response = await this._get(`things/${fromDate}/${to}`);

    if (!response.ok) throw new ErrorCannotGetEntries();

    const encryptedEntries = await response.json();
    if (!encryptedEntries) return [];

    const decryptedEntries = [];
    encryptedEntries.forEach(entry => {
      const decryptedText = this._account.decrypt(entry.Content);

      if (decryptedText) {
        const decryptedEntry = createEntry(entry.Date, decryptedText);
        decryptedEntries.push(decryptedEntry);
      }
    });

    return decryptedEntries;
  }

  async _saveAccountData() {
    try {
      const serializedAccount = this._account.serialize();

      await keystore.init();
      await keystore.set('account', serializedAccount);
    } catch (error) {
      /* Nothing here. If the account data cannot be saved, the app works normally without this feature */
    }
  }

  async _clearAccountSavedData() {
    try {
      await keystore.init();
      await keystore.clear();
    } catch (error) {
      /* Nothing here. If the account data cannot be deleted, the app works normally without this feature */
    }
  }

  async initSavedAccount() {
    let savedAccountUsername = "";

    try {
      await keystore.init();
      const serializedSavedAccount = await keystore.get('account');
      const deserializedSavedAccount = JSON.parse(serializedSavedAccount);
      savedAccountUsername = deserializedSavedAccount.username;
      const savedAccountKeyPair = {
        publicKey: Uint8Array.from(deserializedSavedAccount.publicKey),
        secretKey: Uint8Array.from(deserializedSavedAccount.secretKey),
      };
      this.initAccount(savedAccountUsername, savedAccountKeyPair);
      await this.signIn();
    } catch (error) {
      /* Nothing here. If the account data cannot be loaded, the app works normally and user must signin */
    }
    return savedAccountUsername;
  }
}

const api = new Api();

export default api;
export { ErrorCannotGetEntries }
