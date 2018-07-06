import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

import InputText from 'components/InputText';
import Logo from 'components/Logo';

export default class BaseUserPassScreen extends React.PureComponent {
  static propTypes = {
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onPasswordEnter: PropTypes.func,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = { onPasswordEnter: null }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this._usernameInput.focus();
  }

  _setUsernameInputRef = element => this._usernameInput = element;
  _setPasswordInputRef = element => this._passwordInput = element;

  _handleUsernameChange = value => this.props.onUsernameChange(value);
  _handlePasswordChange = value => this.props.onPasswordChange(value);

  _handleUsernameEnter = () => this._passwordInput.focus();
  _handlePasswordEnter = () => this.props.onPasswordEnter ? this.props.onPasswordEnter() : null;

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
          onEnter={this._handlePasswordEnter}
          ref={this._setPasswordInputRef}
        />
        {this.props.children}
      </div>
    );
  }
}
