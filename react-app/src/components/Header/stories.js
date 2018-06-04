import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header from './';
import ActionIcon from 'components/ActionIcon';

storiesOf('Header', module)
  .add('Header with no side icons', () => (
    <Header />
  ))
  .add('Header with left icon', () => (
    <Header
      left={<ActionIcon icon="back" />}
    />))
  .add('Header with left and right icons', () => (
    <Header
      left={<ActionIcon icon="back" />}
      right={<ActionIcon icon="apply" />}
    />))
