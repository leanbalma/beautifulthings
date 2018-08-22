let storage = null;

function init() {
  return new Promise((resolve, reject) => {
    storage = new window.cordova.plugins.SecureStorage(
      resolve,
      reject,
      'BeautifulThings'
    );
  });
}

function set(key, value) {
  return new Promise((resolve, reject) => {
    storage.set(
      resolve,
      reject,
      key,
      value
    );
  });
}

function get(key) {
  return new Promise((resolve, reject) => {
    storage.get(
      resolve,
      reject,
      key
    );
  });
}

function clear() {
  return new Promise((resolve, reject) => {
    storage.clear(
      resolve,
      reject
    );
  });
}

export { init, set, get, clear }
