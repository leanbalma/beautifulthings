import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import AlertModal from './';

const stories = storiesOf('AlertModal', module);
stories.addDecorator(withKnobs);

stories.add('AlertModal', () => (
  <AlertModal onClose={action('Button clicked')}>
    {text('Message', 'Error')}
  </AlertModal>
));
