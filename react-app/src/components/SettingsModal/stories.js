import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import { DAILY } from 'notifications';

import SettingsModal from './';

const _setModalRef = element => element.show(DAILY);

const stories = storiesOf('SettingsModal', module);
stories.addDecorator(withKnobs);

stories.add('SettingsModal', () => {
  return <SettingsModal
    username={text('Username', 'username')}
    onHide={action('Hide pressed')}
    onSignOut={action('SignOut pressed')}
    ref={_setModalRef}
  />
});
