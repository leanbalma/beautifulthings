import React from 'react';
import PropTypes from 'prop-types';

import Account from 'account';

import BaseUserPassScreen from 'containers/BaseUserPassScreen';
import Button from 'components/Button';

import styles from './index.module.scss';

export default class StartScreen extends React.PureComponent {
  static propTypes = { onSignUp: PropTypes.func.isRequired }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  _handleChanges = (username, password) => this.setState({ username, password });
  _handlePasswordEnter = () => this._signIn();

  _handleSignUp = () => this.props.onSignUp();
  _handleSignIn = () => this._signIn();

  _signIn() {
    const {username, password} = this.state;

    if (!Account.validateUserPass(username, password)) return;

    // TODO: Show spinner, create account and signin
  }

  render() {
    const validUserPass = Account.validateUserPass(this.state.username, this.state.password);

    return (
      <BaseUserPassScreen
        onChanges={this._handleChanges}
        onPasswordEnter={this._handlePasswordEnter}
      >
        <div className={styles.container}>
          <Button
            disabled={!validUserPass}
            onClick={this._handleSignIn}
          >
            Sign In
          </Button>
          <Button onClick={this._handleSignUp}>
            Sign Up
          </Button>
        </div>
      </BaseUserPassScreen>
    );
  }
}
