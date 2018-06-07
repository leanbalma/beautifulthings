import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import InputText from './';

const stories = storiesOf('InputText', module);
stories.addDecorator(withKnobs);

stories.add('Input type text', () => (
  <InputText
    type={InputText.TEXT}
    label={text('Label', 'Username')}
    placeholder={text('Placeholder', 'Username')}
    onEnter={action('enter pressed')}
    onChange={action('input change')}
  />
));

stories.add('Input type password', () => (
  <InputText
    type={InputText.PASSWORD}
    label="Password"
    placeholder={text('Placeholder', 'Password')}
    onEnter={action('enter pressed')}
    onChange={action('input change')}
  />
));
