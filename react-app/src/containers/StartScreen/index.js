import React, { PureComponent } from 'react';

import styles from './index.module.scss';

import Logo from 'components/Logo';
import Button from 'components/Button';
import InputText from 'components/InputText';

export default class StartScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() { this._usernameInputRef.focus(); }

  _setUsernameInputRef = element => this._usernameInputRef = element;
  _setPasswordInputRef = element => this._passwordInputRef = element;

  _handleUsernameChange = username => this.setState({ username });
  _handlePasswordChange = password => this.setState({ password });

  _handleUsernameEnter = () => this._passwordInputRef.focus();

  _isUsernameAndPasswordValid = () =>
    (this.state.username.length > 0 && this.state.password.length > 0) ? true : false;

  render() {
    return (
      <div className={styles.container}>
        <Logo size={Logo.BIG} />
        <InputText
          type={InputText.TEXT}
          label="Username: "
          placeholder="Username"
          onChange={this._handleUsernameChange}
          onEnter={this._handleUsernameEnter}
          ref={this._setUsernameInputRef}
        />
        <InputText
          type={InputText.PASSWORD}
          label="Password: "
          placeholder="Password"
          onChange={this._handlePasswordChange}
          ref={this._setPasswordInputRef}
        />
        <Button disabled={!this._isUsernameAndPasswordValid()}>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    );
  }
}
