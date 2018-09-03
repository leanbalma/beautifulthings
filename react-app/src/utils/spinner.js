import React from 'react';
import ReactDOM from 'react-dom';

import LocaleHOC from 'locale/LocaleHOC';

import LoadingModal from 'components/LoadingModal';

const spinnerNode = document.getElementById('spinner');

function showLoadingModal(message = 'Loading') {
  ReactDOM.render(LocaleHOC(<LoadingModal message={message} />), spinnerNode);
}

function hideLoadingModal() {
  ReactDOM.unmountComponentAtNode(spinnerNode);
}

export { showLoadingModal, hideLoadingModal }
