import React, { Component } from "react";
import { withFirebase } from "../../../shared/Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../Constants/routes";
import withCartService from "./withCartService";
import { compose } from "recompose";
import withAuthentication from "../../../shared/Session/withAuthentication";

const DEFAULT_ORDER_MODEL = {
  // TODOO Add datePlaced when generating a new order
  userId: 0,
  shipping: {},
  cartItems: [],
};

const INITIAL_STATE = {
  myOrders: [],
};

const withOrderService = (ComposedComponent) => {
  class WithOrderService extends Component {
    constructor(props) {
      super(props);

      this.state = INITIAL_STATE;

      this.placeOrder = this.placeOrder.bind(this);
      this.getOrdersByUser = this.getOrdersByUser.bind(this);
      this.getAllOrders = this.getAllOrders.bind(this);
    }

    placeOrder(shipping = {}) {
    }

    getOrdersByUser(userId) {
    }

    getAllOrders() {
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          placeOrder={this.placeOrder}
          getOrdersByUser={this.getOrdersByUser}
          getAllOrders={this.getAllOrders}
        />
      );
    }
  }
  return compose(
    withFirebase,
    withCartService,
    withRouter,
    withAuthentication
  )(WithOrderService);
};

export default withOrderService;
