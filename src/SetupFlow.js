import React from 'react';

import { default as colors } from './colors';
import FirstTimeSetupScreen from './FirstTimeSetupScreen';
import NewWalletScreen from './NewWalletScreen';
import PersonalizeWalletScreen from './PersonalizeWalletScreen';

export default class SetupFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentScreenComponent: (<FirstTimeSetupScreen next={this.beginSetup} />),
      screenHistory: []
    };
  }

  beginSetup = () => {
    this.setState({CurrentScreenComponent: (<NewWalletScreen next={this.personalizeWallet} />)})
  }

  personalizeWallet = (walletDetails) =>{
    this.setState({CurrentScreenComponent: (<PersonalizeWalletScreen next={this.finishSetup} walletDetails={walletDetails} />)})
  }

  finishSetup = () =>{

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
