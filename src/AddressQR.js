/* eslint-disable */
import React from "react";
import EthereumQRPlugin from "ethereum-qr-code";

import { default as colors } from "./colors";

export default class AddressQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QRDataURL: ""
    };
  }

  componentDidMount = async () => {
    const { address, codeColor, bgColor } = this.props;
    const qr = new EthereumQRPlugin();
    const code = await qr.toDataUrl(
      { to: address },
      { options: { margin: 0, color: { dark: codeColor, light: bgColor } } }
    );
    this.setState({ QRDataURL: code.dataURL });
  };

  render() {
    const { codeColor, bgColor, css } = this.props;
    const { QRDataURL } = this.state;

    return (
      <div className="container">
        <img src={QRDataURL} />
        <style jsx>{`
          .container {
            width: 100%;
            height: 100%;
          }

          img {
            width: 100%;
            height: 100%;
          }

          ${css};
        `}</style>
      </div>
    );
  }
}
