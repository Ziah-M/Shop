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
      console.log(
        "TODO -- place order not implmented. here is the shipping object:" +
          Object.values(shipping)
      );
      return;
      const uid = this.props.authUser.user.uid;
      const order = {
        userId: uid,
        shipping: shipping,
        cartItems: this.state.cartItems,
      };
      this.props.firebase
        .orders(uid)
        .push(order)
        .then((res) => {
          this.props.clearCart();
          this.props.history.push(ROUTES.ORDER_SUCCESS);
          // (TODO use order push (result.key) as a query parameter to have a custom
          //  order success page that shows the order)
        })
        .catch((error) => this.props.history.push(ROUTES.ORDER_FAIL));
    }

    getOrdersByUser(userId) {
      // Return array of order objects
    }

    getAllOrders() {
      // Should return an array of user IDs with order objects
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
