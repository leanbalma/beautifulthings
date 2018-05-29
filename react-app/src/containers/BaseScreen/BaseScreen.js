import React, { Component } from 'react';

import './BaseScreen.css';

export default class BaseScreen extends Component {
  render() {
    return (
      <div className="BaseScreen">
        <div className="header">
          {this.props.header}
        </div>
        <div className="main">
          {this.props.main}
        </div>
        <div className="footer">
          {this.props.footer}
        </div>
      </div>
    );
  }
}
