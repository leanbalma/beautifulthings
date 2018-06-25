import Account from 'account';
import { createEntry } from 'utils/entry';

const _HOST = 'http://localhost/';

class ErrorCannotGetEntries extends Error {}

class Api {
  initAccount(username, keyPair) {
    this._account = new Account(username, keyPair);
  }

  _getUrl(path, withToken = false) {
    let url = `${_HOST}${path}`;
    if (withToken) url += `?token=${this._token}`;

    return url;
  }

  async _get(path, withToken = false) {
    const url = this._getUrl(path, withToken);

    return await fetch(url);
  }

  async _post(path, body, withToken = false) {
    const url = this._getUrl(path, withToken);

    const options = {
      method: 'POST',
      body
    }

    return await fetch(url, options);
  }

  async signUp() {
    const data = this._account.toString();
    const response = await this._post('signup', data);

    return response.ok;
  }

  async signIn() {
    const data = this._account.toString();
    const response = await this._post('signin', data);

    if (!response.ok) return false;

    const receivedJson = await response.json();
    const encryptedToken = receivedJson.EncryptedToken;
    this._token = this._account.decrypt(encryptedToken);

    return true;
  }

  async addEntry(entry) {
    const cipherText = this._account.encrypt(entry.text);
    const data = JSON.stringify({
      Date: entry.date,
      Ct: cipherText,
    });

    const response = await this._post('things', data, true);

    return response.ok;
  }

  _decryptReceivedEntry = entry => createEntry(entry.Date, this._account.decrypt(entry.Content));

  async getEntries(from, to) {
    const response = await this._get(`things/${from}/${to}`, true);

    if (!response.ok) throw new ErrorCannotGetEntries();

    const encryptedEntries = await response.json();
    const decryptedEntries = encryptedEntries.map(this._decryptReceivedEntry);

    return decryptedEntries;
  }
}

const api = new Api();

export default api;
export { ErrorCannotGetEntries }
