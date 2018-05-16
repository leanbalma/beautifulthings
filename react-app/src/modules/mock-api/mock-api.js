var db = {
  users: [],    // Array of {id, username, password}
  sessions: []  // Array of {idUser, token}
};

export function initializeMockDatabase(mockDb) {
  db = mockDb;
}

export function clearDatabase() {
  db = {}
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

export class ErrorUsernameAlreadyExists extends Error {}
export class ErrorInvalidUsernameOrPassword extends Error {}
