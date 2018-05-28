import React, { Component } from 'react';

import PlaceholderLogo from './PlaceholderLogo.svg';
import './Logo.css';

export default class Logo extends Component {
  render() {
    return (
      <img
        className={this.props.size}
        src={PlaceholderLogo}
      />
    );
  }
}