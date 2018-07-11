import React from 'react';
import { gql } from "apollo-boost";
import MockQuery from "./MockQuery";

const GQL_query_checkENS = gql(`
  query checkENS($subdomain: String!) {
    checkENS(subdomain: $subdomain){
      owner
    }
  }
`);

export default class MockCheckENSQuery extends React.Component {
  render(){
    const {loading=false, error=null, skip, mockData, subdomain} = this.props;
    return(
      <MockQuery skip={skip} loading={loading} error={error} mockData={mockData} query={GQL_query_checkENS} variables={{subdomain}}>
        {this.props.children}
      </MockQuery>
    )
  }
}
