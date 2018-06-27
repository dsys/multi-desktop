/* eslint-disable */
import React from 'react';
import PouchDB from 'pouchdb-browser';

import { default as colors } from './colors';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () =>{
    const walletsDB = new PouchDB('wallets');
    const result = await walletsDB.allDocs({include_docs: true})
    const wallets = result.rows.map(row=>row.doc);
    this.setState({wallets});
  }

  render() {
    return (
      <div className="screen-container">
      {
        `THIS WILL BE THE HOME SCREEN`
      }
      </div>
    );
  }
}
