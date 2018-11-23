import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { scheduleNotifications, signOut } from 'actions/account';
import { retrieveEntriesAsync, deleteEntryAsync } from 'actions/entriesByDate';

import { setNotifications } from 'notifications';

import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { showAlertModal } from 'utils/alertModal';
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

  _closeApp = () => navigator.app.exitApp();

  async componentDidMount() {
    document.addEventListener("backbutton", this._closeApp);

    if (!this.props.entries.length) {
      try {
        showLoadingModal("Loading");
        const currentDate = getCurrentDateString();
        await retrieveEntriesAsync(currentDate)(this.props.dispatch);
      } catch (error) {
        showAlertModal("Session expired, please login");
        this.props.dispatch(signOut());
        changeHash(SCREENS_HASHES.start);
      } finally {
        hideLoadingModal();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._closeApp);
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
      showLoadingModal("Deleting");
      const deleted = await deleteEntryAsync(this.state.dateOfEntryToDelete)(this.props.dispatch);

      if (!deleted) showAlertModal("Cannot delete entry");
    } catch (error) {
      showAlertModal("Cannot connect to the server");
    } finally {
      hideLoadingModal();
      this._unsetDateOfEntryToDelete();
    }
  }

  _scheduleNotifications = notifications => {
    setNotifications(notifications);
    this.props.dispatch(scheduleNotifications(notifications));
  }

  _onSignOut = () => {
    this.props.dispatch(signOut());
    changeHash(SCREENS_HASHES.start);
  }

  render() {
    const { entries, entriesByDate, username, notifications } = this.props;
    const entriesList = entries.map(date => createEntry(date, entriesByDate[date]));

    const deleteButton = (
      <Button onClick={this._deleteEntry} small>
        <FormattedMessage id="Yes" />
      </Button>);

    const doNotDeleteButton = (
      <Button onClick={this._unsetDateOfEntryToDelete} small>
        <FormattedMessage id="No" />
      </Button>
    );

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
