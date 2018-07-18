import React from 'react';

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import MockCheckENSQuery from './MockCheckENSQuery'
import { Link } from "react-router-dom";

import H1 from './H1';
import GlassButton from './GlassButton';
import GlassTextInput from './GlassTextInput'
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
      runENSQuery: false,
      subdomain: ""
    };
    this.inputDebounceTimeout = null;
  }

  handleInput = (e) => {
    const subdomain = e.target.value;
    this.setState({subdomain, runENSQuery:false});

    if(subdomain!==""){
      clearTimeout(this.inputDebounceTimeout);
      this.inputDebounceTimeout = setTimeout(()=>{
        this.inputDebounceTimeout = null;
        this.setState({runENSQuery:true});
      }, 300)
    }
  }

  render() {
    const {runENSQuery, subdomain} = this.state;
    return(
      <div className="screen-container">

        <MockCheckENSQuery skip={!runENSQuery} subdomain={subdomain}>
          {
            ({ loading, error, data }) => {
              const cannotRegister = !(data&&data.checkENS.available);
              const inputIcon = data?(data.checkENS.available?"✅":"❌"):"🖋";

              return (
                <div className="shrinkwrap-container">
                  <H1>Pick A Username</H1>
                  <GlassTextInput className="subdomain-input" tail=".multiapp.eth" icon={inputIcon} autoFocus value={subdomain} onChange={this.handleInput} name="subdomain" type="text" />
                  <div className="buttons">
                    <Link to="/welcome">
                      <GlassButton>{`Nevermind`}</GlassButton>
                    </Link>
                    <Link to="/phone-verification">
                      <GlassButton disabled={cannotRegister}>{`Register`}</GlassButton>
                    </Link>
                  </div>
                </div>
              )
            }
          }
        </MockCheckENSQuery>


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

          .buttons{
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            width: 100%;
          }

          .buttons > :global(*){
            margin-left: 20px;
            width: 50%;
          }

          .buttons > :global(*:first-child){
            margin-left: 0;
          }
        `}</style>
      </div>
    )
  }
}
