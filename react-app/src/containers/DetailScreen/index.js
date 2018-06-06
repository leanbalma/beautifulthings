import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import BaseScreen from 'containers/BaseScreen';
import Header     from 'components/Header';
import ActionIcon from 'components/ActionIcon';
import Button     from 'components/Button';

export default class DetailScreen extends PureComponent {
  static propTypes = {
    /**
     * The entry date to show.
     */
    date: PropTypes.string.isRequired,

    /**
     * The entry text to show.
     */
    text: PropTypes.string.isRequired,

    /**
     * The function to call when back button is tapped
     */
    onBack: PropTypes.func.isRequired,

    /**
     * The function to call when remove button is tapped
     */
    onRemove: PropTypes.func.isRequired,

    /**
     * The function to call when edit button is tapped
     */
    onEdit: PropTypes.func.isRequired,
  };

  _handleBack = event => this.props.onBack(event);
  _handleRemove = event => this.props.onRemove(event);
  _handleEdit = event => this.props.onEdit(event);

  render() {
    const backIcon = (
      <ActionIcon
        icon={ActionIcon.BACK}
        onClick={this._handleBack}
      />);

    const removeIcon = (
      <ActionIcon
        icon={ActionIcon.REMOVE}
        onClick={this._handleRemove}
      />);

    const header = (
      <Header
        left={backIcon}
        right={removeIcon}
      />);

    const main = (
      <div>
        <div>
          {this.props.date}
        </div>
        <div>
          {this.props.text}
        </div>
      </div>
    );

    const footer = (<Button onClick={this._handleEdit}>Edit</Button>);

    return (
      <BaseScreen
        header={header}
        main={main}
        footer={footer}
      />
    );
  }
}
