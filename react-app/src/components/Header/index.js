import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Logo from 'components/Logo';
import styles from './index.module.scss';

export default class Header extends PureComponent {
  static propTypes = {
    /**
     * The element (an ActionIcon) that this element will show in the left.
     */
    left: PropTypes.element,

    /**
     * The element (an ActionIcon) that this element will show in the right.
     */
    right: PropTypes.element,
  };

  static defaultProps = {
    left: null,
    right: null,
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          {this.props.left}
        </div>
        <div className={styles.center}>
          <Logo size={Logo.SMALL} />
        </div>
        <div className={styles.right}>
          {this.props.right}
        </div>
      </div>
    );
  }
}
