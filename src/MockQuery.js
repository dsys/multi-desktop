import React from 'react';

export default class MockQuery extends React.Component {
  render(){
    const {skip=false, loading=false, error=null, mockData={}, query, variables} = this.props;
    if(skip) return null;
    return(
      <div className="mock-query-container">
        {this.props.children({loading, error, data:mockData})}
      </div>
    );
  }
}
