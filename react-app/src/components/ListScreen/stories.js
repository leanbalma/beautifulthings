import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DAILY } from 'notifications';

import ListScreen from './';

const mockEntries = [{
  date: '2018-01-01',
  text: 'First entry',
}, {
  date: '2018-01-02',
  text: 'Second entry',
}];

const username = 'Username';
const onAdd = action('Add clicked');
const onEdit = action('Edit clicked');
const onDelete = action('Delete clicked');
const scheduleNotifications = action('Schedule notifications');
const onSignOut = action('Sign out clicked');

const stories = storiesOf('ListScreen', module);

stories.add('ListScreen without entries', () => <ListScreen
  entries={[]}
  username={username}
  notifications={DAILY}
  onAdd={onAdd}
  onEdit={onEdit}
  onDelete={onDelete}
  scheduleNotifications={scheduleNotifications}
  onSignOut={onSignOut}
/>);

stories.add('ListScreen with mock entries', () => <ListScreen
  entries={mockEntries}
  username={username}
  notifications={DAILY}
  onAdd={onAdd}
  onEdit={onEdit}
  onDelete={onDelete}
  scheduleNotifications={scheduleNotifications}
  onSignOut={onSignOut}
/>);
