import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './';
import ActionIcon from 'components/ActionIcon';

const stories = storiesOf('Header', module);

stories.add('Header with no side icons', () => (
  <Header />
));

stories.add('Header with left icon', () => (
  <Header left={<ActionIcon icon={ActionIcon.BACK} color="gray" />} />
));

stories.add('Header with left and right icons', () => (
  <Header
    left={<ActionIcon icon={ActionIcon.BACK} color="gray" />}
    right={<ActionIcon icon={ActionIcon.APPLY} color="green" />}
  />
));
