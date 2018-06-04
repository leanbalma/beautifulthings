import React, { Component } from 'react';

import BaseScreen from 'containers/BaseScreen';
import Header     from 'components/Header';
import ActionIcon from 'components/ActionIcon';
import Button     from 'components/Button';

export default class DetailScreen extends Component {
  render() {
    const header = (
      <Header
        left={<ActionIcon icon="back" />}
        right={<ActionIcon icon="remove" />}
      />
    );

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

    const footer = (<Button>Edit</Button>);

    return (
      <div>
        <BaseScreen
          header={header}
          main={main}
          footer={footer}
        />
      </div>
    );
  }
}
