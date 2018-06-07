import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import StartScreen from 'containers/StartScreen';

class AppRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={null} />
          <Route exact path="/start" component={StartScreen} />
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
