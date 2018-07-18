import React from 'react';

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import MockCheckENSQuery from './MockCheckENSQuery'
import { Link } from "react-router-dom";

import Screen from './Screen';
import H1 from './H1';
import GlassButton from './GlassButton';
import GlassTextInput from './GlassTextInput'
import { default as colors } from './colors';

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
      <Screen>
        <MockCheckENSQuery skip={!runENSQuery} subdomain={subdomain}>
          {
            ({ loading, error, data }) => {
              const cannotRegister = !(data&&data.checkENS.available);
              const inputIcon = data?(data.checkENS.available?"✅":"❌"):"🖋";

              return (
                <div className="shrinkwrap-container">
                  <div className="header">
                    <H1>Pick A Username</H1>
                  </div>
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

        <style jsx>{`
          .header{
            margin-bottom: 10px;
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
      </Screen>
    )
  }
}
