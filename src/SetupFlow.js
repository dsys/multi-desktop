import React from 'react';
import PouchDB from 'pouchdb-browser';
import pkutils from 'ethereum-mnemonic-privatekey-utils';
import bip39 from 'bip39';

import { default as colors } from './colors';
import FirstTimeSetupScreen from './FirstTimeSetupScreen';
import NewWalletScreen from './NewWalletScreen';

export default class SetupFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentScreenComponent: (<FirstTimeSetupScreen beginSetup={this.beginSetup} />),
      screenHistory: []
    };
  }

  beginSetup = () => {
    this.setState({CurrentScreenComponent: (<NewWalletScreen/>)})
  }

  render() {
    const {CurrentScreenComponent} = this.state;

    return (
      <div className="flow-container">
        {CurrentScreenComponent}
        <style jsx>{`
          .flow-container {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
