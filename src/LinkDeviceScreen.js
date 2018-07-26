import React from 'react';

import Screen from './Screen';
import H1 from './H1';
import DeviceLinkQR from './DeviceLinkQR';
import LinkingScanner from './LinkingScanner';
import SoftLightBG from './SoftLightBG';
import {default as colors} from './colors';

export default class LinkDeviceScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      scanData: null
    };
  }

  toggle = ()=>{
    const {scanning} = this.state;
    this.setState({scanning: !scanning});
  }

  handleQRScan = (data) => {
    this.setState({scanData: data});
  }

  render(){
    const { scanning } = this.state;
    return(
      <Screen>
        <div className="container">
          <div className="header">
            <H1>Link Device</H1>
          </div>
          <div className="linking-container">
            <SoftLightBG>
              {scanning?<LinkingScanner onScan={this.handleQRScan} color={colors.white2} />:<DeviceLinkQR />}
            </SoftLightBG>
          </div>
          <div className="directions">
            {scanning?`Scan the QR code on your other device`:`Scan this QR code with your other device`}
          </div>
          <div className="toggle" onClick={this.toggle}>
            <div className={`option ${scanning?'inactive':'active'}`}>CODE</div>
            <div className={`option ${scanning?'active':'inactive'}`}>SCAN</div>
          </div>
        </div>
        <style jsx>{`
          .container{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }

          .linking-container{
            width: 100%;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .directions{
            margin-top: 5px;
          }

          .toggle{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 20px;
            border-radius: 5px;
            mix-blend-mode: screen;
            background: ${colors.gray2};
            cursor: pointer;
          }

          .option{
            width: 50%;
            height: 100%;
            text-align: center;
            padding: 10px;
            border-radius: 5px;
          }

          .option.active{
            color: black;
            background: ${colors.white2};
            mix-blend-mode: luminosity;
          }

          .option.inactive{
            color: black;
          }
        `}</style>
      </Screen>
    );
  }
}
