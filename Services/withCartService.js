import React, { Component } from "react";

const withCartService = (ComposedComponent) => {
  class WithCartService extends Component {
      constructor(props) {
          super(props)
      }
      
    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }
  return WithCartService
};

export default withCartService;
