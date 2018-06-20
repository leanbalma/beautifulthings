import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PlaceholderLogo from './PlaceholderLogo.svg';
import styles from './index.module.scss';

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
        className={(this.props.size === Logo.SMALL) ? styles.small : styles.big}
        src={PlaceholderLogo}
        alt=""
      />
    );
  }
}