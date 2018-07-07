/* eslint-disable */
import React from "react";
import PouchDB from "pouchdb-browser";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Color from 'color';
import _ from 'lodash';

import ProfileCard from './ProfileCard';
import TransactionList from './TransactionList';
import { default as colors } from "./colors";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    const { activeProfile } = this.props;
    return (
      <div className="screen-container">
        <div className="header">
          <ProfileCard profile={activeProfile} />
        </div>
        <div className="transaction-list-container">
          <div className="well">
            <TransactionList activeProfile={activeProfile} />
          </div>
        </div>
        <style jsx>{`
          .screen-container {
            width: 100vw;
            height: 100vh;

            display: flex;
            flex-direction: column;

            background: ${colors.blue2};
          }

          .header{
            width: 100%;
            padding: 20px 100px;
            box-sizing: border-box;
            color: ${colors.white2};
          }

          .transaction-list-container{
            width: 100%;
            flex-grow: 1;
            display: flex;
            padding-bottom: 20px;
          }

          .well {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            background: ${Color(colors.blue2).darken(0.7).string()};

            box-shadow:
            inset 0px 5px 5px -3px ${colors.black1},
            inset 0px -5px 5px -3px ${colors.black1},
            0px 1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()},
            0px -1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()};
          }

          :global(.virtualized-list){
            padding: 10px 0;
          }


        `}</style>
      </div>
    );
  }
}
