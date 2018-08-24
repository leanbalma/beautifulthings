import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SignUpScreen from './';

const stories = storiesOf('SignUpScreen', module);

stories.add('SignUpScreen', () => <SignUpScreen
  onSignUp={action('Sign up clicked')}
  onSignIn={action('Sign in clicked')}
/>);
