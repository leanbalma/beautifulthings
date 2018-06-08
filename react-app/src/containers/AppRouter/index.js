import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import StartScreen from 'containers/StartScreen';
import DetailScreen from 'containers/DetailScreen';

class AppRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Redirect exact path="/" to="/start" />
          <Route exact path="/start" component={StartScreen} />
          <Route exact path="/details" component={DetailScreen} />
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
