import Account from 'account';

class ErrorCannotGetEntries extends Error {}

class Api {
  static mockUsername = 'username';
  static mockPassword = 'password';

  constructor() {
    this._mockAccount = null;
    this._account = null;
    this._isSignedIn = false;

    this._entries = [];
  }

  initAccount(username, keyPair) {
    this._account = new Account(username, keyPair);
  }

  async signUp() {
    const sameUsername = this._account._username === Api.mockUsername;
    return !sameUsername;
  }

  async _sameToMock() {
    if (!this._mockAccount) {
      const mockAccountKeyPair = await Account.generateKeyPair(Api.mockUsername, Api.mockPassword);
      this._mockAccount = new Account(Api.mockUsername, mockAccountKeyPair);
    }

    return JSON.stringify(this._account) === JSON.stringify(this._mockAccount);
  }

  async signIn() {
    const sameAccount = await this._sameToMock();
    if (!sameAccount) {
      this._isSignedIn = false;
      return false;
    }

    this._isSignedIn = true;
    return true;
  }

  _addOrReplaceEntry(newEntry) {
    const entryIndex = this._entries.findIndex(entry => entry.date === newEntry.date);
    entryIndex === -1 ? this._entries.push(newEntry) : this._entries[entryIndex] = newEntry;
  }

  async addEntry(entry) {
    if (!this._isSignedIn) return false;

    this._addOrReplaceEntry(entry);

    return true;
  }

  _findEntries(from, to) {
    const fromEpoch = Date.parse(from);
    const toEpoch = Date.parse(to);

    const entries = this._entries.filter(entry => {
      const entryEpoch = Date.parse(entry.date);
      return entryEpoch >= fromEpoch && entryEpoch < toEpoch;
    });

    return entries;
  }

  async getEntries(from, to) {
    if (!this._isSignedIn) throw new ErrorCannotGetEntries();

    const filteredEntries = this._findEntries(from, to);

    return filteredEntries;
  }
}

const api = new Api();

export default api;
export { Api, ErrorCannotGetEntries };
