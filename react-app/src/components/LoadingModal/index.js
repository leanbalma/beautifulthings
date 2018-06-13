import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';

import BaseModal from 'components/BaseModal';

import styles from './index.module.scss';

export default class LoadingModal extends PureComponent {
  static propTypes = {
    /**
     * Whenever the modal is visible or not
     */
    visible: PropTypes.bool.isRequired,

    /**
     * The message that the modal will show
     */
    message: PropTypes.string.isRequired,
  };

  render() {
    const content = (
      <div className={styles.container}>
        <FontAwesomeIcon icon={faSpinner} pulse />
        <div>
          {this.props.message}
        </div>
      </div>
    );

    return (
      <BaseModal
        visible={this.props.visible}
        content={content}
      />
    );
  }
}
