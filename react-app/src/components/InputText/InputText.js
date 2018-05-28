import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid';

import './InputText.css';

export default class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      togglePasswordVisibilityButtonIcon: faEye
    };

    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  togglePasswordVisibility() {
    if (this.state.type === 'password') {
      this.setState({
        type: 'text',
        togglePasswordVisibilityButtonIcon: faEyeSlash
      });
    } else {
      this.setState({
        type: 'password',
        togglePasswordVisibilityButtonIcon: faEye
      });
    }
  }

  render() {
    const togglePasswordVisibilityButton = (this.props.type === 'password') ? (
      <FontAwesomeIcon
        className="show-hide-button"
        icon={this.state.togglePasswordVisibilityButtonIcon}
        onClick={this.togglePasswordVisibility}
      />
    ) : (null);

    return (
      <div>
        <label>{this.props.label}</label>
        <input
          className={this.props.type}
          type={this.state.type}
          placeholder={this.props.placeholder}
          onChange={event => this.props.onEnter(event.target.value)}
        />
        {togglePasswordVisibilityButton}
      </div>
    );
  }
}
