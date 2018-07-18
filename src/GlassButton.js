import React from 'react';

import { default as colors } from './colors';

export default class GlassButton extends React.Component{
  render(){
    const {className, children, ...rest} = this.props;
    return(
      <button className={`${className?className:''}`} {...rest}>
        {children}
        <style jsx>{`
          button{
            width: 100%;

            border: none;
            border-radius: 5px;
            padding: 10px;

            color: ${colors.white2};
            background: ${colors.gray2};
            mix-blend-mode: luminosity;

            font-size: 32px;
            font-family: 'Helvetica Neue';
            font-weight: lighter;
            text-decoration: none;
            text-align: center;

            cursor: pointer;
          }

          button:hover{
            color: black;
            background: ${colors.white2};
          }

          button.disabled{

          }
        `}</style>
      </button>
    );
  }
}
