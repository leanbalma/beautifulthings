import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import ButtonsModal from './';
import Button from 'components/Button';

const stories = storiesOf('ButtonsModal', module);
stories.addDecorator(withKnobs);

stories.add('ButtonsModal with unique button', () => {
  const primaryButton =
    <Button onClick={action('Unique button clicked')}>
      Unique button
    </Button>;

  return <ButtonsModal
    visible={boolean('Visible?', true, '')}
    message={text('Message', 'This is the message that will be shown')}
    primaryButton={primaryButton}
  />
});

stories.add('ButtonsModal with secondary button', () => {
  const primaryButton =
    <Button onClick={action('Primary button clicked')}>
      Primary button
    </Button>;

  const secondaryButton =
    <Button onClick={action('Secondary button clicked')}>
      Secondary button
    </Button>;

  return <ButtonsModal
    visible={boolean('Visible?', true, '')}
    message={text('Message', 'This is the message that will be shown')}
    primaryButton={primaryButton}
    secondaryButton={secondaryButton}
  />
});
