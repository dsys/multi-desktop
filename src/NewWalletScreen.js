import React from 'react';
import PouchDB from 'pouchdb-browser';
import hdkey from 'ethereumjs-wallet/hdkey';
import bip39 from 'bip39';
import Color from 'color';

import { default as colors } from './colors';

export default class NewWalletScreen extends React.Component {
  constructor(props) {
    super(props);
    const mnemonic = bip39.generateMnemonic();
    const {privateKey, publicKey, address} = this.getAccountDetailsFromMnemonic(mnemonic);
    this.state = {
      mnemonic,
      publicKey,
      privateKey,
      address
    }
  }

  getAccountDetailsFromMnemonic(mnemonic) {
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const wallet_hdpath = "m/44'/60'/0'/0/";

    const wallet = hdwallet.derivePath(wallet_hdpath + '0').getWallet();
    const privateKey = wallet._privKey.toString('hex');
    const account = '0x' + (wallet.getAddress().toString('hex').toUpperCase());
    const publicKey = wallet._pubKey.toString('hex');

    return {
      hdwallet: wallet,
      privateKey,
      publicKey,
      address: account
    }
  }

  getMnemonicWordHue = (index, wordCount) =>{
    const hueIncrement = 360/(wordCount+1);
    let hue = (index*hueIncrement)%360;
    if(hue>210) hue=(hue+2*hueIncrement)%360;
    return hue;
  }

  getComplimentaryHue = (hue)=>{
    return (hue+180)%360;
  }

  renderMnemonic = () => {
    const {mnemonic} = this.state;
    const mnemonicWords = mnemonic.split(' ');
    return mnemonicWords.map((word, i)=>{
      const hue = this.getMnemonicWordHue(i, mnemonicWords.length);
      const bgHSL = `hsl(${hue}, 100%, 60%)`;
      return(
        <span className="mnemonic-word" style={{'background':bgHSL}}>{word}</span>
      )
    })
  }

  render() {
    const {mnemonic, privateKey, publicKey, address} = this.state;

    return (
      <div className="screen-container">
        <div className="header">{`Save this passphrase!`}</div>
        <div className="cta">{`Write it down, take a screenshot or copy the text`}</div>
        <div className="explanation">
        {`This is the recovery key for your account. Should you lose access to your private key for any reason, this is the only way to recover your wallet.`}
        </div>

        <div className="mnemonic-container">
          {this.renderMnemonic()}
        </div>

        <div className="button">{`I have saved my recovery phrase`}</div>
        <style jsx>{`
          .screen-container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            box-sizing: border-box;

            font-family: Roboto;
            background-color: ${colors.blue2};
            color: ${colors.white2};
          }

          .header{
            padding: 10px 20px;
            font-family: Lobster;
            font-size: 32px;
            font-weight: 700;
          }

          .explanation{
            padding: 0 20px 10px;
            text-align: center;
            font-size: 14px;
          }

          .cta{
            padding: 0 20px 10px;
            font-weight: 700;
            font-size: 16px;
          }

          .mnemonic-container{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            margin: 10px 0px;
            padding: 20px;
            background: ${Color(colors.blue2).darken(0.7).string()};

            text-align: center;
            line-height: 20px;

            box-shadow:
            inset 0px 5px 5px -3px ${colors.black1},
            inset 0px -5px 5px -3px ${colors.black1},
            0px 1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()},
            0px -1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()};
          }

          .mnemonic-word{
            padding: 10px;
            margin: 5px;
            border-radius: 5px;

            font-family: 'Anton';
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 0.2rem;


            color: ${Color(colors.blue2).darken(0.8).string()};
          }

          .button{
            display: flex;
            justify-content: center;
            align-items: center;

            margin-top: 10px;
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
