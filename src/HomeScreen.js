/* eslint-disable */
import React from "react";
import PouchDB from "pouchdb-browser";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Color from 'color';

import Address from './Address';
import { default as colors } from "./colors";

const GET_TRANSACTIONS = gql`
  query ethereumAddress($address: EthereumAddressString!) {
    ethereumAddress(address: $address) {
      transactions {
        network
        hash
        nonce
        transactionIndex
        from {
          display
        }
        to {
          display
        }
        contractAddress {
          display
        }
        value {
          ether
        }
        gas
        gasPrice {
          ether
        }
        gasUsed
        cumulativeGasUsed
        status
      }
    }
  }
`;

const ROW_HEIGHT = 70;
const EXPANDED_ROW_HEIGHT = 300;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }

  componentDidMount = () => {
    this.fetchTransactions();
  };

  fetchTransactions = async () => {
    const { activeProfile, apolloClient } = this.props;
    const hash = activeProfile.wallet.address;
    const { data, errors, loading } = await apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: { address: "0xEf13759c4Ae259aE9D17D43E65EF8c6C39035F24" }
    });
    console.log(JSON.stringify(data, null, 4));
    this.setState({ transactions: data.ethereumAddress.transactions, errors, loading });
  };

  getTransactionMetadata = (transaction) =>{
    const {activeProfile:{wallet:{address}}} = this.props;
    if(transaction.to){
      if(transaction.from==address){
        return {
          type: "SEND",
          bgColor: colors.red1,
          address: transaction.to.display,
          value: `-${transaction.value.ether}`
        }
      } else {
        return {
          type: "RECEIVE",
          bgColor: colors.green1,
          address: transaction.from.display,
          value: `+${transaction.value.ether}`
        }
      }
    } else {
      return {
        type: "CREATE",
        bgColor: colors.blue2,
        address: transaction.contractAddress.display,
        value: `New Contract`
      }
    }
  }

  rowHeight = (params) => {
    const { transactions } = this.state;
    return transactions[params.index].expanded ? EXPANDED_ROW_HEIGHT : ROW_HEIGHT;
  }

  rowRenderer = (params) => {
    const {activeProfile} = this.props;
    const { transactions } = this.state;
    const transaction = transactions[params.index];
    const transactionMetadata = this.getTransactionMetadata(transaction);
    const fontCSS = "24px monospace"
    const transactionHeightPadding = 20;

    return (
      <div className="transaction-row" key={params.key} style={params.style}>
        <div className="transaction">
          <div className={`value ${transactionMetadata.type}`}>
            {transactionMetadata.value}
          </div>
          <div className="address">
            <Address address={transactionMetadata.address} font={fontCSS} />
          </div>
        </div>

        <style jsx>{`
          .transaction-row{
            width: 100%;
            height: ${ROW_HEIGHT}px;
            box-sizing: border-box;
            padding: 10px 100px;
            color: ${colors.white2};
            font: ${fontCSS};
            overflow: hidden;
          }

          .transaction{
            height: ${ROW_HEIGHT-transactionHeightPadding}px;
            box-sizing: border-box;
            padding: 10px ${transactionHeightPadding}px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            border-radius: 5px;

            background-color: ${transactionMetadata.bgColor};
          }

          .address{
            text-align: right;
            width: 50%;
          }
        `}</style>
      </div>
    )
  }

  render() {
    const { activeProfile } = this.props;
    const { transactions } = this.state;
    return (
      <div className="screen-container">
        <div className='header'>Transactions</div>
        <div className="transaction-list-container">
          <div className="well">
            <AutoSizer>
              {({ width, height }) => (
                <List
                  className="virtualized-list"
                  width={width}
                  height={height}
                  rowRenderer={this.rowRenderer}
                  rowCount={transactions.length}
                  rowHeight={this.rowHeight}
                />
              )}
            </AutoSizer>
          </div>
        </div>
        <style jsx>{`
          .screen-container {
            width: 100vw;
            height: 100vh;

            display: flex;
            flex-direction: column;

            background: ${colors.blue2};
          }

          .header{
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
            font-size: 32px;
            color: ${colors.white2};
            font-family: Anton;
          }

          .transaction-list-container{
            width: 100%;
            flex-grow: 1;
            display: flex;
            padding-bottom: 20px;
          }

          .well {
            width: 100%;
            box-sizing: border-box;
            background: ${Color(colors.blue2).darken(0.7).string()};

            box-shadow:
            inset 0px 5px 5px -3px ${colors.black1},
            inset 0px -5px 5px -3px ${colors.black1},
            0px 1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()},
            0px -1px 10px 0 ${Color(colors.blue2).lighten(0.2).string()};
          }

          :global(.virtualized-list){
            padding: 10px 0;
          }


        `}</style>
      </div>
    );
  }
}
