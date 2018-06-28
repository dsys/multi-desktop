/* eslint-disable */
import React from "react";
import PouchDB from "pouchdb-browser";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import { default as colors } from "./colors";

const GET_TRANSACTIONS = gql`
  query ethereumAddress($hash: EthereumAddressHexValue!) {
    ethereumAddress(hash: $hash){
      transactions{
        network
        hash
        nonce
        transactionIndex
        from{
          hash
        }
        to{
          hash
        }
        value{
          ether
        }
        gas
        gasPrice{
          ether
        }
        gasUsed
        cumulativeGasUsed
        status
      }
    }
  }
`;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () =>{
    this.fetchTransactions();
  }

  fetchTransactions = async () =>{
    const { activeProfile, apolloClient } = this.props;
    const hash = activeProfile.wallet.address;
    const {data, errors, loading } = await apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: {hash}
    });
    console.log(JSON.stringify(data,null,4));
    this.setState({transactions:data, errors, loading})
  }

  rowRenderer = () => {
    return (<div>hi</div>);
  }

  render() {
    const { activeProfile } = this.props;
    return (
      <div className="screen-container">
        <div>WHATUP</div>
        <div className="transaction-list-container">
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowRenderer={this.rowRenderer}
                rowCount={100}
                rowHeight={30}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}
