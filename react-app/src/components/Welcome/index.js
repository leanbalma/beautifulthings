import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './index.module.scss';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <FormattedMessage id={"What’s your beautiful thing today?"} />
    </div>
  );
}

export default Welcome;
