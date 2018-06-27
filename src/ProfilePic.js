/* eslint-disable */
import React from 'react';

import AddressIdenticon from './AddressIdenticon';
import Dropzone from 'react-dropzone';
import { default as colors } from './colors';

export default class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profileImgURL: null};
  }

  componentDidMount = async () => {
    const {profile} = this.props;
    if(profile._id){
      this.setState({profileImgURL: await profile.getProfileImgURL()})
    }
  }

  handleDrop = async (files) => {
    const {profile, onUpdate} = this.props;
    const file = files[0];
    if(profile._id){
      await profile.putProfileImg(file);
      this.setState({profileImgURL: await profile.getProfileImgURL()})
    } else {
      this.setState({profileImgURL: URL.createObjectURL(file)});
    }

    onUpdate(file);
  }

  render() {
    const {profile, editable, onUpdate} = this.props;
    const {profileImgURL} = this.state;
    return (
      <div className="container">
        {
          (profileImgURL) ?
          (<div className="profile-pic"></div>):
          (<AddressIdenticon address={profile.wallet.address} />)
        }
        {
          editable ?
          (
            <div className="edit-overlay">
              <Dropzone className="dropzone" onDrop={this.handleDrop.bind(this)} accept="image/*">
                <p>Upload Image</p>
              </Dropzone>
            </div>
        ):null
        }

        <style jsx>{`
          .container{
            position: relative;
            width: 100%;
            height: 100%;
          }

          .profile-pic{
            width: 100%;
            height: 100%;
            background: center / cover no-repeat url('${profileImgURL}');
          }

          .edit-overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            transition: opacity 0.2s;
            opacity: 0;
            background: rgba(0,0,0,0.7);
            color: ${colors.white2};
            z-index: 999;
          }

          .edit-overlay:hover{
            opacity: 1;
          }

          :global(.dropzone){
            border: none;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}
