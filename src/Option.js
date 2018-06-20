import React from 'react';

export default class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    const { isSelected, children, onClick, ...rest } = this.props;

    return(
      <div {...rest}>
        {isSelected ? (<span>✅</span>) : null}{children}
      </div>
    )
  }

}
