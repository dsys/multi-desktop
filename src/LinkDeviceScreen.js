import React from 'react';
import { Link } from "react-router-dom";

import Screen from './Screen';
import H1 from './H1';
import AddressQR from './AddressQR';
import LinkingScanner from './LinkingScanner';
import SoftLightBG from './SoftLightBG';
import AddressIdenticon from './AddressIdenticon';
import GlassButton from './GlassButton';
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
            <div className="toggle" onClick={this.toggle}>
              <div className={`option ${scanning?'inactive':'active'}`}>CODE</div>
              <div className={`option ${scanning?'active':'inactive'}`}>SCAN</div>
            </div>
            <div className="linking-wrapper">

                {
                  scanning?
                  (
                    <SoftLightBG padding="0">
                      <LinkingScanner onScan={this.handleQRScan} color={colors.white2} />
                    </SoftLightBG>
                  ):
                    <div className="qr-container">
                      <AddressQR address={"0xEf13759c4Ae259aE9D17D43E65EF8c6C39035F24"} codeColor={"#000000"} bgColor="#ffffff" />
                    </div>
                }
            </div>
          </div>
          <div className="buttons">
            <Link to="/welcome">
              <GlassButton>{`Back`}</GlassButton>
            </Link>
            <Link to="/phone-verification">
              <GlassButton>{scanning?'Link':'Done'}</GlassButton>
            </Link>
          </div>
          <div className="no-device">
            <div className="ask">{`Don't have another device?`}</div>
            <Link to="/phone-verification">
            <div className="answer">{`Choose a passphrase instead.`}</div>
            </Link>
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
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .linking-wrapper{
            border-radius: 0 0 5px 5px;
            width: 300px;
            height: 300px;
            overflow: hidden;

          }

          .qr-container{
            background: white;
            padding: 20px;
          }

          .info-wrapper{
            width: 150px;
            height: 250px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
          }

          .info{
            flex-grow: 1;
            mix-blend-mode: screen;
            color: black;
            background: ${colors.white2};
            border-radius: 0 0 5px 0;
            padding: 10px 10px;
          }

          .directions{
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .icon{
            flex-shrink: 0;
            font-size: 30px;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            border-radius: 50px;
            background: black;
            color: white;
          }

          .toggle{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            border-radius: 5px 5px 0 0;
            mix-blend-mode: screen;
            background: ${colors.gray2};
            cursor: pointer;
            margin-bottom: -1px;
          }

          .option{
            font-weight: bold;
            width: 50%;
            text-align: center;
            padding: 10px;
            border-radius: 5px 5px 0 0;
            box-sizing: border-box;
          }

          .option.active{
            color: black;
            background: ${colors.white2};
            mix-blend-mode: luminosity;
          }

          .option.inactive{
            color: black;
          }

          .buttons{
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            width: 100%;
          }

          .buttons > :global(*){
            margin-left: 20px;
            width: 50%;
          }

          .buttons > :global(*:first-child){
            margin-left: 0;
          }

          .no-device{
            margin-top: 10px;
            text-align: center;
            font-size: 12px;
            opacity: 0.8;
          }

          .no-device:hover{
            opacity: 1;
          }

          .no-device :global(a){
            color: ${colors.white2};
          }


        `}</style>
      </Screen>
    );
  }
}
