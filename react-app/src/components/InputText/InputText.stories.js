import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputText from './InputText';

storiesOf('InputText', module)
  .add('Input type text', () => (
    <InputText
      type="text"
      name="username"
      label="Username: "
      placeholder="Username"
      onEnter={action('input change')}
    />))
  .add('Input type password', () => (
    <InputText
      type="password"
      name="password"
      label="Password: "
      placeholder="Password"
      onEnter={action('input change')}
    />))
