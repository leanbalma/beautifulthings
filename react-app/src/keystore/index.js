let storage = null;

function init() {
  return new Promise((resolve, reject) => {
    const onSuccess = () => resolve();
    const onError = error => reject(error);

    storage = new window.cordova.plugins.SecureStorage(
      onSuccess,
      onError,
      'BeautifulThings'
    );
  });
}

function set(key, value) {
  return new Promise((resolve, reject) => {
    const onSuccess = () => resolve();
    const onError = error => reject(error);

    storage.set(
      onSuccess,
      onError,
      key,
      value
    );
  });
}

function get(key) {
  return new Promise((resolve, reject) => {
    const onSuccess = value => resolve(value);
    const onError = error => reject(error);

    storage.get(
      onSuccess,
      onError,
      key
    );
  });
}

function clear() {
  return new Promise((resolve, reject) => {
    const onSuccess = () => resolve();
    const onError = error => reject(error);

    storage.clear(
      onSuccess,
      onError
    );
  });
}

export { init, set, get, clear }
