import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signInAsync } from 'actions/account';

import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { showAlertModal } from 'utils/alertModal';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import StartScreen from 'components/StartScreen';

class StartScreenContainer extends React.PureComponent {
  static propTypes = {
    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func.isRequired,
  }

  _closeApp = () => navigator.app.exitApp();

  componentDidMount() {
    document.addEventListener("backbutton", this._closeApp);
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._closeApp);
  }

  _signIn = async (username, password) => {
    try {
      showLoadingModal("Signing in");
      const signedIn = await signInAsync(username, password)(this.props.dispatch);

      if (signedIn) changeHash(SCREENS_HASHES.list);
      else showAlertModal("Wrong username or password");
    } catch (error) {
      showAlertModal("Cannot connect to the server");
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
