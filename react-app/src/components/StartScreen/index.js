import React from 'react';
import PropTypes from 'prop-types';

import Account from 'account';

import BaseUserPassScreen from 'components/BaseUserPassScreen';
import Button from 'components/Button';

import styles from './index.module.scss';

export default class StartScreen extends React.PureComponent {
  static propTypes = {
    /**
     * The function to call when sign in button is pressed
     */
    onSignIn: PropTypes.func.isRequired,

    /**
     * The function to call when sign up button is pressed
     */
    onSignUp: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
  };

  _validateForm = () => this.state.username && this.state.password;

  _handleUsernameChange = username => {
    const valid = Account.validateUsername(username);

    if (valid) {
      this.setState({
        username,
        usernameError: '',
      });
    } else {
      this.setState({
        username: '',
        usernameError: 'Username is too short',
      });
    }
  }

  _handlePasswordChange = password => {
    const valid = Account.validatePassword(password);

    if (valid) {
      this.setState({
        password,
        passwordError: '',
      });
    } else {
      this.setState({
        password: '',
        passwordError: 'Password is too short',
      });
    }
  }

  _handlePasswordEnter = () => {
    const validForm = this._validateForm();

    if (validForm) this._signIn();
  }

  _signIn = () => this.props.onSignIn(this.state.username, this.state.password);

  render() {
    const { usernameError, passwordError } = this.state;
    const validForm = this._validateForm();

    return (
      <BaseUserPassScreen
        usernameError={usernameError}
        passwordError={passwordError}
        onUsernameChange={this._handleUsernameChange}
        onPasswordChange={this._handlePasswordChange}
        onPasswordEnter={this._handlePasswordEnter}
      >
        <div className={styles.container}>
          <Button onClick={this._signIn} disabled={!validForm}>
            Sign in
          </Button>
          <div className={styles.createAccountLabelContainer}>
            - Create your account -
          </div>
          <Button onClick={this.props.onSignUp}>
            Sign up
          </Button>
        </div>
      </BaseUserPassScreen>
    );
  }
}
