import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrashAlt, faCheck } from '@fortawesome/fontawesome-free-solid';

export default class ActionIcon extends PureComponent {
  static BACK = 'back';
  static REMOVE = 'remove';
  static APPLY = 'apply';

  static propTypes = {
    /**
     * The icon that this element will show.
     */
    icon: PropTypes.oneOf([
      ActionIcon.BACK,
      ActionIcon.REMOVE,
      ActionIcon.APPLY
    ]).isRequired,

    /**
     * The function to call when this element is clicked.
     */
    onClick: PropTypes.func.isRequired,
  };

  _handleClick = event => this.props.onClick(event);

  _getIcon = () => {
    switch (this.props.icon) {
      case ActionIcon.BACK:
        return faChevronLeft;
      case ActionIcon.REMOVE:
        return faTrashAlt;
      case ActionIcon.APPLY:
        return faCheck;
      default:
        return null;
    }
  }

  render() {
    const icon = this._getIcon();

    return (
      <FontAwesomeIcon
        icon={icon}
        onClick={this._handleClick}
      />
    );
  }
}
