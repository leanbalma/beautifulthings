import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signInAsync } from 'actions/account';

import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import StartScreen from 'components/StartScreen';

class StartScreenContainer extends React.PureComponent {
  static propTypes = {
    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func.isRequired,
  }

  _signIn = async (username, password) => {
    try {
      showLoadingModal('Signing in...');
      const signedIn = await signInAsync(username, password)(this.props.dispatch);

      if (signedIn) changeHash(SCREENS_HASHES.list);
      else { /** TODO: Alert: Wrong username or password */ }
    } catch (error) {
      /** TODO: Alert: Cannot connect to server */
    } finally {
      hideLoadingModal();
    }
  }

  _onSignUp = () => changeHash(SCREENS_HASHES.signUp);

  render() {
    return <StartScreen
      onSignIn={this._signIn}
      onSignUp={this._onSignUp}
    />;
  }
}

export default connect()(StartScreenContainer);
