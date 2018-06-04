import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2 } from '@storybook/addon-knobs/react';

import Logo from './';

const stories = storiesOf('Logo', module);
stories.addDecorator(withKnobs);

const availableSizes = {
  small: Logo.SMALL,
  big: Logo.BIG,
}

stories.add('Logo', () => (
  <Logo size={selectV2('Size', availableSizes, availableSizes.small)} />
));
