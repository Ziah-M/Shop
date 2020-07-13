import React, { Component } from "react";

const withProductService = (ComposedComponent) => {
  class WithProductService extends Component {
      constructor(props) {
          super(props)
      }
      
    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }
  return WithProductService
};

export default withProductService;
