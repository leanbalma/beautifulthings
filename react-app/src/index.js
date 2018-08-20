import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';

import rootReducer from 'reducers';

import AppRouter from './AppRouter';

import './index.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const startApp = () => {
  ReactDOM.render(app, document.getElementById('root'));
  registerServiceWorker();
}

if (!window.cordova) {
  startApp();
} else {
  document.addEventListener('deviceready', startApp, false);
}
