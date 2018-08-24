import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import LoadingModal from './';

const stories = storiesOf('LoadingModal', module);
stories.addDecorator(withKnobs);

stories.add('LoadingModal', () => <LoadingModal message={text('Message', 'Loading...')} />);
