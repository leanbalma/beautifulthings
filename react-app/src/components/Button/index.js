import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
const _classNames = classNames.bind(styles);

const Button = props => {
  const {
    children,
    onClick,
    disabled,
    small,
  } = props;

  const style = _classNames('container', {
    small,
    disabled,
  });

  const buttonStyle = _classNames('button', {
    small,
    normal: !small,
  });

  return (
    <div className={style}>
      <button
        className={buttonStyle}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  /**
   * The label or element the button will show.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,

  /**
   * The function to call when the button is clicked.
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Whether the button is disabled or not. Default value: false
   */
  disabled: PropTypes.bool,

  /**
   * Whether the button is a small one or not. Default value: false
   */
  small: PropTypes.bool,
};

export default Button;
