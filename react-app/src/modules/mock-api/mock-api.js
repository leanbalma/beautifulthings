const DEFAULT_DELAY_MS = 1000;

let db = {
  usersById:            {}, // key: user-id-x: { username: 'username', password: 'password' }
  tokensByUser:         {}, // key: user-id-x: 'token'
  entriesById:          {}, // key: entry-id-x: { date: 'YYYY-MM-DD', text: 'text' }
  entriesByUser:        {}, // key: user-id-x: [ 'entry-id-x', 'entry-id-y' ]
  entriesByUserByDate:  {}, // key: user-id-x-yyyy-mm-dd: entry-id-x
  preferencesByUser:    {}  // key: user-id-x: { keys: values }
}

export function initializeMockDatabase(mockDb) {
  db = mockDb;
}

export function clearDatabase() {
  db = {
    usersById:            {},
    tokensByUser:         {},
    entriesById:          {},
    entriesByUser:        {},
    entriesByUserByDate:  {},
    preferencesByUser:    {}
  }
}

export function getDatabase() {
  return db;
}

function _wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function _getUserIdByToken(token) {
  for (let userId in db.tokensByUser)
    if (db.tokensByUser[userId] === token) return userId;
  return null;
}

function _getEntriesByUserId(userId) {
  return db.entriesByUser[userId].map(entryId => db.entriesById[entryId]);
}

export async function signUp(username, password, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  for (let userId in db.usersById)
    if (db.usersById[userId].username === username) throw new ErrorUsernameAlreadyExists();

  const newUserId = 'user-id-' + (Object.keys(db.usersById).length + 1);
  db.usersById[newUserId] = {
    username,
    password
  }
  db.entriesByUser[newUserId] = [];
  db.preferencesByUser[newUserId] = {
    notification: 'weekly'
  }

  return null;
}

export async function signIn(username, password, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  for (let userId in db.usersById) {
    let userData = db.usersById[userId];
    if (userData.username === username && userData.password === password) {
      const token = Math.random().toString(36).substr(2);
      db.tokensByUser[userId] = token;
      return token;
    }
  }

  throw new ErrorInvalidUsernameOrPassword();
}

export async function set(token, date, text, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);
  if (userId === null) throw new ErrorInvalidToken();

  const entryIdForUserAtDate = db.entriesByUserByDate[userId + '-' + date];
  if (entryIdForUserAtDate !== undefined) {
    db.entriesById[entryIdForUserAtDate].text = text;
  }
  else {
    const newEntryId = 'entry-id-' + (Object.keys(db.entriesById).length + 1);
    db.entriesById[newEntryId] = {
      date,
      text
    }
    db.entriesByUser[userId].push(newEntryId);
    db.entriesByUserByDate[userId + '-' + date] = newEntryId;
  }

  return null;
}

export async function enumerate(token, from, to, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);
  if (userId === null) throw new ErrorInvalidToken();

  const entries = _getEntriesByUserId(userId)
    .filter(entry => new Date(from) <= new Date(entry.date) && new Date(entry.date) <= new Date(to));

  return { entries };
}

export async function setPref(token, key, value, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);
  if (userId === null) throw new ErrorInvalidToken();

  db.preferencesByUser[userId][key] = value;
  return null;
}

export async function getPref(token, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);
  if (userId === null) throw new ErrorInvalidToken();

  return db.preferencesByUser[userId];
}

export class ErrorUsernameAlreadyExists extends Error {}
export class ErrorInvalidUsernameOrPassword extends Error {}
export class ErrorInvalidToken extends Error {}
