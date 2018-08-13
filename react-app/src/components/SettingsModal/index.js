import React from 'react';
import PropTypes from 'prop-types';

import ActionIcon from 'components/ActionIcon';
import BaseModal from 'components/BaseModal';
import Logo from 'components/Logo';
import RadioButton from 'components/RadioButton';
import SettingsOptionLabel from 'components/SettingsOptionLabel';

import { DAILY, WEEKLY } from 'notifications';

import styles from './index.module.scss';

export default class SettingsModal extends React.PureComponent {
  static propTypes = {
    /**
     * The username to display
     */
    username: PropTypes.string.isRequired,

    /**
     * The function to call when hide icon is tapped. The notifications schedule
     * will be passed as a param
     */
    onHide: PropTypes.func.isRequired,

    /**
     * The function to call when logout option is tapped
     */
    onSignOut: PropTypes.func.isRequired,
  }

  state = {
    visible: false,
    notifications: DAILY,
  };

  _setDailyNotifications = () => this.setState({ notifications: DAILY });
  _setWeeklyNotifications = () => this.setState({ notifications: WEEKLY });

  _handleHide = () => {
    this.setState({ visible: false });
    this.props.onHide(this.state.notifications);
  }

  _renderHeader() {
    return (
      <div className={styles.headerContainer}>
        <div className={styles.hideIcon}>
          <ActionIcon
            icon={ActionIcon.HIDE}
            onClick={this._handleHide}
          />
        </div>
        <div className={styles.usernameContainer}>
          <div className={styles.calendarIcon} />
          <div className={styles.username}>
            {this.props.username}
          </div>
        </div>
      </div>
    );
  }

  _renderMain() {
    const { notifications } = this.state;

    const notificationsLabel = <SettingsOptionLabel
      icon={SettingsOptionLabel.NOTIFICATION}
      text="Notifications"
    />

    const signOutLabel = <SettingsOptionLabel
      icon={SettingsOptionLabel.SIGNOUT}
      text="Sign out"
      onClick={this.props.onSignOut}
    />

    const radioButtonDaily = <RadioButton
      label="Daily"
      selected={notifications === DAILY}
      onClick={this._setDailyNotifications}
    />

    const radioButtonWeekly = <RadioButton
      label="Weekly"
      selected={notifications === WEEKLY}
      onClick={this._setWeeklyNotifications}
    />

    return (
      <div>
        <div>
          {notificationsLabel}
        </div>
        <div className={styles.radioButtonsContainer}>
          <div>
            {radioButtonDaily}
          </div>
          <div>
            {radioButtonWeekly}
          </div>
        </div>
        <div>
          {signOutLabel}
        </div>
      </div>
    );
  }

  show(notifications) {
    this.setState({
      visible: true,
      notifications,
    });
  }

  render() {
    const header = this._renderHeader();
    const main = this._renderMain();

    return (
      <BaseModal
        visible={this.state.visible}
        onDismiss={this._handleHide}
        leftModal
      >
        <div className={styles.container}>
          <div className={styles.header}>
            {header}
          </div>
          <div className={styles.main}>
            {main}
          </div>
          <div className={styles.footer}>
            <Logo />
          </div>
        </div>
      </BaseModal>
    );
  }
}
