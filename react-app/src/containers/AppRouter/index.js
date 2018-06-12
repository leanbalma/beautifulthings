import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import StartScreen from 'containers/StartScreen';
import DetailScreen from 'containers/DetailScreen';

class AppRouter extends Component {
  _detailScreen = () =>
    <DetailScreen
      date="2018-01-01"
      text="demo"
      onBack={() => console.log("Back pressed")}
      onRemove={() => console.log("Remove pressed")}
      onEdit={() => console.log("Edit pressed")}
    />;

  render() {
    return (
      <HashRouter>
        <div>
          <Redirect exact path="/" to="/start" />
          <Route exact path="/start" component={StartScreen} />
          <Route exact path="/details" render={this._detailScreen} />
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
