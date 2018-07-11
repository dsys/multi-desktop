/* eslint-disable */
import React from "react";
import PouchDB from "pouchdb-browser";
import { AutoSizer, InfiniteLoader, List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Color from "color";
import _ from "lodash";

import Transaction from "./Transaction";
import { default as colors } from "./colors";

const debuggingEthAddress = "0xEf13759c4Ae259aE9D17D43E65EF8c6C39035F24"

const GET_TRANSACTIONS = gql`
  query ethereumAddress($address: EthereumAddressString!) {
    ethereumAddress(address: $address) {
      transactions {
        network
        hash
        nonce
        transactionIndex
        block{
          timestamp
          transactionCount
        }
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
          gwei
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

  remeasureRow = (index) => {
    this._cellMeasurerCache.clear(index,0);
    this.listRef.recomputeRowHeights();
  }

  handleTransactionRowClick = (index, e) => {
    e.preventDefault();
    const { transactionRows } = this.state;
    transactionRows[index].expanded = !transactionRows[index].expanded
    this.setState({transactionRows}, ()=>{
      this.remeasureRow(index);
    });
  }

  renderRow = ({ index, key, parent, style}) => {
    const { transactions, activeProfile } = this.props;
    const { transactionRows } = this.state;
    const transaction = transactions[index];

    const clickHandler = (e)=>{return this.handleTransactionRowClick(index, e)}

    const rowExpanded = transactionRows[index].expanded;

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
            <Transaction transaction={transaction} activeProfile={activeProfile} />
          </div>
          <div className="transaction-details">
            <pre>
              {JSON.stringify(transaction, null, 4)}
            </pre>
          </div>

          <style jsx>{`
            .transaction-row {
              width: 100%;
              box-sizing: border-box;
              padding: 5px 100px;
              color: ${colors.white2};
            }

            .transaction-row:first-child {
              padding-top: 10px;
            }

            .transaction-details{
              font-size: 14px;
            }

            .transaction-row.collapsed .transaction-details{
              display: none;
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
            onRowsRendered={this.remeasureRows}
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
        variables={{ address: debuggingEthAddress }}
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
