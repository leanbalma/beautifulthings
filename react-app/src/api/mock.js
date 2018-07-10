const MOCK_INITIAL_VALUES = {
  delay: 0,
  signUpResult: true,
  signInResult: true,
  signedIn: false,
  entries: [],
  preferences: { daily: true }
}

class ErrorCannotGetEntries extends Error {}

class Api {
  constructor() {
    window['mock'] = MOCK_INITIAL_VALUES;
  }

  async _delay() {
    return new Promise(resolve => setTimeout(resolve, window.mock.delay));
  }

  initAccount(username, keyPair) {}

  async signUp() {
    await this._delay();
    return window.mock.signUpResult;
  }

  async signIn() {
    await this._delay();
    return window.mock.signInResult;
  }

  async addEntry(entry) {
    await this._delay();
    return window.mock.signedIn;
  }

  async getEntries(from, to) {
    await this._delay();
    if (!window.mock.signedIn) throw new ErrorCannotGetEntries();
    return window.mock.entries;
  }
}

const api = new Api();

export default api;
export { ErrorCannotGetEntries };
