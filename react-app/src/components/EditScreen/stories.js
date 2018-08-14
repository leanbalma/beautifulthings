import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EditScreen from './';

const stories = storiesOf('EditScreen', module);

stories.add('EditScreen', () => <EditScreen
  date={'2018-01-01'}
  text={'Example text'}
  onBack={action('Back pressed')}
  onSave={action('Save pressed')}
/>);
