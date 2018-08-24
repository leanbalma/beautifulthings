import React from 'react';
import ReactDOM from 'react-dom';

import AlertModal from 'components/AlertModal';

const alertNode = document.getElementById("alert");

function _hideAlertModal() {
  ReactDOM.unmountComponentAtNode(alertNode);
}

function showAlertModal(message = "Error") {
  ReactDOM.render((
    <AlertModal onClose={_hideAlertModal}>
      {message}
    </AlertModal>
  ), alertNode);
}

export { showAlertModal }
