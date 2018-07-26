import React from 'react';

export default class SoftLightBG extends React.Component{
  render(){
    const {width="300px", height="300px", padding="20px", children} = this.props;
    return(
      <div className="container">
        <div className="inner blender">
        </div>
        <div className="inner actual">
          {children}
        </div>
        <style jsx>{`
          .container{
            width: 100%;
            height: 100%;
            position: relative;
          }
          .inner{
            padding: ${padding};
            width: ${width};
            height: ${height};
            box-sizing: border-box;
          }
          .inner.blender{
            background: #000;
            mix-blend-mode: soft-light;
          }
          .inner.actual{
            position: absolute;
            top: 0;
            left: 0;
          }
        `}</style>
      </div>
    )
  }
}
