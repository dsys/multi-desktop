import React from 'react';
import fs from 'fs';
import path from 'path';
import Identicon from 'identicon.js';
import Color from 'color';
import PouchDB from 'pouchdb-browser';

import ProfileCard from './ProfileCard';
import ProfileORM from './ProfileORM';
import TextOverflowCenter from './TextOverflowCenter';
import { default as colors } from './colors';

export default class NewProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    const profile = new ProfileORM({
      name: "",
      coverURL: null,
      coverCSS: null,
      wallet: {
        privateKey: props.walletDetails.privateKey,
        publicKey: props.walletDetails.publicKey,
        address: props.walletDetails.address
      }
    });

    this.state = { profile }
  }

  handleCreateProfileClick = async (e) => {
    e.preventDefault();
    const {profile} = this.state;
    console.log('handleCreateProfileClick')
    await profile.save();
    console.log('after profile.save()')
    await profile.setAsActiveProfile();
    console.log('after profile.setAsActiveProfile()')
    const metadataDoc = await ProfileORM.getMetadataDoc()
    console.log(`metadataDoc: ${JSON.stringify(metadataDoc, null, 4)}`);
  }

  handleProfilePicUpdate = (blob) => {
    this.setState({profilePicBlob:blob});
  }

  handleProfileNameUpdate = (name) => {
    const {profile} = this.state;
    profile.name = name;
    this.setState({profile});
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="screen-container">
        <div className="profile-card-container">
          <ProfileCard editable onProfilePicUpdate={this.handleProfilePicUpdate} onNameUpdate={this.handleProfileNameUpdate} profile={profile} />
        </div>


        <div className="button" onClick={this.handleCreateProfileClick}>{`Create Profile`}</div>
        <style jsx>{`
          .screen-container {
            height: 100%;
            width: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            font-family: Roboto;
            background-color: ${colors.blue2};
            color: ${colors.white2};

          }

          .profile-card-container{
            width: 100%;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            padding: 20px;
            background: ${Color(colors.blue2).darken(0.7).string()};

            box-shadow:
            inset 0px 5px 5px -3px ${colors.black1},
            inset 0px -5px 5px -3px ${colors.black1},
            0px 1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()},
            0px -1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()};
          }

          .button{
            display: flex;
            justify-content: center;
            align-items: center;

            margin-top: 20px;
            padding: 10px 20px;

            font-weight: 700;
            border-radius: 5px;
            border: 5px solid ${colors.white2};
            cursor: pointer;
          }

          .button:hover{
            background: ${colors.white2};
            color: ${colors.blue2};
          }
        `}</style>
      </div>
    )
  }
}
