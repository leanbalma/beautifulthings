import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button
        disabled={this.props.disabled}
        onClick={event => this.props.onClick(event)}
      >
        {this.props.children}
      </button>
    );
  }
}
