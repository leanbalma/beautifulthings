var db = {
  users: [],        // Array of {id, username, password}
  sessions: [],     // Array of {idUser, token}
  entries: [],      // Array of {id, date, text}
  usersEntries: []  // Array of {idUser, idEntry}
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
  db.sessions.some(session => {
    if (token === session.token) {
      result = session.idUser;
      return true;
    }
  });

  return result;
}

function getUserEntries(userId) {
  return db.usersEntries
    .filter(userEntry => userEntry.idUser === userId)
    .map(userEntry => db.entries[userEntry.idEntry]);
}

export function signUp(username, password) {
  return new Promise((resolve, reject) => {
    db.users.some(user =>
      (username === user.username) ? reject(new ErrorUsernameAlreadyExists()) : false);

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
        let token = Math.random().toString(36).substr(2); // No verification if token already exists
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
    let userId = getUserIdFromToken(token);
    if (userId === null) reject(new ErrorInvalidToken());

    let userEntries = getUserEntries(userId);
    let entryAtDate = userEntries.filter(entry => entry.date === date)[0];
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

export class ErrorUsernameAlreadyExists extends Error {}
export class ErrorInvalidUsernameOrPassword extends Error {}
export class ErrorInvalidToken extends Error {}
