import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/react';

import SettingsOptionLabel from './';

const stories = storiesOf('SettingsOptionLabel', module);
stories.addDecorator(withKnobs);

const icons = {
  notifications: SettingsOptionLabel.NOTIFICATION,
  signOut: SettingsOptionLabel.SIGNOUT,
}

stories.add('SettingsOptionLabel without onClick function', () => {
  return <SettingsOptionLabel
    icon={selectV2('Icon', icons, icons.notifications)}
    text={text('Text', 'Notifications')}
  />
});

stories.add('SettingsOptionLabel with onClick function', () => {
  return <SettingsOptionLabel
    icon={selectV2('Icon', icons, icons.notifications)}
    text={text('Text', 'Notifications')}
    onClick={action('Label clicked')}
  />
});
