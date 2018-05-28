import React from 'react';
import { storiesOf } from '@storybook/react';

import Logo from './Logo';

storiesOf('Logo', module)
  .add('Logo big', () => (
    <Logo size="big" />
  ))
  .add('Logo small', () => (
    <Logo size="small"/>
  ))
