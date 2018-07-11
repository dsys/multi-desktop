import React from 'react';

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import MockCheckENSQuery from './MockCheckENSQuery'

import { default as colors } from './colors';
import ScreenStyle from "./ScreenStyle";

const GQL_mutation_registerENS = gql(`
  mutation registerENS($subdomain: String!) {
    registerENS(subdomain: $subdomain){
      success
      error
    }
  }
`);

export default class RegisterScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subdomain: null
    };
  }

  handleInput = (e) => {
    const subdomain = e.target.value;
    this.setState({subdomain});
  }

  render() {
    const {subdomain} = this.state;
    return(
      <div className="screen-container">
        <input value={subdomain} onChange={this.handleInput} name="subdomain" type="text" />
        <MockCheckENSQuery skip={!subdomain} subdomain={subdomain} mockData={"YOYOYO"}>
          {({ loading, error, data }) => {
            if (loading) return `Loading...`;
            if (error) return `Error!: ${error}`;
            return (
              <div className="ens-check-results">
                <div>"HELLO"</div>
                {JSON.stringify(data, null, 4)}
              </div>
            );
          }}
        </MockCheckENSQuery>
        {ScreenStyle}
        <style jsx>{`

        `}</style>
      </div>
    )
  }
}
