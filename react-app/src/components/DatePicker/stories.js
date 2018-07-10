import React from 'react';
import { storiesOf } from '@storybook/react';

import DatePicker from './';

const stories = storiesOf('DatePicker', module);

stories.add('DatePicker', () => <DatePicker date="2018-01-01" />);
