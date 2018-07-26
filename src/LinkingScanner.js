import React from 'react';
import QRReader from 'react-qr-reader';

import Spinner from './Spinner';
import GlassButton from './GlassButton';

export default class LinkingScanner extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      data: null,
      deviceFound: false,
      loading: true
    }
  }

  handleScan = (data) => {
    const { onScan } = this.props;
    console.log('SCAN');
    if(data){
      console.log(`Scanned: ${data}`);
      this.setState({data, delay:false, deviceFound:true});
      onScan(data);
    }
  }

  handleError = (err) => {
    console.error(err)
  }

  handleLoad = () => {
    console.log('handleLoad');
    this.setState({loading: false})
  }

  handleLink = () => {

  }

  render(){
    const {loading, deviceFound} = this.state;
    const {color} = this.props;
    return(
      <div className="container">
        <div className="loader">
          <Spinner color={color} />
        </div>
        <div className="device-container">
          <div className="device">
            <div className="phone-icon">📱</div>
            <div className="details">
              <div className="device-name">{`Jackson's iPhone`}</div>
              <div className="device-number">{`C02T51HCH040`}</div>
            </div>
          </div>
        </div>
        <div className="reader-container">
          <QRReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            onLoad={this.handleLoad}
            showViewFinder={false}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        <style jsx>{`
          .container{
            width: 100%;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            padding: 20px;
          }
          .loader{
            width: 100%;
            height: 100%;
            display: ${deviceFound?'none':'flex'};
            justify-content: center;
            align-items: center;
            padding: 50px;
            box-sizing: border-box;
          }

          .device-container{
            display: ${deviceFound?'flex':'none'};
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }

          .device{
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-grow: 1;
          }

          .details{
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .device-name{
            font-size: 20px;
            font-weight: bold;
          }

          .device-number{
            font-size: 20px;
            font-family: monospace;
            font-weight: lighter;
          }

          .phone-icon{
            display: flex;
            flex-direction: column;
            justify-content: center;

            font-size: 60px;
            margin-right: 5px;
            margin-bottom: -5px;
          }

          .question{
            margin-top: 20px;
          }

          .buttons{
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            align-self: end;
          }

          .button{
            width: 50%;
            margin-right: 5px;
          }

          .button:last-child{
            margin-right: 0;
          }

          .reader-container{
            display: ${deviceFound?'none':'block'};
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
        `}</style>
      </div>
    );
  }
}
