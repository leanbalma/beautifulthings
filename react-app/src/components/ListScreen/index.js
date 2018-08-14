import React from 'react';
import PropTypes from 'prop-types';

import ActionIcon from 'components/ActionIcon';
import BaseScreen from 'components/BaseScreen';
import Button from 'components/Button';
import Header from 'components/Header';
import ListItem from 'components/ListItem';
import SettingsModal from 'components/SettingsModal';
import Welcome from 'components/Welcome';

import { DAILY, WEEKLY } from 'notifications';

import styles from './index.module.scss';

const ListScreen = ({ entries, username, notifications, onAdd, onEdit, onDelete, scheduleNotifications, onSignOut }) => {
  let _settingsModal = null;
  const _setSettingsModalRef = element => _settingsModal = element;

  const _handleSettingsClick = () => _settingsModal.show(notifications);

  function _renderHeader() {
    const settingsIcon = <ActionIcon
      icon={ActionIcon.SETTINGS}
      onClick={_handleSettingsClick}
    />;

    return (
      <div className={styles.headerBackground}>
        <Header left={settingsIcon} />
      </div>
    );
  }

  function _renderMain() {
    if (!entries.length) return <Welcome />;

    const list = entries.map((entry, index) => (
      <div
        className={styles.listItem}
        key={index}
      >
        <ListItem
          date={entry.date}
          text={entry.text}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    ));

    return (
      <div className={styles.listContainer}>
        {list}
      </div>
    );
  }

  const header = _renderHeader();
  const main = _renderMain();
  const footer = (
    <div className={styles.footer}>
      <Button onClick={onAdd} small>
        <div className={styles.buttonImage} />
      </Button>
    </div>
  );

  return (
    <div>
      <SettingsModal
        username={username}
        onHide={scheduleNotifications}
        onSignOut={onSignOut}
        ref={_setSettingsModalRef}
      />
      <BaseScreen
        header={header}
        main={main}
        footer={footer}
      />
    </div>
  );
}

ListScreen.propTypes = {
  /**
   * The set of entries to draw in the list
   */
  entries: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,

  /**
   * The name of the user
   */
  username: PropTypes.string.isRequired,

  /**
   * The notifications schedule
   */
  notifications: PropTypes.oneOf([
    DAILY,
    WEEKLY,
  ]).isRequired,

  /**
   * The function to call when add button is tapped
   */
  onAdd: PropTypes.func.isRequired,

  /**
   * The function to call when edit button is tapped over an entry
   */
  onEdit: PropTypes.func.isRequired,

  /**
   * The function to call when delete button is tapped over an entry
   */
  onDelete: PropTypes.func.isRequired,

  /**
   * The function to call to schedule notifications
   */
  scheduleNotifications: PropTypes.func.isRequired,

  /**
   * The function to call when sign out button is tapped
   */
  onSignOut: PropTypes.func.isRequired,
};

export default ListScreen;
