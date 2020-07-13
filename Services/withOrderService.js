import React, { Component } from "react";

const withOrderService = (ComposedComponent) => {
  class WithOrderService extends Component {
      constructor(props) {
          super(props)
      }
      
    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }
  return WithOrderService
};

export default withOrderService;
