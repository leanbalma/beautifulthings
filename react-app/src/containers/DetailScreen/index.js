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
  };

  render() {
    const header = (
      <Header
        left={<ActionIcon icon={ActionIcon.BACK} />}
        right={<ActionIcon icon={ActionIcon.REMOVE} />}
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
      <BaseScreen
        header={header}
        main={main}
        footer={footer}
      />
    );
  }
}
