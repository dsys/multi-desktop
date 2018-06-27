/* eslint-disable */
import React from 'react';
import Identicon from 'identicon.js';

import { default as colors } from './colors';

export default class AddressIdenticon extends React.Component {
  constructor(props) {
    super(props);

    // set up options
    var hash1 = props.address.slice(2,17);  // 15+ hex chars
    var hue          = parseInt(hash1.substr(-7), 16) / 0xfffffff;
    var opts1 = {
      size: 200,
      margin: 0,
      format: 'svg',
      foreground: this.hsl2rgb(hue, 0.7, 0.6),
      background: [0,0,0,0]
    };

    var hash2 = props.address.slice(17);  // 15+ hex chars
    var opts2 = {
      size: 200,
      margin: 0,
      format: 'svg',
      foreground: this.hsl2rgb((hue+0.5)%1, 0.7, 0.2),
      background: [0,0,0,0]
    };

    this.state = {
      identicon1: new Identicon(hash1, opts1),
      identicon2: new Identicon(hash2, opts2)
    }
  }

  // adapted from: https://gist.github.com/aemkei/1325937
  hsl2rgb = (h, s, b)=>{
      h *= 6;
      s = [
          b += s *= b < .5 ? b : 1 - b,
          b - h % 1 * s * 2,
          b -= s *= 2,
          b,
          b + h % 1 * s,
          b + s
      ];

      return[
          s[ ~~h    % 6 ] * 255, // red
          s[ (h|16) % 6 ] * 255, // green
          s[ (h|8)  % 6 ] * 255  // blue
      ];
  }

  render() {
    const { identicon1, identicon2 } = this.state;
    return (
      <div className="container">
        <img className="identicon on-top" src={`data:image/svg+xml;base64,${identicon1.toString()}`} />
        <img className="identicon on-bottom" src={`data:image/svg+xml;base64,${identicon2.toString()}`} />
        <style jsx>{`
          .container{
            position: relative;
            width: 100%;
            height: 100%;
          }

          .identicon{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .on-top{
            z-index: 102;
          }

          .on-bottom{
            z-index: 101;
          }
        `}</style>
      </div>
    );
  }
}
