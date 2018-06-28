/* eslint-disable */
import React from 'react';
import PouchDB from 'pouchdb-browser';

import { default as colors } from './colors';
import SetupFlow from './SetupFlow';
import HomeScreen from './HomeScreen';
import ProfileORM from './ProfileORM';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProfile: null
    };
  }

  componentDidMount = async () => {
    const activeProfile = await ProfileORM.getActiveProfile();
    this.setState({activeProfile});
  };

  render() {
    const {activeProfile} = this.state;
    const {apolloClient} = this.props;
    console.log("activeProfile: "+activeProfile);
    return (
      <div className="app-container">
      {
        activeProfile?(<HomeScreen activeProfile={activeProfile} apolloClient={apolloClient} />):(<SetupFlow />)
      }
      <style jsx>{`
      `}</style>
      </div>
    );
  }
}
