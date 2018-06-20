import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import StartScreen from 'containers/StartScreen';

class AppRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Redirect exact path="/" to="/start" />
          <Route exact path="/start" component={StartScreen} />
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
