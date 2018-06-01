import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlaceholderLogo from './PlaceholderLogo.svg';
import './Logo.css';

const SMALL = 'small';
const BIG = 'big';

export default class Logo extends Component {
  static propTypes = {
    /**
     * The size for the logo. Possible values: 'small' or 'big'
     */
    size: PropTypes.oneOf([SMALL, BIG]).isRequired,
  };

  render() {
    return (
      <img
        className={this.props.size}
        src={PlaceholderLogo}
        alt=""
      />
    );
  }
}
