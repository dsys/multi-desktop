/* eslint-disable */
import React from "react";
import AddressQR from "./AddressQR";
import TextOverflowCenter from './TextOverflowCenter';
import copy from 'copy-to-clipboard';

import { default as colors } from "./colors";

export default class WalletCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCopyConfirmation: false
    };
  }

  handleAddressClick = (e) =>{
    e.preventDefault();
    console.log('address click');
    this.copyAddressToClipboard();
  }

  copyAddressToClipboard = () =>{
    const {wallet:{address}} = this.props;
    copy(address);
    this.setState({showCopyConfirmation: true});
    setTimeout(()=>{
      this.setState({showCopyConfirmation: false});
    }, 2000);
  }

  render() {
    const {showCopyConfirmation} = this.state;
    const { address, font, copyable } = this.props;

    return (
      <div className="container">
        <TextOverflowCenter text={address} font={font} />
        <div className={`copy-confirmation ${copyable&&showCopyConfirmation?'show':'hide'}`}>Copied to clipboard</div>
        <style jsx>{`
          .container {
            position: relative;
            width: 100%;
            font: ${font};
            cursor: ${copyable?'pointer':'inherit'};
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
