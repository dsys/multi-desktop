import React from 'react';

import colors from './colors';

export default class H1 extends React.Component{
  render(){
    const {className, children} = this.props;
    return(
      <div className={`container ${className?className:''}`}>
        {children}

      <style jsx>{`
        .container{
          font-family: Lobster;
          font-size: 64px;
          font-weight: 700;
          text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
          color: ${colors.white2};
        }
      `}</style>
      </div>
    )
  }
}
