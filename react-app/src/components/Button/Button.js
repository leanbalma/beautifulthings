import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    /**
     * The label or element the button will show.
     */
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,

    /**
     * The function to call when this button is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Whether this button is disabled or not.
     */
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onClick: () => {},
    disabled: false,
  }

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
