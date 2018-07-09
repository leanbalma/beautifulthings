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

  constructor(props) {
    super(props);

    this.state = { currentText: props.text }
  }

  _setTextAreaRef = element => this._textArea = element;

  _handleChange = event => {
    const newText = event.target.value;

    if (newText.length <= TextArea.MAX_LENGTH) this.setState({ currentText: newText });
  }

  focus = () => this._textArea.focus();

  getText = () => this.state.currentText;

  render() {
    const { currentText } = this.state;

    return (
      <div className={styles.container}>
        <label className={styles.label}>What?</label>
        <textarea
          value={currentText}
          onChange={this._handleChange}
          ref={this._setTextAreaRef}
        />
        <span className={styles.charCounter}>
          {currentText.length}/{TextArea.MAX_LENGTH}
        </span>
      </div>
    );
  }
}
