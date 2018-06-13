import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import BaseModal from 'components/BaseModal';

import styles from './index.module.scss';

export default class ButtonsModal extends PureComponent {
  static propTypes = {
    /**
     * Whenever the modal is visible or not
     */
    visible: PropTypes.bool.isRequired,

    /**
     * The message that the modal will show
     */
    message: PropTypes.string.isRequired,

    /**
     * The primary button (a Button) that the element will show
     */
    primaryButton: PropTypes.element.isRequired,

    /**
     * The (optional) secondary button (a Button) that the element will show
     */
    secondaryButton: PropTypes.element,
  };

  static defaultProps = { secondaryButton: null }

  render() {
    const content = (
      <div className={styles.container}>
        <div>
          {this.props.message}
        </div>
        <div className={styles.buttonsContainer}>
          {this.props.secondaryButton}
          {this.props.primaryButton}
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
