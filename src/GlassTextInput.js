import React from 'react';
import Color from 'color';
import { default as colors } from './colors';

export default class GlassTextInput extends React.Component{
  render(){
    const {className, children, icon=false, tail, type, ...rest} = this.props;
    return(
      <div className="container">
        <div className="mirror icon-only">
          <div className="icon">
            {icon}
          </div>
        </div>
        <div className="mirror input-only">
          <div className="icon hidden">
            {icon}
          </div>
          <input type={type&&"text"} className={`${className?className:''}`} {...rest} />
          <span className="tail">{tail}</span>
        </div>
        <style jsx>{`
          .container{
            position: relative;
            width: 100%;

            border-radius: 5px;
            overflow: hidden;

            font-size: 24px;
          }

          .mirror{
            display: flex;
            flex-direction: row;
            padding: 10px;
          }

          .mirror.icon-only{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
          }

          .mirror.input-only{
            color: ${colors.white2};
            background: ${colors.gray2};
            mix-blend-mode: luminosity;
          }

          .icon{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: -5px;
          }

          .hidden{
            opacity: 0;
          }

          input{
            width: 100%;
            box-sizing: border-box;

            border: none;
            padding: 0;
            background: transparent;
            color: ${colors.white2};

            font-size: 24px;
            padding-left: 10px;
          }
          input:focus{
            outline: none;
          }

          .tail{
            color: ${Color(colors.white2).alpha(0.5)};
            cursor: help;
          }
          .tail:hover{
            color: ${colors.white2};
          }
        `}</style>
      </div>
    );
  }
}
