import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
const _classNames = classNames.bind(styles);

const RadioButton = ({ label, selected, onClick }) => {
  const innerCircleStyle = _classNames('innerCircle', { selected });

  return (
    <label
      className={styles.container}
      onClick={onClick}
    >
      <div className={styles.radioBorder}>
        <div className={innerCircleStyle} />
      </div>
      <div>
        <FormattedMessage id={label} />
      </div>
    </label>
  );
}

RadioButton.propTypes = {
  /**
   * The label the element will show.
   */
  label: PropTypes.string.isRequired,

  /**
   * Whether the element is selected or not
   */
  selected: PropTypes.bool.isRequired,

  /**
   * The function to call when the element is clicked
   */
  onClick: PropTypes.func.isRequired,
};

export default RadioButton;
