import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, selectV2, text } from '@storybook/addon-knobs/react';

import ActionIcon from './';

const stories = storiesOf('ActionIcon', module);
stories.addDecorator(withKnobs);

const availableIcons = {
  back: ActionIcon.BACK,
  remove: ActionIcon.REMOVE,
  apply: ActionIcon.APPLY,
}

stories.add('ActionIcon with onClick prop', () => (
  <ActionIcon
    icon={selectV2('Icon', availableIcons, availableIcons.back)}
    color={text('Color', '')}
    onClick={action('ActionIcon clicked')}
  >
  </ActionIcon>
));

stories.add('ActionIcon without onClick prop', () => (
  <ActionIcon
    icon={selectV2('Icon', availableIcons, availableIcons.back)}
    color={text('Color', '')}
  >
  </ActionIcon>
));
