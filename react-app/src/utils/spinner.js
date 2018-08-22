import React from 'react';
import ReactDOM from 'react-dom';

import LoadingModal from 'components/LoadingModal';

const spinnerNode = document.getElementById('spinner');

function showLoadingModal(message = 'Loading') {
  ReactDOM.render(<LoadingModal message={message} />, spinnerNode);
}

function hideLoadingModal() {
  ReactDOM.unmountComponentAtNode(spinnerNode);
}

export { showLoadingModal, hideLoadingModal }
