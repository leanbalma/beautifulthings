import React from 'react';
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';

import en from "./en";
import es from "./es";

addLocaleData([...locale_en, ...locale_es]);

const locale = { en, es };
const language = navigator.language.split(/[-_]/)[0];

const LocaleHOC = component => (
  <IntlProvider locale={language} messages={locale[language]}>
    {component}
  </IntlProvider>
);

export default LocaleHOC;
