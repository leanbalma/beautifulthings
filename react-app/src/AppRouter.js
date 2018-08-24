import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import EditScreenContainer from 'containers/EditScreenContainer';
import ListScreenContainer from 'containers/ListScreenContainer';
import SignUpScreenContainer from 'containers/SignUpScreenContainer';
import StartScreenContainer from 'containers/StartScreenContainer';

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
          <Route exact path={SCREENS_HASHES.start} component={StartScreenContainer} />
          <Route exact path={SCREENS_HASHES.signUp} component={SignUpScreenContainer} />
          <Route exact path={SCREENS_HASHES.list} component={ListScreenContainer} />
          <Route exact path={SCREENS_HASHES.edit(':date')} component={EditScreenContainer} />
        </div>
      </HashRouter>
    );
  }
}

export { changeHash, SCREENS_HASHES }
export default AppRouter;
