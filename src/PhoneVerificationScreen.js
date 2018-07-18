import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import Screen from "./Screen";
import H1 from "./H1";
import GlassTextInput from "./GlassTextInput";
import GlassButton from "./GlassButton";

const GQL_mutation_startPhoneNumberVerification = gql(`
  mutation startPhoneNumberVerification($phoneNumber: String!) {
    startPhoneNumberVerification(input: {phoneNumber: $phoneNumber}){
      ok
      message
    }
  }
`);

const GQL_mutation_checkPhoneNumberVerification = gql(`
  mutation checkPhoneNumberVerification($phoneNumber: String!, $verificationCode: String!) {
    checkPhoneNumberVerification(input: {phoneNumber: $phoneNumber, verificationCode: $verificationCode}){
      ok
      message
      phoneNumber {
        hashedPhoneNumber
      }
      phoneNumberToken
      phoneNumberTokenExpires
    }
  }
`);

class PhoneVerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      verificationCode: "",
      verificationCodeSent: false
    };
  }

  handleInput = e => {
    const {verificationCodeSent} = this.state;
    if(verificationCodeSent){
      this.setState({verificationCode:e.target.value})
    } else {
      this.setState({phoneNumber:e.target.value})
    }
  };

  getSendCodeHandler = mutation => {
    return e => {
      e.preventDefault();
      const { phoneNumber } = this.state;
      mutation({ variables: { phoneNumber } });
      this.setState({verificationCodeSent: true});
    };
  };

  getVerifyHandler = mutation => {
    return e => {
      e.preventDefault();
      const { history } = this.props;
      const { phoneNumber, verificationCode } = this.state;
      mutation({ variables: { phoneNumber, verificationCode } });
      this.setState({verified: true});
      history.push('/link-device')
    }
  }

  render() {
    const { phoneNumber, verificationCode, verificationCodeSent } = this.state;
    return (
      <Screen>
        <Mutation mutation={GQL_mutation_startPhoneNumberVerification}>
          {(startPhoneNumberVerification, { data:sendCodeData }) => (
            <Mutation mutation={GQL_mutation_checkPhoneNumberVerification}>
              {(checkPhoneNumberVerification, { data:verifyData }) => (
                <div className="shrinkwrap-container">
                  <div className="header">
                    <H1>Can I get your number?</H1>
                  </div>
                  <GlassTextInput
                    value={verificationCodeSent?verificationCode:phoneNumber}
                    onChange={this.handleInput}
                    className="phone-input"
                    type={verificationCodeSent?"number":"tel"}
                    placeholder={verificationCodeSent?"1 2 3 4 5 6":"+1 (123) 581-3213"}
                  />
                  <div className="buttons">
                    <Link to="/welcome">
                      <GlassButton>{`Back`}</GlassButton>
                    </Link>
                    {
                      verificationCodeSent?
                      (
                        <GlassButton
                          onClick={this.getVerifyHandler(
                            checkPhoneNumberVerification
                          )}
                        >{`Verify`}</GlassButton>
                      ):
                      (
                        <GlassButton
                          onClick={this.getSendCodeHandler(
                            startPhoneNumberVerification
                          )}
                        >{`Send Code`}</GlassButton>
                      )
                    }

                  </div>
                </div>
              )}
            </Mutation>
          )}
        </Mutation>

        <style jsx>{`
          .header {
            margin-bottom: 10px;
          }

          .shrinkwrap-container :global(.phone-input) {
            text-align: center;
          }

          .buttons {
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            width: 100%;
          }

          .buttons > :global(*) {
            margin-left: 20px;
            width: 50%;
          }

          .buttons > :global(*:first-child) {
            margin-left: 0;
          }
        `}</style>
      </Screen>
    );
  }
}

export default withRouter(PhoneVerificationScreen);
