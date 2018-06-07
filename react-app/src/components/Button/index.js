import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Button extends PureComponent {
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

  static defaultProps = { disabled: false }

  _handleClick = event => (this.props.onClick) ? this.props.onClick(event) : null;

  render() {
    return (
      <button
        disabled={this.props.disabled}
        onClick={this._handleClick}
      >
        {this.props.children}
      </button>
    );
  }
}
