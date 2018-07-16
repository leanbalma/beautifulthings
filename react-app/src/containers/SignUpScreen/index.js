import React from 'react';
import PropTypes from 'prop-types';

import Account from 'account';

import BaseUserPassScreen from 'containers/BaseUserPassScreen';
import Button from 'components/Button';

import styles from './index.module.scss';

export default class SignUpScreen extends React.PureComponent {
  static propTypes = { onSignIn: PropTypes.func.isRequired }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  _handleChanges = (username, password) => this.setState({ username, password });
  _handlePasswordEnter = () => this._signUp();

  _handleSignUp = () => this._signUp();
  _handleSignIn = () => this.props.onSignIn();

  _signUp() {
    const {username, password} = this.state;

    if (!Account.validateUserPass(username, password)) return;

    // TODO: Show spinner, create account and signup
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
            onClick={this._signUp}
          >
            Sign Up
          </Button>
          <span onClick={this._handleSignIn}>
            Or sign in
          </span>
        </div>
      </BaseUserPassScreen>
    );
  }
}
