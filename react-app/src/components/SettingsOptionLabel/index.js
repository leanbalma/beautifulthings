import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
const _classNames = classNames.bind(styles);

const SettingsOptionLabel = ({ icon, text, onClick }) => {
  const _handleClick = () => (onClick) ? onClick() : null;

  const iconStyle = _classNames('icon', icon);

  return (
    <div
      className={styles.container}
      onClick={_handleClick}
    >
      <div className={iconStyle} />
      <div>
        <FormattedMessage id={text} />
      </div>
    </div>
  );
}

SettingsOptionLabel.NOTIFICATION = 'notifications';
SettingsOptionLabel.SIGNOUT = 'signOut';

SettingsOptionLabel.propTypes = {
  /**
   * The icon to display next to the label text
   */
  icon: PropTypes.oneOf([
    SettingsOptionLabel.NOTIFICATION,
    SettingsOptionLabel.SIGNOUT,
  ]).isRequired,

  /**
   * The text of the label
   */
  text: PropTypes.string.isRequired,

  /**
   * An optional function to call when element is tapped
   */
  onClick: PropTypes.func,
};

export default SettingsOptionLabel;
