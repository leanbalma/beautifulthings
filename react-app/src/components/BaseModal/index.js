import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const BaseModal = props => {
  const {
    visible,
    leftModal,
    children,
  } = props;

  if (!visible) return null;

  const modalStyle = leftModal ? styles.leftModal : styles.floattingModal;
  return (
    <div className={styles.container}>
      <div className={modalStyle}>
        {children}
      </div>
    </div>
  );
};

BaseModal.propTypes = {
  /**
   * Whenever the modal is visible or not
   */
  visible: PropTypes.bool.isRequired,

  /**
   * Whenever the modal is displayed on the left or if
   * is displayed as a floating modal (default behaviour)
   */
  leftModal: PropTypes.bool,

  /**
   * The element to use as the modal content
   */
  children: PropTypes.element.isRequired,
};

export default BaseModal;
