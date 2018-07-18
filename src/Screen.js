import React from 'react';

import { default as colors } from './colors';

export default class Screen extends React.Component{
  render(){
    return(
      <div className="screen-container">
        {this.props.children}
        <style jsx>{`
          .screen-container {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            padding: 10px;
            box-sizing: border-box;

            font-family: Roboto;

            background: ${colors.blueLagoon};
            background: linear-gradient(320deg, ${colors.blueLagoon} 16%, ${colors.emerald} 100%);
          }

          ::selection {
            background: #BC5D29;
          }
        `}</style>
      </div>
    );
  }
}
