import React, { Component } from 'react';

import './StartScreen.css';

import Logo from 'components/Logo/Logo';
import Button from 'components/Button/Button';
import InputText from 'components/InputText/InputText';

export default class StartScreen extends Component {
  render() {
    return (
      <div className="StartScreen">
        <header>
          <Logo size="big" />
        </header>
        <main>
          <div className="col">
            <InputText
              type="text"
              label="Username: "
              placeholder="Username"
              onEnter={() => {}}
            />
            <InputText
              type="password"
              label="Password: "
              placeholder="Password"
              onEnter={() => {}}
            />
            <Button>Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </main>
      </div>
    );
  }
}
