import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default class TextArea extends React.PureComponent {
  static MAX_LENGTH = 240;

  static propTypes = {
    /**
     * The initial text that the element will have.
     */
    text: PropTypes.string.isRequired,
  };

  state = {
    currentText: this.props.text,
  }

  _setTextAreaRef = element => this._textArea = element;

  _handleChange = event => {
    const newText = event.target.value;

    if (newText.length <= TextArea.MAX_LENGTH) this.setState({ currentText: newText });
  }

  focus = () => this._textArea.focus();

  getText = () => this.state.currentText;

  render() {
    const charCount = this.state.currentText.length;
    const charCountLabel = `${charCount}/${TextArea.MAX_LENGTH}`;

    return (
      <div>
        <label className={styles.label}>
          What?
        </label>
        <textarea
          className={styles.textArea}
          value={this.state.currentText}
          onChange={this._handleChange}
          ref={this._setTextAreaRef}
        />
        <div className={styles.charCounter}>
          {charCountLabel}
        </div>
      </div>
    );
  }
}
