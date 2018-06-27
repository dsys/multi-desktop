/* eslint-disable */
import React from 'react';
import PouchDB from 'pouchdb-browser';

import { default as colors } from './colors';
import SetupFlow from './SetupFlow';
import HomeScreen from './HomeScreen';

//for debugging
const goThroughFirstTimeSetup = false;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstTimeSetup: false
    };
  }

  componentDidMount = async () => {
    const profilesDB = new PouchDB('profiles');
    const info = await profilesDB.info();
    if(info.doc_count <= 0 || goThroughFirstTimeSetup){
      this.setState({isFirstTimeSetup:true});
    }
  };

  render() {
    const { isFirstTimeSetup } = this.state;

    return (
      <div className="app-container">
      {
        isFirstTimeSetup?(<SetupFlow />):(<HomeScreen />)
      }
      <style jsx>{`
      `}</style>
      </div>
    );
  }
}
