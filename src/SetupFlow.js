import React from 'react';

import { default as colors } from './colors';
import WelcomeScreen from './WelcomeScreen';

export default class SetupFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ScreenComponent: WelcomeScreen,
      props: {},
      history: []
    };
  }

  next = (nextScreenComponent, nextProps) => {
    const {history, ScreenComponent, props} = this.state;
    history.push({ScreenComponent, props});
    this.setState({ScreenComponent:nextScreenComponent, props:nextProps, history});
  }

  back = () => {
    const {history} = this.state;
    if(history.length<=0) return;
    const {ScreenComponent, props} = history.pop();
    this.setState({ScreenComponent, history});
  }

  finish = () =>{

  }

  render() {
    const {ScreenComponent, props} = this.state;

    return (
      <div className="flow-container">
        <ScreenComponent next={this.next} back={this.back} finish={this.finish} {...props} />
        <style jsx>{`
          .flow-container {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
