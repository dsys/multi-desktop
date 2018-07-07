/* eslint-disable */
import React from "react";
import PouchDB from "pouchdb-browser";
import { AutoSizer, InfiniteLoader, List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Color from "color";
import _ from "lodash";

import Address from "./Address";
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

const MIN_ROW_HEIGHT = 70;

class VirtualTransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionRows: []
    };
    this._cellMeasurerCache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: MIN_ROW_HEIGHT,
    });
  }

  componentDidMount = () => {
    const {transactions} = this.props;
    this.setState({transactionRows: transactions.map(tx=>_.clone(tx))})
  }

  getTransactionMetadata = transaction => {
    const { activeProfile: { wallet: { address } } } = this.props;
    if (transaction.to) {
      if (transaction.from == address) {
        return {
          type: "SEND",
          bgColor: colors.red1,
          address: transaction.to.display,
          value: `-${transaction.value.ether}`
        };
      } else {
        return {
          type: "RECEIVE",
          bgColor: colors.green1,
          address: transaction.from.display,
          value: `+${transaction.value.ether}`
        };
      }
    } else {
      return {
        type: "CREATE",
        bgColor: colors.blue2,
        address: transaction.contractAddress.display,
        value: `New Contract`
      };
    }
  };

  handleTransactionRowClick = (index, e) => {
    e.preventDefault();
    console.log(`handleTransactionRowClick: index: ${index}`);
    const { transactionRows } = this.state;
    transactionRows[index].expanded = !transactionRows[index].expanded
    this.setState({transactionRows}, ()=>{
      console.log(`setState callback: row: ${JSON.stringify(this.state.transactionRows[index], null, 4)}`);
      this._cellMeasurerCache.clear(index,0);
      this.listRef.recomputeRowHeights();
    });
  }

  renderRow = ({ index, key, parent, style}) => {
    const { transactions } = this.props;
    const { transactionRows } = this.state;
    const transaction = transactions[index];
    const transactionMetadata = this.getTransactionMetadata(transaction);
    const clickHandler = (e)=>{return this.handleTransactionRowClick(index, e)}

    const rowExpanded = transactionRows[index].expanded;
    if(index==0){
      console.log(`rowRender(0): expanded: ${rowExpanded}`);
    }
    const fontCSS = "24px monospace";
    const transactionHeightPadding = 20;

    return (

      <CellMeasurer
        cache={this._cellMeasurerCache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        <div
          className={`transaction-row ${rowExpanded?'expanded':'collapsed'}`}
          onClick={clickHandler}
          key={key}
          style={style}
        >
          <div className="transaction">
            <div className="summary">
              <div className={`value ${transactionMetadata.type}`}>
                {transactionMetadata.value}
              </div>
              <div className="address">
                <Address address={transactionMetadata.address} font={fontCSS} />
              </div>
            </div>
            <div className="details">
              <pre>
                {JSON.stringify(transaction, null, 4)}
              </pre>
            </div>
          </div>

          <style jsx>{`
            .transaction-row {
              width: 100%;
              box-sizing: border-box;
              padding: 10px 100px;
              color: ${colors.white2};
              font: ${fontCSS};
            }

            .transaction {
              height: 100%;
              box-sizing: border-box;
              padding: 10px ${transactionHeightPadding}px;
              display: flex;
              flex-direction: column;

              border-radius: 5px;
              background-color: ${transactionMetadata.bgColor};
              cursor: pointer;
            }

            .summary{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }

            .details{
              font-size: 14px;
            }

            .transaction-row.collapsed .details{
              display: none;
            }

            .address {
              text-align: right;
              width: 50%;
            }
          `}</style>
        </div>
      </CellMeasurer>
    );
  };

  render(){
    const { transactionRows } = this.state;
    return (
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={(r)=>{this.listRef = r}}
            width={width}
            height={height}
            rowRenderer={this.renderRow}
            rowCount={transactionRows.length}
            rowHeight={this._cellMeasurerCache.rowHeight}
            deferredMeasurementCache={this._cellMeasurerCache}
            overscanRowCount={0}
          />
        )}
      </AutoSizer>
    );
  }
}

export default class TransactionList extends React.Component {

  render() {
    const { activeProfile } = this.props;
    return (
      <Query
        query={GET_TRANSACTIONS}
        variables={{ address: "0xEf13759c4Ae259aE9D17D43E65EF8c6C39035F24" }}
      >
        {({ loading, error, data }) => {
          if (loading) return `Loading...`;
          if (error) return `Error!: ${error}`;
          return (<VirtualTransactionList activeProfile={activeProfile} transactions={data.ethereumAddress.transactions} />);
        }}
      </Query>
    );
  }
}
