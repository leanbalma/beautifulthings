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
    content: PropTypes.element.isRequired
  };

  _getModal = () => {
    return (
      <div>
        <div className={styles.opacityLayer} />
        <div className={styles.modal}>
          {this.props.content}
        </div>
      </div>
    )
  }

  render() {
    const modal = (this.props.visible) ? this._getModal() : null;

    return (
      <div>
        {modal}
      </div>
    );
  }
}
