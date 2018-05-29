import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ActionIcon from './ActionIcon';

storiesOf('ActionIcon', module)
  .add('ActionIcon back', () => (
    <ActionIcon
      icon="back"
      onClick={action('ActionIcon clicked')}
    />))
  .add('ActionIcon remove red', () => (
    <ActionIcon
      icon="remove"
      color="#f33"
      onClick={action('ActionIcon clicked')}
    />))
  .add('ActionIcon save', () => (
    <ActionIcon
      icon="apply"
      onClick={action('ActionIcon clicked')}
    />))
