import React from 'react';

import AddressQR from './AddressQR';

import {default as colors} from './colors';

export default class DeviceLinkQR extends React.Component{
  render(){
    const linkingAddress="0xEf13759c4Ae259aE9D17D43E65EF8c6C39035F24";
    return(
      <div className="container">
        <AddressQR address={linkingAddress} codeColor={colors.white2} bgColor="#00000000" />
        <style jsx>{`

        `}</style>
      </div>
    );
  }
}
