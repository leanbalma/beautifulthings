import React, { PureComponent } from 'react';

import styles from './index.css';

import Logo from 'components/Logo';
import Button from 'components/Button';
import InputText from 'components/InputText';

export default class StartScreen extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <Logo size={Logo.BIG} />
        <InputText
          type={InputText.TEXT}
          label="Username: "
          placeholder="Username"
          onChange={event => console.log(`Username: ${event}`)}
          onEnter={() => {console.log('Enter pressed in username input')}}
        />
        <InputText
          type={InputText.PASSWORD}
          label="Password: "
          placeholder="Password"
          onChange={event => console.log(`Password: ${event}`)}
          onEnter={() => {console.log('Enter pressed in password input')}}
        />
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    );
  }
}
