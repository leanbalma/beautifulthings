var db = {
  users: [],            // Array of {id, username, password}
  sessions: [],         // Array of {idUser, token}
  entries: [],          // Array of {id, date, text}
  usersEntries: [],     // Array of {idUser, idEntry}
  preferences: [],      // Array of {id, key, value}
  usersPreferences: []  // Array of {idUser, idPreference}
};

export function initializeMockDatabase(mockDb) {
  db = mockDb;
}

export function clearDatabase() {
  db = {}
}

export function getDatabase() {
  return db;
}

function getUserIdFromToken(token) {
  let result = null;
  db.sessions.some(session => (token === session.token) ? result = session.idUser : null);
  return result;
}

function getUserEntries(userId) {
  return db.usersEntries
    .filter(userEntry => userEntry.idUser === userId)
    .map(userEntry => db.entries[userEntry.idEntry]);
}

function getUserPreferences(userId) {
  return db.usersPreferences
    .filter(userPreference => userPreference.idUser === userId)
    .map(userPreference => db.preferences[userPreference.idPreference]);
}

export function signUp(username, password) {
  return new Promise((resolve, reject) => {
    db.users.some(user =>
      (username === user.username) ? reject(new ErrorUsernameAlreadyExists()) : null);

    db.users.push({
      id: db.users.length,
      username,
      password
    });

    resolve(null);
  });
}

export function signIn(username, password) {
  return new Promise((resolve, reject) => {
    db.users.some(user => {
      if (username === user.username && password === user.password) {
        const token = Math.random().toString(36).substr(2);
        db.sessions.push({
          idUser: user.id,
          token
        });
        resolve(token);
      }
    });

    reject(new ErrorInvalidUsernameOrPassword());
  });
}

export function set(token, date, text) {
  return new Promise((resolve, reject) => {
    const userId = getUserIdFromToken(token);
    if (userId === null) reject(new ErrorInvalidToken());

    const entryAtDate = getUserEntries(userId).filter(entry => entry.date === date)[0];
    if (entryAtDate === undefined) {
      db.entries.push({
        id: db.entries.length,
        date,
        text
      });
      db.usersEntries.push({
        idUser:   userId,
        idEntry:  db.entries.length - 1
      });
    }
    else {
      db.entries[entryAtDate.id].text = text;
    }

    resolve(null);
  });
}

export function enumerate(token, from, to) {
  return new Promise((resolve, reject) => {
    const userId = getUserIdFromToken(token);
    if (userId === null) reject(new ErrorInvalidToken());

    const entries = getUserEntries(userId)
      .filter(entry => new Date(from) <= new Date(entry.date) && new Date(entry.date) <= new Date(to));

    resolve({
      entries
    });
  });
}

export function setPref(token, key, value) {
  return new Promise((resolve, reject) => {
    const userId = getUserIdFromToken(token);
    if (userId === null) reject(new ErrorInvalidToken());

    const preferenceToSet = getUserPreferences(userId)
      .filter(preference => preference.key === key)[0];

    (preferenceToSet === undefined) ?
      reject(new ErrorInvalidPreference()) :
      db.preferences[preferenceToSet.id].value = value;

    resolve(null);
  });
}

export function getPref(token) {
  return new Promise((resolve, reject) => {
    const userId = getUserIdFromToken(token);
    (userId === null) ?
      reject(new ErrorInvalidToken()) :
      resolve({
        preferences: getUserPreferences(userId)
      });
  })
}

export class ErrorUsernameAlreadyExists extends Error {}
export class ErrorInvalidUsernameOrPassword extends Error {}
export class ErrorInvalidToken extends Error {}
export class ErrorInvalidPreference extends Error {}
