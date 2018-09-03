import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { isDateStringValid, getCurrentDateString } from 'utils/date';

import styles from './index.module.scss';

export default class DatePicker extends React.PureComponent {
  static propTypes = {
    /**
     * The initial date to show
     */
    date: PropTypes.string.isRequired,
  };

  state = {
    datePicked: this.props.date,
  };

  _handleChange = event => {
    const newDatePicked = event.target.value;
    const isNewDatePickedValid = isDateStringValid(newDatePicked);

    if (isNewDatePickedValid) this.setState({ datePicked: newDatePicked });
  }

  getDate = () => this.state.datePicked;

  render() {
    const maxDate = getCurrentDateString();

    return (
      <div>
        <label className={styles.label}>
          <FormattedMessage id="When?" />
        </label>
        <input
          className={styles.input}
          type="date"
          max={maxDate}
          value={this.state.datePicked}
          onChange={this._handleChange}
        />
      </div>
    );
  }
}
