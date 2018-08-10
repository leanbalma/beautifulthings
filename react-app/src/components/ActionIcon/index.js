import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
const _classNames = classNames.bind(styles);

const ActionIcon = ({ icon, onClick }) => {
  const style = _classNames('container', icon);

  return (
    <div
      className={style}
      onClick={onClick}
    />
  );
}

ActionIcon.BACK = 'back';
ActionIcon.APPLY = 'apply';
ActionIcon.EXPAND = 'expand';
ActionIcon.COLLAPSE = 'collapse';
ActionIcon.SETTINGS = 'settings';
ActionIcon.HIDE = 'hide';

ActionIcon.propTypes = {
  /**
   * The icon that the element will show.
   */
  icon: PropTypes.oneOf([
    ActionIcon.BACK,
    ActionIcon.APPLY,
    ActionIcon.EXPAND,
    ActionIcon.COLLAPSE,
    ActionIcon.SETTINGS,
    ActionIcon.HIDE,
  ]).isRequired,

  /**
   * The function to call when this element is clicked.
   */
  onClick: PropTypes.func.isRequired,
};

export default ActionIcon;
