/* eslint-disable */
import React from "react";
import copy from 'copy-to-clipboard';

import AddressQR from "./AddressQR";
import TextOverflowCenter from './TextOverflowCenter';
import ProfilePic from './ProfilePic';
import { default as colors } from "./colors";

//According to ISO/IEC 7810#ID-1
const creditCardAspectRatio = 2.125 / 3.37;

export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCopyConfirmation: false,
    };
  }

  copyAddressToClipboard = () =>{
    const {profile:{wallet:{address}}} = this.props;
    copy(address);
    this.setState({showCopyConfirmation: true});
    setTimeout(()=>{
      this.setState({showCopyConfirmation: false});
    }, 1500);
  }

  handleAddressClick = (e) =>{
    e.preventDefault();
    console.log('address click');
    this.copyAddressToClipboard();
  }

  render() {
    const { profile, editable, onProfilePicUpdate, onNameUpdate } = this.props;
    const { showCopyConfirmation, profileName } = this.state;
    const addressFontCSS = `24px monospace`;

    return (
      <div className="card">
          <div className="profile-pic-container">
            <ProfilePic profile={profile} editable={editable} onUpdate={onProfilePicUpdate} />
          </div>
          <div className="profile-details">
            <div className="name">
            {
              editable ?
              (<input value={profile.name} onChange={(e)=>{onNameUpdate(e.target.value)}} placeholder={'Profile Name'} type="text" />):
              profile.name
            }
            </div>
            <div className="address" onClick={this.handleAddressClick}>
              <TextOverflowCenter text={profile.wallet.address} font={addressFontCSS} />
              <div className={`copy-confirmation ${showCopyConfirmation?'show':'hide'}`}>Copied to clipboard</div>
            </div>
          </div>

        <style jsx>{`

          .card {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            position: relative;
            padding: 20px;
            overflow: hidden;
          }

          .profile-pic-container{
            width: 100px;
            height: 100px;
            border-radius: 10px;
            background: ${colors.white2};
            border: 10px solid ${colors.white2};
          }

          .profile-details{
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            flex-grow: 1;
          }

          .name {
            width: 100%;
            font-size: 32px;
            margin-bottom: 10px;
          }

          .name input{
            background: transparent;
            border: none;
            border-bottom: 3px solid ${colors.white2};
            padding: 0;
            margin: 0;
            font-size: inherit;
            color: ${colors.white2};
          }

          .name input::placeholder{
            color: ${colors.white2};
          }

          .address {
            position: relative;
            width: 100%;
            font: ${addressFontCSS};
            cursor: pointer;
          }

          .copy-confirmation{
            height: 0;
            overflow: hidden;
            width: 100%;
            position: absolute;
            top: 28px;
            left: 0;
            transition: height 0.2s ease-in-out;
          }

          .copy-confirmation.show{
            height: 24px;
          }
        `}</style>
      </div>
    );
  }
}
