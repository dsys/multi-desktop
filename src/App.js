/* eslint-disable */
import React from 'react';
import PouchDB from 'pouchdb-browser';

import { default as colors } from './colors';

export default class App extends React.Component {
  constructor(props) {
    console.log(`colors: ${JSON.stringify(colors, null, 4)}`);
    super(props);
    this.state = {
      mainAddress: null
    };
  }

  componentDidMount = async () => {
    const db = new PouchDB('dapper');
    try {
      const mainAddressDoc = await db.get('mainAddress');
      this.setState({ mainAddress: mainAddressDoc.address });
    } catch (e) {
      console.log(`encountered error: ${JSON.stringify(e, null, 4)}`);
      if (e.status == 404) {
        const mainAddress = '0x❤️🧡💛💚💙💜';
        const res = db.put({
          _id: 'mainAddress',
          address: mainAddress
        });
        this.setState({ mainAddress });
      } else {
        throw e;
      }
    }
  };

  render() {
    const { mainAddress } = this.state;

    return (
      <div className="app-container">
        <h1>Welcome to Multi!</h1>
        <div className="subheader">
          Your address is generated and stored locally.
        </div>
        <div className="address-container">
          <div className="address">{mainAddress}</div>
        </div>
        <style jsx>{`
          .app-container {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            font-family: Roboto;
            background-color: ${colors.blue2};
            color: ${colors.white2};
          }

          h1 {
            font-family: Lobster;
          }
        `}</style>
      </div>
    );
  }
}
