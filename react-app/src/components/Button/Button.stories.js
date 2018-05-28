import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

storiesOf('Button', module)
  .add('Text button', () => (
    <Button
      disabled={false}
      onClick={action('Button clicked')}
    >
      Text
    </Button>
  ))
  .add('Disabled text button', () => (
    <Button
      disabled={true}
      onClick={action('Button clicked')}
    >
      Text
    </Button>
  ))
