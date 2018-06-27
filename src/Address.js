/* eslint-disable */
import React from "react";
import AddressQR from "./AddressQR";
import TextOverflowCenter from './TextOverflowCenter';
import copy from 'copy-to-clipboard';

import { default as colors } from "./colors";

//According to ISO/IEC 7810#ID-1
const creditCardAspectRatio = 2.125 / 3.37;

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
    const { address } = this.props;

    return (
      <div className="container">
        <TextOverflowCenter text={address} font={addressFontCSS} />
        <div className={`copy-confirmation ${showCopyConfirmation?'show':'hide'}`}>Copied to clipboard</div>
        <style jsx>{`
          ${css}
        `}</style>
      </div>
    );
  }
}
