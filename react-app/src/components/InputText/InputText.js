import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid';

import './InputText.css';

const TEXT = 'text';
const PASSWORD = 'password';

export default class InputText extends Component {
  static propTypes = {
    /**
     * The type of the input. Possible values: 'text' or 'password'.
     */
    type: PropTypes.oneOf([TEXT, PASSWORD]).isRequired,

    /**
     * The label the input will display.
     */
    label: PropTypes.string,

    /**
     * The placeholder text the input will display.
     */
    placeholder: PropTypes.string,

    /**
     * The function to call when the input value changes.
     */
    onChange: PropTypes.func,

    /**
     * The function to call when enter is pressed.
     */
    onEnter: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    placeholder: '',
    onEnter: () => {},
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = { type: this.props.type };
  }

  _togglePasswordVisibility = () => {
    this.setState({ type: (this.state.type === TEXT) ? PASSWORD : TEXT });
  }

  _getInputIcon = () => {
    if (this.props.type === TEXT) return null;

    return (
      <FontAwesomeIcon
        className="show-hide-button"
        icon={(this.state.type === TEXT) ? faEyeSlash : faEye}
        onClick={this._togglePasswordVisibility}
      />
    )
  }

  render() {
    const icon = this._getInputIcon();
    const label = (this.props.label !== '') ? <label>{this.props.label}</label> : null;
    const placeholder = (this.props.placeholder !== '') ? this.props.placeholder : null;

    return (
      <div>
        {label}
        <input
          className={this.props.type}
          type={this.state.type}
          placeholder={placeholder}
          onKeyPress={event => (event.key === 'Enter') ? this.props.onEnter() : null}
          onChange={event => this.props.onChange(event.target.value)}
        />
        {icon}
      </div>
    );
  }
}
