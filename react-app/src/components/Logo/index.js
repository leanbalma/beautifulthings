import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PlaceholderLogo from './PlaceholderLogo.svg';
import './index.css';

export default class Logo extends PureComponent {
  static SMALL = 'small';
  static BIG = 'big';

  static propTypes = {
    /**
     * The size for the logo. Possible values: 'small' or 'big'
     */
    size: PropTypes.oneOf([Logo.SMALL, Logo.BIG]).isRequired,
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
