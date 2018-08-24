import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { scheduleNotifications, signOut } from 'actions/account';
import { retrieveEntriesAsync, deleteEntryAsync } from 'actions/entriesByDate';

import { changeHash, SCREENS_HASHES } from 'AppRouter';

import { getCurrentDateString } from 'utils/date';
import { createEntry } from 'utils/entry';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';
import ListScreen from 'components/ListScreen';

class ListScreenContainer extends React.PureComponent {
  static propTypes = {
    /**
     * Array of all entries ids (dates) sort dec
     */
    entries: PropTypes.array.isRequired,

    /**
     * Key pair object that contains the text of each entry date
     */
    entriesByDate: PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,

    /**
     * The username of the user
     */
    username: PropTypes.string.isRequired,

    /**
     * The notifications schedule in use
     */
    notifications: PropTypes.number.isRequired,

    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    dateOfEntryToDelete: null,
  }

  async componentDidMount() {
    if (!this.props.entries.length) {
      try {
        showLoadingModal('Loading');
        const currentDate = getCurrentDateString();
        await retrieveEntriesAsync('2018-01-01', currentDate)(this.props.dispatch);
      } catch (error) {
        /** TODO: Show an alert */
      } finally {
        hideLoadingModal();
      }
    }
  }

  _onAdd = () => {
    const currentDate = getCurrentDateString();

    changeHash(SCREENS_HASHES.edit(currentDate));
  }

  _onEdit = date => changeHash(SCREENS_HASHES.edit(date));

  _setDateOfEntryToDelete = date => this.setState({ dateOfEntryToDelete: date });
  _unsetDateOfEntryToDelete = () => this.setState({ dateOfEntryToDelete: null });

  _deleteEntry = async () => {
    try {
      showLoadingModal('Deleting');
      const deleted = await deleteEntryAsync(this.state.dateOfEntryToDelete)(this.props.dispatch);

      if (!deleted) { /** TODO: Show an alert */ }
    } catch (error) {
      /** TODO: Show an alert */
    } finally {
      hideLoadingModal();
      this._unsetDateOfEntryToDelete();
    }
  }

  _scheduleNotifications = notifications => {
    // TODO: Schedule notifications
    this.props.dispatch(scheduleNotifications(notifications));
  }

  _onSignOut = () => {
    // TODO: cancel notifications
    this.props.dispatch(signOut());
    changeHash(SCREENS_HASHES.start);
  }

  render() {
    const { entries, entriesByDate, username, notifications } = this.props;
    const entriesList = entries.map(date => createEntry(date, entriesByDate[date]));

    const deleteButton = <Button onClick={this._deleteEntry} small>Yes</Button>;
    const doNotDeleteButton = <Button onClick={this._unsetDateOfEntryToDelete} small>No</Button>;

    return (
      <div>
        <ButtonsModal
          visible={Boolean(this.state.dateOfEntryToDelete)}
          message="Are you sure you want to delete this entry?"
          primaryButton={deleteButton}
          secondaryButton={doNotDeleteButton}
        />
        <ListScreen
          entries={entriesList}
          username={username}
          notifications={notifications}
          onAdd={this._onAdd}
          onEdit={this._onEdit}
          onDelete={this._setDateOfEntryToDelete}
          scheduleNotifications={this._scheduleNotifications}
          onSignOut={this._onSignOut}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entries,
  entriesByDate: state.entriesByDate,
  username: state.account.username,
  notifications: state.account.notifications,
});

export default connect(mapStateToProps)(ListScreenContainer);
