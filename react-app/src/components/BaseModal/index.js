import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
const _classNames = classNames.bind(styles);

const BaseModal = props => {
  const {
    visible,
    leftModal,
    children,
  } = props;

  if (!visible) return null;

  const modalStyle = _classNames('modal', {
    floattingModal: !leftModal,
  });

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
   * Whether the modal is visible or not
   */
  visible: PropTypes.bool.isRequired,

  /**
   * Whether the modal is displayed on the left or if
   * is displayed as a floating modal (default behaviour)
   */
  leftModal: PropTypes.bool,

  /**
   * The element to use as the modal content
   */
  children: PropTypes.element.isRequired,
};

export default BaseModal;
