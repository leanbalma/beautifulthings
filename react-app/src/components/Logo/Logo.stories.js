import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2 } from '@storybook/addon-knobs/react';

import Logo from './Logo';

const stories = storiesOf('Logo', module);
stories.addDecorator(withKnobs);

const availableSizes = {
  small: 'small',
  big: 'big',
}

const defaultSize = availableSizes.small;

stories.add('Logo', () => (
  <Logo size={selectV2('Size', availableSizes, defaultSize)} />
));
