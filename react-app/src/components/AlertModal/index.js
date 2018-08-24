import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from 'components/BaseModal';
import Button from 'components/Button';

import styles from './index.module.scss';

const AlertModal = ({ children, onClose }) => {
  return (
    <BaseModal visible>
      <div className={styles.container}>
        {children}
        <Button onClick={onClose} small>
          Close
        </Button>
      </div>
    </BaseModal>
  );
}

AlertModal.propTypes = {
  /**
   * The message/element that the modal will show
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,

  /**
   * The function to call when the close button is tapped
   */
  onClose: PropTypes.func.isRequired,
};

export default AlertModal;
