import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { signUpAsync } from 'actions/account';

import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { showAlertModal } from 'utils/alertModal';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';
import SignUpScreen from 'components/SignUpScreen';

class SignUpScreenContainer extends React.PureComponent {
  state = {
    signedUpModalVisible: false,
  };

  componentDidMount() {
    document.addEventListener("backbutton", this._onSignIn);
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._onSignIn);
  }

  _signUp = async (username, password) => {
    try {
      showLoadingModal("Signing up");
      const signedUp = await signUpAsync(username, password);

      if (signedUp) this.setState({ signedUpModalVisible: true });
      else showAlertModal("There was an error creating your account. Try again later, or try with a different username.");
    } catch (error) {
      showAlertModal("Cannot connect to the server");
    } finally {
      hideLoadingModal();
    }
  }

  _onSignIn = () => changeHash(SCREENS_HASHES.start);

  render() {
    const modalButton = (
      <Button onClick={this._onSignIn} small>
        <FormattedMessage id="Sign in" />
      </Button>
    );

    return (
      <div>
        <ButtonsModal
          visible={this.state.signedUpModalVisible}
          message="Successful registration!"
          primaryButton={modalButton}
        />
        <SignUpScreen
          onSignIn={this._onSignIn}
          onSignUp={this._signUp}
        />
      </div>
    );
  }
}

export default connect()(SignUpScreenContainer);
