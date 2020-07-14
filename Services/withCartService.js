import React, { Component } from "react";
import { withFirebase } from "../../../shared/Firebase";

const INITIAL_STATE = { cart: {}, cartId: "" };

const defaultCart = {
  dateCreated: new Date().getTime(),
  items: {},
};

const withCartService = (ComposedComponent) => {
  class WithCartService extends Component {
    constructor(props) {
      super(props);

      this.state = {
        ...INITIAL_STATE,
      };
      this.getOrCreateNewCart = this.getOrCreateNewCart.bind(this);
      this.createNewCart = this.createNewCart.bind(this);
      this.addToCart = this.addToCart.bind(this);
      this.removeFromCart = this.removeFromCart.bind(this);
      this.clearCart = this.clearCart.bind(this);
      this.getQuantityInCart = this.getQuantityInCart.bind(this);
      this.updateCartItem = this.updateCartItem.bind(this);
      this.getCartItems = this.getCartItems.bind(this);
      this.getTotalPrice = this.getTotalPrice.bind(this);

      //TODO - DEBOUNCE UPDATE CART ITEM
    }

    componentDidMount() {
      this.getOrCreateNewCart();
    }

    componentWillUnmount() {
      this.props.firebase.cart(this.state.cartId).off();
    }

    getOrCreateNewCart() {

      const cartIdInLocalStorage = localStorage.getItem("cartid");
      if (!cartIdInLocalStorage) {
        console.log(
          "FAIL! Didn't find a cartId in the local storage:  " +
            cartIdInLocalStorage
        );
        this.createNewCart();
      } else {

        this.props.firebase
          .cart(cartIdInLocalStorage)
          .once("value", (snapshot) => {
            if (!snapshot.exists()) {

              this.createNewCart(); 
            } else {
 
              this.props.firebase
                .cartItems(cartIdInLocalStorage)
                .on("value", (snapshot) => {
                  const cartObject = { ...snapshot.val() };
                  console.log(
             
                  );
                  this.setState({ cart: cartObject });
                });
              this.setState({ cartId: cartIdInLocalStorage });
            }
          });
      }
    }

    createNewCart() {

      const newCartReference = this.props.firebase
        .carts()
        .push({ dateCreated: new Date().getTime() });
      const newCartKey = newCartReference.getKey(); /
      localStorage.setItem("cartid", newCartKey);
      console.log("local storage was set to: ", localStorage.getItem("cartid"));
      this.props.firebase.cartItems(newCartKey).on("value", (snapshot) => {
 
        const cartObject = { ...snapshot.val() };

        this.setState({ cart: cartObject });
      });
      this.setState({ cartId: newCartKey });
    }

    addToCart(product) {
      this.updateCartItem(product, +1);
    }

    removeFromCart(product) {
      this.updateCartItem(product, -1);
    }

    clearCart() {
      const { cartId } = this.state;

      this.props.firebase
        .cartItems(cartId)
        .remove()
        .then(function () {
       
        })
        .catch(function (error) {
        
        });
    }

    updateCartItem(product, quantityChange) {
      console.log("UPDATING CART NOW WITH: " + Object.values(product));
      if (!!product.title) {
        this.props.firebase
          .cartItem(this.state.cartId, product.title)
          .once("value", (snapshot) => {
            if (!snapshot.exists()) {
              quantityChange > 0
                ? this.props.firebase
                    .cartItem(this.state.cartId, product.title)
                    .set({ product, quantity: 1 })
                :;
            } else {
              this.props.firebase
                .cartItem(this.state.cartId, product.title)
                .update({ quantity: snapshot.val().quantity + quantityChange });
            }
          });
      } else {
      }
    }

    getQuantityInCart(productTitle) {
      try {
        return this.state.cart[productTitle].quantity;
      } catch {
        return 0;
      }
    }

    getCartItems() {
      const cartItems = Object.values(this.state.cart);
      console.log("CART ITEMS IN GETCARTITEMS", cartItems);
      return cartItems;
    }

    getTotalPrice(cartItems = []) {
      return cartItems.reduce((acc, cur) => {
        return acc + cur.quantity * cur.product.price;
      }, 0);
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
          getQuantityInCart={this.getQuantityInCart}
          clearCart={this.clearCart}
          getCartItems={this.getCartItems}
          cartItems={this.getCartItems()}
          totalPrice={this.getTotalPrice(this.getCartItems())}
        />
      );
    }
  }
  return withFirebase(WithCartService);
};

export default withCartService;
