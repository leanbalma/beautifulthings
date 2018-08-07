import React from 'react';
import PropTypes from 'prop-types';

import Account from 'account';

import BaseUserPassScreen from 'containers/BaseUserPassScreen';
import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';

import styles from './index.module.scss';

export default class SignUpScreen extends React.PureComponent {
  static propTypes = {
    onSignIn: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    isSignedUpModalVisible: false,
    isTryAnotherModalVisible: false,
  };

  _validateForm() {
    const { username, password } = this.state;

    return username && password;
  }

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

    if (validForm) this._signUp();
  }

  _showSuccessfulySignedUpModal = () => this.setState({ isSignedUpModalVisible: true });
  _toggleTryAnotherModalVisibility = () => this.setState({ isTryAnotherModalVisible: !this.state.isTryAnotherModalVisible });

  _handleSignUp = () => this._signUp();
  _handleSignIn = () => this.props.onSignIn();

  _signUp() { /* TODO: Show spinner, create account, signup and show corresponding modal */ }

  _getSignUpButton() {
    const validFormDate = this._validateForm();

    return Button({
      disabled: !validFormDate,
      onClick: this._handleSignUp,
      children: "Sign up",
    });
  }

  _signInButton = Button({
    children: "Sign in",
    onClick: this._handleSignIn,
    small: true,
  });

  _getSignedUpModal() {
    return ButtonsModal({
      visible: this.state.isSignedUpModalVisible,
      message: "Successful registration",
      primaryButton: this._signInButton,
    });
  }

  _closeModalButton = Button({
    children: "Try another",
    onClick: this._toggleTryAnotherModalVisibility,
    small: true,
  });

  _getTryAnotherModal() {
    return ButtonsModal({
      visible: this.state.isTryAnotherModalVisible,
      message: "Username already exists",
      primaryButton: this._closeModalButton,
    });
  }

  render() {
    const { usernameError, passwordError } = this.state;

    const signUpButton = this._getSignUpButton();
    const signedUpModal = this._getSignedUpModal();
    const tryAnotherModal = this._getTryAnotherModal();

    return (
      <div>
        {signedUpModal}
        {tryAnotherModal}
        <BaseUserPassScreen
          usernameError={usernameError}
          passwordError={passwordError}
          onUsernameChange={this._handleUsernameChange}
          onPasswordChange={this._handlePasswordChange}
          onPasswordEnter={this._handlePasswordEnter}
        >
          <div className={styles.container}>
            <div>
              {signUpButton}
            </div>
            <div
              className={styles.signInLabelContainer}
              onClick={this._handleSignIn}
            >
              or sign in
            </div>
          </div>
        </BaseUserPassScreen>
      </div>
    );
  }
}
