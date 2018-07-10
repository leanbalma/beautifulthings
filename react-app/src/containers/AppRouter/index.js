import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import EditScreenWrapper from 'containers/EditScreenWrapper';
import StartScreen from 'containers/StartScreen';

class AppRouter extends React.PureComponent {
  _navigateToList = () => window.location.hash = 'list';

  _getEditScreen = props => <EditScreenWrapper
    {...props}
    onBack={this._navigateToList}
    onSave={() => { /* TODO */ }}
  />

  render() {
    return (
      <HashRouter>
        <div>
          <Redirect exact path="/" to="/edit" />
          <Route exact path="/start" component={StartScreen} />
          <Route exact path="/edit" render={this._getEditScreen} />
          <Route exact path="/edit/:date" render={this._getEditScreen} />
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
