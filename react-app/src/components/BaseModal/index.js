import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default class BaseModal extends PureComponent {
  static propTypes = {
    /**
     * Whenever the modal is visible or not
     */
    visible: PropTypes.bool.isRequired,

    /**
     * The element to use as the modal content
     */
    children: PropTypes.element.isRequired
  };

  render() {
    if (!this.props.visible) return null;

    return (
      <div>
        <div className={styles.opacityLayer} />
        <div className={styles.modal}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
