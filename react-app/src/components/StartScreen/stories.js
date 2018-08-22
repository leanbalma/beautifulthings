import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StartScreen from './';

const stories = storiesOf('StartScreen', module);

stories.add('StartScreen', () => <StartScreen
  onSignIn={action('Sign in clicked')}
  onSignUp={action('Sign up clicked')}
/>);
