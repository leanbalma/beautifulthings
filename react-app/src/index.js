import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './containers/AppRouter';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const startApp = () => {
  ReactDOM.render(<AppRouter />, document.getElementById('root'));
  registerServiceWorker();
}

if (!window.cordova) {
  startApp();
} else {
  document.addEventListener('deviceready', startApp, false);
}
