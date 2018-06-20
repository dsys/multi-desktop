import React from 'react';
import fs from 'fs';
import path from 'path';
import Identicon from 'identicon.js';
import Color from 'color';

import { default as colors } from './colors';

export default class PersonalizeWalletScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      mnemonic,
      publicKey,
      privateKey,
      address
    } = props.walletDetails;

    // set up options
    var hash = address.slice(2);  // 15+ hex chars
    var options = {
      size: 100,
      margin: 0.1,
      format: 'svg'
    };

    this.state = {
      walletName: 'Wallet 01',
      walletIdenticon: new Identicon(hash, options)
    }
  }

  getShortAddress = (address)=>{
    return `${address.slice(0,6)}...${address.slice(-4)}`;
  }

  render() {
    const {walletDetails} = this.props;
    const {walletName, walletIdenticon} = this.state;
    return (
      <div className="screen-container">
        <div className="wallet-well">
            <div className="wallet-pic-container">
              <img src={`data:image/svg+xml;base64,${walletIdenticon.toString()}`} />
            </div>
            <div className="wallet-details">
              <div className="field wallet-name">
                <input value={walletName} type="text" />
              </div>
              <div className="field wallet-address">
                <div className="first-half">{walletDetails.address}</div>
                <div className="separator">{`...`}</div>
                <div className="second-half-container">
                  <div className="second-half">{walletDetails.address}</div>
                </div>
              </div>
            </div>
        </div>


        <div className="button" onClick={this.handleBeginClick}>{`Save Wallet`}</div>
        <style jsx>{`
          .screen-container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            padding: 10px;
            box-sizing: border-box;

            font-family: Roboto;
            background-color: ${colors.blue2};
            color: ${colors.white2};
          }

          .wallet-well{
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

          .wallet-pic-container{
            width: 100px;
            height: 100px;
            border-radius: 5px;
            overflow: hidden;
            margin-right: 20px;
          }

          .wallet-pic-container img{
            max-width: 100%;
            max-height: 100%;
          }

          .wallet-details{
            display: flex;
            flex-direction: column;
          }

          .wallet-details .field{
            margin-bottom: 10px;
          }

          .wallet-address{
            position: relative;
            width: 100%;
            height: 1rem;
            overflow: hidden;
          }

          .wallet-address .first-half {
            width: 50%;
            height: 1rem;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 101;
            background-color: ${Color(colors.blue2).darken(0.7).string()};
          }

          .wallet-address .separator{
            width: 1rem;
            height: 1rem;
            text-align: center;
            padding: 0 10px;
            position: absolute;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            background: linear-gradient(to right, rgba(0,0,0,0) 0%, ${Color(colors.blue2).darken(0.7).string()} 30%, ${Color(colors.blue2).darken(0.7).string()} 70%, rgba(0,0,0,0) 100%);
            z-index: 103;
          }

          .wallet-address .second-half-container{
            width: 50%;
            height: 1rem;
            position: absolute;
            top: 0;
            right: 0;
            overflow: hidden;
          }

          .wallet-address .second-half {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 102;
            background-color: ${Color(colors.blue2).darken(0.7).string()};
          }

          .wallet-name input{
            font-size: 16px;
            font-weight: 700;
            border: none;
            border-bottom: 1px solid ${colors.white2};
            color: ${colors.white2};
            background-color: ${Color(colors.blue2).darken(0.7).string()};
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
