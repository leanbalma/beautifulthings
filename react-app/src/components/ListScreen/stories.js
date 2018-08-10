import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ListScreen from './';

const mockEntries = [{
  date: '2018-01-01',
  text: 'First entry',
}, {
  date: '2018-01-02',
  text: 'Second entry',
}];
const onAdd = action('Add clicked');
const onEdit = action('Edit clicked');
const onDelete = action('Delete clicked');

const stories = storiesOf('ListScreen', module);

stories.add('ListScreen without entries', () => <ListScreen
  entries={[]}
  onAdd={onAdd}
  onEdit={onEdit}
  onDelete={onDelete}
/>);

stories.add('ListScreen with mock entries', () => <ListScreen
  entries={mockEntries}
  onAdd={onAdd}
  onEdit={onEdit}
  onDelete={onDelete}
/>);
