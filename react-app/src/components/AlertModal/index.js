import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import BaseModal from 'components/BaseModal';
import Button from 'components/Button';

import styles from './index.module.scss';

const AlertModal = ({ message, onClose }) => {
  return (
    <BaseModal visible>
      <div className={styles.container}>
        <FormattedMessage id={message} />
        <Button onClick={onClose} small>
          <FormattedMessage id="Close" />
        </Button>
      </div>
    </BaseModal>
  );
}

AlertModal.propTypes = {
  /**
   * The message that the modal will show
   */
  message: PropTypes.string.isRequired,

  /**
   * The function to call when the close button is tapped
   */
  onClose: PropTypes.func.isRequired,
};

export default AlertModal;
