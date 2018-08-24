import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editEntryAsync } from 'actions/entriesByDate';

import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';
import EditScreen from 'components/EditScreen';

class EditScreenContainer extends React.PureComponent {
  static propTypes = {
    /**
     * React Router match prop
     */
    match: PropTypes.shape({
      params: PropTypes.shape({
        date: PropTypes.string,
      })
    }).isRequired,

    /**
     * Key pair object that contains the text of each entry by date
     */
    entriesByDate: PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,

    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._initialDate = props.match.params.date;
    this._initialText = props.entriesByDate[this._initialDate] || "";

    this.state = {
      discardChangesModalVisible: false,
    }
  }

  _toggleDiscardCangesModalVisibility = () => {
    this.setState({ discardChangesModalVisible: !this.state.discardChangesModalVisible });
  }

  _goBack = () => changeHash(SCREENS_HASHES.list);

  _onBack = (date, text) => {
    if (date === this._initialDate && text === this._initialText) this._goBack();
    else this._toggleDiscardCangesModalVisibility();
  }

  _onSave = async (date, text) => {
    if (!text) {
      // TODO: Show an alert
      return;
    }

    try {
      showLoadingModal('Saving...');
      const edited = await editEntryAsync(date, text)(this.props.dispatch);

      if (edited) this._goBack();
      else { /** TODO: Show an alert */ }
    } catch (error) {
      /** TODO: Show an alert */
    } finally {
      hideLoadingModal();
    }
  }

  render() {
    const discardChangesBtn = <Button onClick={this._goBack} small>Yes</Button>;
    const avoidDiscardChangesBtn = <Button onClick={this._toggleDiscardCangesModalVisibility} small>No</Button>;

    return (
      <div>
        <ButtonsModal
          visible={this.state.discardChangesModalVisible}
          message="Discard changes?"
          primaryButton={discardChangesBtn}
          secondaryButton={avoidDiscardChangesBtn}
        />
        <EditScreen
          date={this._initialDate}
          text={this._initialText}
          onBack={this._onBack}
          onSave={this._onSave}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entriesByDate: state.entriesByDate,
});

export default connect(mapStateToProps)(EditScreenContainer);
