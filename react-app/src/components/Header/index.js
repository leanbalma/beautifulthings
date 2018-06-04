import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Logo from 'components/Logo';
import './index.css';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="left">
          {this.props.left}
        </div>
        <div className="center">
          <Logo size="small" />
        </div>
        <div className="right">
          {this.props.right}
        </div>
      </div>
    );
  }
}
