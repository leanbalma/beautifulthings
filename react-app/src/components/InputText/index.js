import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
const _classNames = classNames.bind(styles);

export default class InputText extends React.PureComponent {
  static TEXT = 'text';
  static PASSWORD = 'password';

  static propTypes = {
    /**
     * The type of the input. Possible values: 'text' or 'password'.
     */
    type: PropTypes.oneOf([
      InputText.TEXT,
      InputText.PASSWORD
    ]).isRequired,

    /**
     * The label the input will display.
     */
    label: PropTypes.string,

    /**
     * The placeholder text the input will display.
     */
    placeholder: PropTypes.string,

    /**
     * The error message the input will display.
     */
    errorMessage: PropTypes.string,

    /**
     * The function to call when the input value changes.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * The function to call when enter is pressed.
     */
    onEnter: PropTypes.func,
  };

  state = {
    isPasswordVisible: false,
  };

  _setInputRef = element => this._input = element;

  _handleChange = event => {
    const value = event.target.value;

    this.props.onChange(value);
  }

  _handleKeyDown = event => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter' && this.props.onEnter) this.props.onEnter();
  }

  _togglePasswordVisibility = () => this.setState({ isPasswordVisible: !this.state.isPasswordVisible });

  _getInputIcon = () => {
    if (this.props.type === InputText.TEXT) return null;

    const style = this.state.isPasswordVisible ? styles.hidePassword : styles.showPassword;

    return <div className={style} onClick={this._togglePasswordVisibility} />
  }

  focus() {
    this._input.focus();
  }

  render() {
    const { label, type, placeholder, errorMessage } = this.props;
    const { isPasswordVisible } = this.state;

    const inputStyle = _classNames('text', { password: isPasswordVisible });
    const inputType = (type !== InputText.PASSWORD || isPasswordVisible) ? InputText.TEXT : InputText.PASSWORD;

    const icon = this._getInputIcon();
    const errorLabel = errorMessage ? <FormattedMessage id={errorMessage} /> : null;

    return (
      <div className={styles.container}>
        <div className={styles.labelContainer}>
          <FormattedMessage id={label} />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={inputStyle}
            autoCapitalize="off"
            type={inputType}
            placeholder={placeholder || ''}
            onKeyDown={this._handleKeyDown}
            onChange={this._handleChange}
            ref={this._setInputRef}
          />
          {icon}
        </div>
        <div className={styles.errorMessageContainer}>
          {errorLabel}
        </div>
      </div>
    );
  }
}
