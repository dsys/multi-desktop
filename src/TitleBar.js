import React from 'react';
import PropTypes from "prop-types";

import { default as colors } from './colors';

export default class TitleBar extends React.Component {
  static contextTypes = {
    router: () => PropTypes.object, // replace with PropTypes.object if you use them
  }

  static height = 38;
  static paddingForWindowControls = 78;

  render(){
    return(
      <div className="titlebar-container">
        <div
          className="back button"
          onClick={this.context.router.history.goBack}>
          ⤆
        </div>
        <div
          className="forward button"
          onClick={this.context.router.history.goBack}>
          ⤇
        </div>
        <style jsx>{`
          .titlebar-container{
            position: absolute;
            top: 0;
            left: 0;
            height: ${TitleBar.height}px;
            width: 100vw;
            padding-left: ${TitleBar.paddingForWindowControls}px;
            background: rgba(0,0,0,0.1);
            display: flex;
            flex-direction: row;
            align-items: center;
            -webkit-user-select: none;
            -webkit-app-region: drag;
            z-index: 999;
          }

          .button{
            color: ${colors.white2};
            cursor: pointer;
            -webkit-app-region: no-drag;
            font-size: 20px;
          }

          .forward{
            margin-left: 10px;
          }

        `}</style>
      </div>
    )
  }
}
