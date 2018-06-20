import React from 'react';

import { default as colors } from './colors';

export default class FirstTimeSetupScreen extends React.Component {

  handleBeginClick = (e) =>{
    const {next} = this.props;
    e.preventDefault();
    next();
  }

  render() {
    return (
      <div className="screen-container">
        <div className="header">Welcome to Multi!</div>
        <div className="subheader">
          {`Let's get started by generating your private key.`}
        </div>
        <div className="button" onClick={this.handleBeginClick}>{`Let's Go!`}</div>
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

          .header {
            font-family: Lobster;
            font-size: 32px;
            font-weight: 700;
          }

          .subheader{
            text-align: center;
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
