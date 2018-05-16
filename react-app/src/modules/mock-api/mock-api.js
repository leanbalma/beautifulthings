var db = {
  users: [],    // Array of {id, username, password}
  sessions: [], // Array of {idUser, token}
  entries: []   // Array of {id, idUser, date, text}
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

function getEntryByUserIdAndByDate(userId, date) {
  let result = null;
  db.entries.some(entry => {
    if (entry.idUser === userId && entry.date === date) {
      result = entry;
      return true;
    }
  });

  return result;
}

export function signUp(username, password) {
  return new Promise((resolve, reject) => {
    db.users.some(user => {
      if (username === user.username) reject(new ErrorUsernameAlreadyExists());
    });

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

    let entry = getEntryByUserIdAndByDate(userId, date);
    if (entry !== null) {
      db.entries[entry.id]['text'] = text;
    }
    else {
      db.entries.push({
        id:     db.entries.length,
        idUser: userId,
        date,
        text
      });
    }

    resolve(null);
  });
}

export class ErrorUsernameAlreadyExists extends Error {}
export class ErrorInvalidUsernameOrPassword extends Error {}
export class ErrorInvalidToken extends Error {}
