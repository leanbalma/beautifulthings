import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import LocaleHOC from 'locale/LocaleHOC';

import { initSavedAccountAsync } from 'actions/account';

import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import EditScreenContainer from 'containers/EditScreenContainer';
import ListScreenContainer from 'containers/ListScreenContainer';
import SignUpScreenContainer from 'containers/SignUpScreenContainer';
import StartScreenContainer from 'containers/StartScreenContainer';

const SCREENS_HASHES = {
  start: '/',
  signUp: '/signup',
  list: '/list',
  edit: date => `/edit/${date}`,
}

function changeHash(hash) {
  window.location.hash = hash;
}

class AppRouter extends React.PureComponent {
  static propTypes = {
    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    try {
      showLoadingModal('Loading');
      const savedAccountInited = await this.props.dispatch(initSavedAccountAsync());
      if (savedAccountInited) changeHash(SCREENS_HASHES.list);
    } catch (error) {
      /** Nothing to be done here */
    } finally {
      hideLoadingModal();
    }
  }

  render() {
    return (
      LocaleHOC(
        <HashRouter>
          <div>
            <Route exact path={SCREENS_HASHES.start} component={StartScreenContainer} />
            <Route exact path={SCREENS_HASHES.signUp} component={SignUpScreenContainer} />
            <Route exact path={SCREENS_HASHES.list} component={ListScreenContainer} />
            <Route exact path={SCREENS_HASHES.edit(':date')} component={EditScreenContainer} />
          </div>
        </HashRouter>
      )
    );
  }
}

export { changeHash, SCREENS_HASHES }
export default connect()(AppRouter);
