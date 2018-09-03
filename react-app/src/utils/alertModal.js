import React from 'react';
import ReactDOM from 'react-dom';

import LocaleHOC from 'locale/LocaleHOC';

import AlertModal from 'components/AlertModal';

const alertNode = document.getElementById("alert");

function _hideAlertModal() {
  ReactDOM.unmountComponentAtNode(alertNode);
}

function showAlertModal(message = "Error") {
  ReactDOM.render(LocaleHOC(
    <AlertModal
      message={message}
      onClose={_hideAlertModal}
    />
  ), alertNode);
}

export { showAlertModal }
