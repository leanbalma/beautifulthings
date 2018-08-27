import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';

import EditScreenContainer from 'containers/EditScreenContainer';
import ListScreenContainer from 'containers/ListScreenContainer';
import SignUpScreenContainer from 'containers/SignUpScreenContainer';
import StartScreenContainer from 'containers/StartScreenContainer';

import en from "locale/en.json";
import es from "locale/es.json";

addLocaleData([
  ...locale_en,
  ...locale_es,
]);

const locale = {
  en,
  es,
};

const language = navigator.language.split(/[-_]/)[0];

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
  render() {
    return (
      <IntlProvider locale={language} messages={locale[language]}>
        <HashRouter>
          <div>
            <Route exact path={SCREENS_HASHES.start} component={StartScreenContainer} />
            <Route exact path={SCREENS_HASHES.signUp} component={SignUpScreenContainer} />
            <Route exact path={SCREENS_HASHES.list} component={ListScreenContainer} />
            <Route exact path={SCREENS_HASHES.edit(':date')} component={EditScreenContainer} />
          </div>
        </HashRouter>
      </IntlProvider>
    );
  }
}

export { changeHash, SCREENS_HASHES }
export default AppRouter;
