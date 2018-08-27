import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signInAsync } from 'actions/account';

import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { showAlertModal } from 'utils/alertModal';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import StartScreen from 'components/StartScreen';

const StartScreenContainer = ({ dispatch }) => {
  const _signIn = async (username, password) => {
    try {
      showLoadingModal('Signing in...');
      const signedIn = await signInAsync(username, password)(dispatch);

      if (signedIn) changeHash(SCREENS_HASHES.list);
      else showAlertModal('Wrong username or password');
    } catch (error) {
      showAlertModal('Cannot connect to the server');
    } finally {
      hideLoadingModal();
    }
  }

  const _onSignUp = () => changeHash(SCREENS_HASHES.signUp);

  return <StartScreen
    onSignIn={_signIn}
    onSignUp={_onSignUp}
  />;
}

StartScreenContainer.propTypes = {
  /**
   * Redux dispatch function
   */
  dispatch: PropTypes.func.isRequired,
}

export default connect()(StartScreenContainer);
