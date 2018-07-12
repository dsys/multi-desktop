import React from 'react';
import { Link } from "react-router-dom";

import ScreenStyles from './ScreenStyles';
import { default as colors } from './colors';

export default class WelcomeScreen extends React.Component {

  render() {
    return (
      <div className="screen-container">

        <div className="centering-container">
          <div className="header">
            {`Welcome to Multi!`}
          </div>
          <div className="buttons">
            <Link className="button" to="/register">
              <div className="label">{`Get Started`}</div>
              <div className="emoji">🚀</div>
            </Link>
            <Link className="button" to="/link-device">
              <div className="label">{`Link Device`}</div>
              <div className="emoji">🔗</div>
            </Link>
          </div>
        </div>
        {ScreenStyles}
        <style jsx>{`
          .centering-container{
            display: flex;
            flex-direction: column;
          }

          .header {
            font-family: Lobster;
            font-size: 64px;
            font-weight: 700;
            text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
            color: ${colors.white2};
          }

          .buttons{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 10px;
          }

          .buttons :global(.button){
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            margin-left: 20px;
            padding: 10px 20px;

            font-family: Lobster;
            border-radius: 5px;
            cursor: pointer;
            color: ${colors.white2};
            text-decoration: none;
          }

          .buttons :global(.button:first-child){
            margin-left: 0;
          }

          .buttons :global(.button) .emoji{
            font-size: 80px;
            text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
          }

          .buttons :global(.button) .label{
            font-size: 40px;
          }

          .buttons :global(.button:hover){
            background: ${colors.white2};
            color: ${colors.blue2};
          }
        `}</style>
      </div>
    )
  }
}
