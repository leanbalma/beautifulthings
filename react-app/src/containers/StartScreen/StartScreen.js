import React, { PureComponent } from 'react';

import './StartScreen.css';

import Logo from 'components/Logo';
import Button from 'components/Button';
import InputText from 'components/InputText';

export default class StartScreen extends PureComponent {
  render() {
    return (
      <div className="StartScreen">
        <Logo size="big" />
        <InputText
          type="text"
          label="Username: "
          placeholder="Username"
          onChange={event => console.log(`Username: ${event}`)}
          onEnter={() => {console.log('Enter pressed in username input')}}
        />
        <InputText
          type="password"
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
