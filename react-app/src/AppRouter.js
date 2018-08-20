import React from 'react';
import { HashRouter } from 'react-router-dom';

const SCREENS_HASHES = {
  start: '/',
  signUp: '/signup',
  list: '/list',
  edit: date => `/edit/${date}`,
}

function changeHash(hash) {
  window.location.hash = hash;
}

class AppRouter extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <div>
        </div>
      </HashRouter>
    );
  }
}

export { changeHash, SCREENS_HASHES }
export default AppRouter;
