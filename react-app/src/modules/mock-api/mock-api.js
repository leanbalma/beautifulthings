var db = {
  users: [] // Array of {id, username, password}
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

export class ErrorUsernameAlreadyExists extends Error {}
