import React from 'react';

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import MockCheckENSQuery from './MockCheckENSQuery'
import { Link } from "react-router-dom";

import { default as colors } from './colors';
import ScreenStyles from "./ScreenStyles";

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
        <div className="shrinkwrap-container">
          <div className="header">Pick A Username</div>
          <input className="subdomain-input" value={subdomain} onChange={this.handleInput} name="subdomain" type="text" />
          <div className="availability">
            <MockCheckENSQuery skip={!subdomain} subdomain={subdomain}>
              {({ loading, error, data }) => {
                if (loading) return `Loading...`;
                if (error) return `Error!: ${error}`;
                return (
                  <div className="ens-check-results">
                    {data.checkENS.available?"available":"not available"}
                  </div>
                );
              }}
            </MockCheckENSQuery>
          </div>
          <div className="buttons">
            <Link className="button" to="/welcome">
              {`< Nevermind`}
            </Link>
            <Link className="button" to="/phone-verification">
              {`Register >`}
            </Link>
          </div>
        </div>
        {ScreenStyles}
        <style jsx>{`
          .header {
            font-family: Lobster;
            font-size: 64px;
            font-weight: 700;
            text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
            color: ${colors.white2};
          }

          .shrinkwrap-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .subdomain-input{
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            border: none;
            border-radius: 5px;
            margin-top: 10px;
            font-size: 24px;
            text-align: center;
            color: ${colors.blue2};
          }

          .availability{
            margin-top: 5px;
            height: 1em;
            color: ${colors.white2};
          }

          .buttons{
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            width: 100%;
          }

          .buttons :global(.button){
            color: ${colors.blue2};
            text-decoration: none;
            background: ${colors.white2};
            padding: 10px;
            border-radius: 5px;
            margin-left: 20px;
            flex-grow: 1;
            text-align: center;
          }

          .buttons :global(.button:first-child){
            margin-left: 0;
          }
        `}</style>
      </div>
    )
  }
}
