import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrashAlt, faCheck } from '@fortawesome/fontawesome-free-solid';

const ACTION_ICON_DEFAULT_COLOR = '#aaaaaa';

export default class ActionIcon extends Component {
  render() {
    let icon;
    switch (this.props.icon) {
      case 'back':
        icon=faChevronLeft
      break;
      case 'remove':
        icon=faTrashAlt
      break;
      case 'apply':
        icon=faCheck
      break;
      default:
        // TODO: TBD
      break;
    }

    return (
      <div>
        <FontAwesomeIcon
          icon={icon}
          color={this.props.color || ACTION_ICON_DEFAULT_COLOR}
          onClick={event => this.props.onClick(event) || null}
        />
      </div>
    );
  }
}
