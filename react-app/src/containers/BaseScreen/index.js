import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export default class BaseScreen extends PureComponent {
  static propTypes = {
    /**
     * The element to use as a header (expect a Header).
     */
    header: PropTypes.element.isRequired,

    /**
     * The element with the main content of the screen.
     */
    main: PropTypes.element.isRequired,

    /**
     * The element to use as a footer.
     */
    footer: PropTypes.element,
  };

  static defaultProps = { footer: null }

  render() {
    return (
      <div className={styles.container}>
        <div>
          {this.props.header}
        </div>
        <div className={styles.main}>
          {this.props.main}
        </div>
        <div>
          {this.props.footer}
        </div>
      </div>
    );
  }
}
