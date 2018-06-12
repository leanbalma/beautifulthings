import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header from './';
import ActionIcon from 'components/ActionIcon';

const stories = storiesOf('Header', module);

stories.add('Header with no side icons', () => (
  <Header />
));

stories.add('Header with left icon', () => {
  const leftIcon =
    <ActionIcon
      icon={ActionIcon.BACK}
      onClick={action('Left ActionIcon clicked')}
    />;

  return <Header left={leftIcon} />
});

stories.add('Header with left and right icons', () => {
  const leftIcon =
    <ActionIcon
      icon={ActionIcon.BACK}
      onClick={action('Left ActionIcon clicked')}
    />;

  const rightIcon =
    <ActionIcon
      icon={ActionIcon.REMOVE}
      onClick={action('Right ActionIcon clicked')}
    />;

  return <Header
    left={leftIcon}
    right={rightIcon}
  />
});
