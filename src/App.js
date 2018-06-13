/* eslint-disable */
import React from 'react';
import PouchDB from 'pouchdb-browser';

import { default as colors } from './colors';
import SetupFlow from './SetupFlow';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainAddress: null,
      firstTimeSetupComplete: true
    };
  }

  componentDidMount = async () => {
    const db = new PouchDB('multi');
    try {
      const mainAddressDoc = await db.get('mainAddress');
      this.setState({ mainAddress: mainAddressDoc.address });
    } catch (e) {
      console.log(`encountered error: ${JSON.stringify(e, null, 4)}`);
      if (e.status == 404) {
        this.setState({firstTimeSetupComplete:false});
        /*
        const mainAddress = '0x❤️🧡💛💚💙💜';
        const res = db.put({
          _id: 'mainAddress',
          address: mainAddress
        });
        this.setState({ mainAddress });
        */
      } else {
        throw e;
      }
    }
  };

  render() {
    const { mainAddress, firstTimeSetupComplete } = this.state;

    return (
      <div className="app-container">
      {
        firstTimeSetupComplete?(<div>CONGRATS</div>):(<SetupFlow />)
      }
      <style jsx>{`
      `}</style>
      </div>
    );
  }
}
