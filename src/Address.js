/* eslint-disable */
import React from "react";
import AddressQR from "./AddressQR";
import TextOverflowCenter from './TextOverflowCenter';
import copy from 'copy-to-clipboard';

import { default as colors } from "./colors";

const OVERFLOW_TYPES = ["MIDDLE", "END"];

export default class Address extends React.Component {
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
    const { showCopyConfirmation } = this.state;
    const { address, font, copyable, overflow="CENTER" } = this.props;

    return (
      <div className="container">
        {
          overflow == "CENTER"
          ? (<TextOverflowCenter text={address} font={font} />)
          : (
              <div className="address-container">
                <span className="0x-label">{`0x`}</span><span className="address">{address}</span>
              </div>
            )
        }

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

          .address-container{
            display: flex;
            flex-direction: row;
          }

          .address{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            ${overflow=="START" ? "direction: rtl;" : ""}
          }
        `}</style>
      </div>
    );
  }
}
