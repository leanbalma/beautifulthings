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
    icon: PropTypes.oneOf([ActionIcon.BACK, ActionIcon.REMOVE, ActionIcon.APPLY]).isRequired,

    /**
     * The color that the icon will have.
     */
    color: PropTypes.string,

    /**
     * The function to call when this element is clicked.
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    color: '',
    onClick: () => {},
  }

  _getIcon = () => {
    switch (this.props.icon) {
      case ActionIcon.BACK:
        return faChevronLeft
      case ActionIcon.REMOVE:
        return faTrashAlt
      case ActionIcon.APPLY:
        return faCheck
    }
  }

  render() {
    const icon = this._getIcon();

    return (
      <FontAwesomeIcon
        icon={icon}
        color={(this.props.color !== '') ? this.props.color : null}
        onClick={event => this.props.onClick(event)}
      />
    );
  }
}
