import React from 'react';
import PropTypes from 'prop-types';

import ActionIcon from 'components/ActionIcon';
import BaseScreen from 'components/BaseScreen';
import Button from 'components/Button';
import DatePicker from 'components/DatePicker';
import Header from 'components/Header';
import TextArea from 'components/TextArea';

import styles from './index.module.scss';

const EditScreen = ({ date, text, onBack, onSave }) => {
  let _datePicker = null, _textArea = null;
  const _setDatePickerRef = element => _datePicker = element;
  const _setTextAreaRef = element => _textArea = element;

  const _handleBack = () => {
    const date = _datePicker.getDate();
    const text = _textArea.getText();

    onBack(date, text);
  }

  const _handleSave = () => {
    const date = _datePicker.getDate();
    const text = _textArea.getText();

    onSave(date, text);
  }

  function _renderHeader() {
    const backIcon = <ActionIcon
      icon={ActionIcon.BACK}
      onClick={_handleBack}
    />;

    const applyIcon = <ActionIcon
      icon={ActionIcon.APPLY}
      onClick={_handleSave}
    />;

    return (
      <div className={styles.headerBackground}>
        <Header
          left={backIcon}
          right={applyIcon}
          whiteLogo
        />
      </div>
    );
  }

  function _renderMain() {
    const datePicker = <DatePicker
      date={date}
      ref={_setDatePickerRef}
    />;

    const textArea = <TextArea
      text={text}
      ref={_setTextAreaRef}
    />;

    const applyButton = (
      <Button onClick={_handleSave}>
        <div className={styles.applyButton} />
      </Button>
    );

    return (
      <div className={styles.main}>
        <div>
          {datePicker}
        </div>
        <div>
          {textArea}
        </div>
        <div className={styles.buttonContainer}>
          {applyButton}
        </div>
      </div>
    );
  }

  const header = _renderHeader();
  const main = _renderMain();

  return <BaseScreen
    header={header}
    main={main}
  />
}

EditScreen.propTypes = {
  /**
   * The date to show
   */
  date: PropTypes.string.isRequired,

  /**
   * The text to show
   */
  text: PropTypes.string.isRequired,

  /**
   * The function to call when back button is tapped
   */
  onBack: PropTypes.func.isRequired,

  /**
   * The function to call when save button is tapped
   */
  onSave: PropTypes.func.isRequired,
};

export default EditScreen;
