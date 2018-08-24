import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';

import BaseModal from 'components/BaseModal';

import styles from './index.module.scss';

const LoadingModal = ({ message }) => {
  return (
    <BaseModal visible>
      <div className={styles.container}>
        <FontAwesomeIcon icon={faSpinner} pulse />
        <div>
          {message}
        </div>
      </div>
    </BaseModal>
  );
}

LoadingModal.propTypes = {
  /**
   * The message that the modal will show
   */
  message: PropTypes.string.isRequired,
};

export default LoadingModal;
