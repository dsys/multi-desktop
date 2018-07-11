import React from "react";
import moment from "moment";

import colors from './colors';
import AddressIdenticon from "./AddressIdenticon";
import Address from "./Address";

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTransactionMetadata = transaction => {
    const { activeProfile: { wallet: { address } } } = this.props;
    if (transaction.to) {

      if(transaction.value.ether>0){
        if (transaction.from == address) {
          return {
            type: "SEND",
            color: colors.red1,
            address: transaction.to.display,
            value: `-${transaction.value.ether}`
          };
        } else {
          return {
            type: "RECEIVE",
            color: colors.green1,
            address: transaction.from.display,
            value: `+${transaction.value.ether}`
          };
        }
      } else {
        return {
          type: "ACTION",
          color: colors.blue2,
          address: transaction.to.display,
          value: `Action`
        }
      }
    } else {
      return {
        type: "CREATE",
        color: colors.blue2,
        address: transaction.contractAddress.display,
        value: `New`
      };
    }
  };

  render(){
    const {transaction, activeProfile} = this.props;

    const metadata = this.getTransactionMetadata(transaction);
    const fromAddress = transaction.from.display;
    const toAddress = transaction.to ? transaction.to.display : transaction.contractAddress.display;
    const gasCost = transaction.gasPrice.ether * transaction.gasUsed;
    const txMoment = moment.unix(transaction.block.timestamp);
    let txTimeDisplay;
    if( txMoment.isAfter(moment().subtract(1,'weeks')) ){
      txTimeDisplay = txMoment.fromNow();
    } else {
      txTimeDisplay = txMoment.format('MMMM Do YYYY [at] h:mma');
    }

    const addressFontCSS = "16px monospace";
    const mappedTxIndex = transaction.transactionIndex / transaction.block.transactionCount;
    let description = (mappedTxIndex<0.1 ? "KBBQ 🥩🥓🍖"
                      : (mappedTxIndex<0.3?"Thanks for last night 😘"
                      : (mappedTxIndex<0.5?"Rent 🏠💸"
                      : (mappedTxIndex<0.7?"I honestly can't believe you've done this you absolute twat I thought we were friends how could you...":("Dat cryptokitty 😻") ))))
    if(metadata.type==="CREATE") description = "Yet another identity contract 👤"
    if(metadata.type==="ACTION") description = "Adding another address to the multisig identity contract 🔏"

    return(
      <div className="transaction-container">
          <div className="address-pic">
            <AddressIdenticon address={metadata.type==="CREATE"||metadata.type==="ACTION"?activeProfile.wallet.address:toAddress} />
          </div>
          <div className="info">
            <div className="sentence">
              <div className="address">
                <Address address={fromAddress} overflow="START" font={addressFontCSS} />
              </div>
              <div className="action">
              {metadata.type==="CREATE"?"created":(metadata.type==="ACTION"?"messaged":"paid")}
              </div>
              <div className="address">
                <Address address={toAddress} overflow="START" font={addressFontCSS} />
              </div>
            </div>
            <div className="description">
              {description}
            </div>
            <div className="sub">
              <div className="gas-cost">
                ♦︎{gasCost.toString().slice(0,6)}
              </div>
              <div className="time">
                ◷ {txTimeDisplay}
              </div>
            </div>
          </div>
          <div className={`value`}>
            {metadata.value}
          </div>


        <style jsx>{`
          .transaction-container {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            display: flex;
            flex-direction: row;

            border-radius: 5px;
            cursor: pointer;

            background: ${colors.white2};
            color: ${colors.blue2dark};

            line-height: 1em;
          }

          .address-pic{
            flex-shrink: 0;
            width: 75px;
            height: 75px;
            background: ${colors.white2};
          }

          .info{
            flex-grow: 1;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 15px;
          }

          .sentence{
            display: flex;
            flex-direction: row;
          }

          .address{
            width: 100px;
            font: ${addressFontCSS};
          }

          .action{
            padding: 0 10px;
          }

          .description{
            margin: 5px 0;
            font-size: 1.2em;
            line-height: 1.2em;
          }

          .sub{
            display: flex;
            flex-direction: row;
            font-size: 10px;
          }

          .time{
            margin-left: 10px;
          }

          .value{
            text-align: right;
            color: ${metadata.color};
            font-size: 1.2em;
            font-weight: bold;
          }
        `}</style>
      </div>
    );

  }

}
