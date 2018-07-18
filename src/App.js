/* eslint-disable */
import React from 'react';
import PouchDB from 'pouchdb-browser';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { ActiveProfile } from './ProfileManager';
import TitleBar from './TitleBar';
import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import RegisterScreen from './RegisterScreen';
import PhoneVerificationScreen from './PhoneVerificationScreen';
import LinkDeviceScreen from './LinkDeviceScreen';

const SETUP_DEV = true;

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <div>
            <TitleBar />
            <Switch>
              <Route path="/welcome" component={ WelcomeScreen } />
              <Route path="/register" component={ RegisterScreen } />
              <Route path="/phone-verification" component={ PhoneVerificationScreen } />
              <Route path="/link-device" component={ LinkDeviceScreen } />
              <Route exact path="/" component={ (ActiveProfile && !SETUP_DEV) ? HomeScreen:WelcomeScreen } />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
