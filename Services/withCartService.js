import React, { Component } from "react";
import { withFirebase } from "../../../shared/Firebase";

const DEFAULT_CART = {
  dateCreated: new Date().getTime(),
  items: [],
};

const DEFAULT_CART_ITEM = {
  productId: "",
  qty: 0,
};

const INITIAL_STATE = {
  cartId: "",
  cart: DEFAULT_CART,
};

const withCartService = (ComposedComponent) => {
  class WithCartService extends Component {
    constructor(props) {
      super(props);

      this.state = {
        ...INITIAL_STATE,
      };

      this.getOrCreateNewCart = this.getOrCreateNewCart.bind(this);
      this.createNewCart = this.createAndListenToNewCart.bind(this);
      this.addToCart = this.addToCart.bind(this);
      this.removeFromCart = this.removeFromCart.bind(this);
      this.clearCart = this.clearCart.bind(this);
      this.getQuantityInCart = this.getQuantityInCart.bind(this);
      this.updateCartItem = this.updateCartItem.bind(this);
      this.listenToCart = this.listenToCart.bind(this);

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
        console.log("Failed to find a cart ID in local storage");
        this.createAndListenToNewCart();
      } else {
        this.props.firebase
          .cart(cartIdInLocalStorage)
          .once("value", (snapshot) => {
            if (!snapshot.exists()) {
              console.log(
                "Cart ID found in local storage was not found in firebase"
              );
              this.createAndListenToNewCart();
            } else {
              this.listenToCart(cartIdInLocalStorage);
            }
          });
      }
    }

    listenToCart(cartId) {
      console.log("Listening to changes to cart: ", cartId, " in firebase");

      this.props.firebase.cartItems(cartId).on("value", (snapshot) => {
        const cartObject = { ...snapshot.val() };
        this.setState({ cart: cartObject });
      });
      this.setState({ cartId });
    }

    createAndListenToNewCart() {
      console.log("Creating new cart");

      const newCartReference = this.props.firebase
        .carts()
        .push(DEFAULT_CART);

      //Google's recommended best-practice for obtaining the key
      const newCartId = newCartReference.getKey();

      localStorage.setItem("cartid", newCartId);
      this.listenToCart(newCartId);
    }

    addToCart(productId) {
      console.log("Adding to cart: ", productId);
      this.updateCartItem(productId, +1);
    }

    removeFromCart(productId) {
      this.updateCartItem(productId, -1);
    }

    clearCart() {
      const { cartId } = this.state;

      this.props.firebase
        .cartItems(cartId)
        .remove()
        .then(function () {
          console.log("Cart was cleared successfully");
        })
        .catch(function (error) {
          console.log("Failed to clear cart" + error.message);
        });
    }

    updateCartItem(productId = "", quantityChange = 0) {
      const { cartId } = this.state;

      this.props.firebase
        .cartItem(cartId, productId)
        .once("value", (snapshot) => {
          if (!snapshot.exists()) {
            quantityChange > 0
              ? this.props.firebase
                  .cartItem(cartId, productId)
                  .set({ productId, qty: 1 })
              : console.log(
                  "Failed to remove item as it was not found in the cart"
                );
          } else {
            this.props.firebase
              .cartItem(cartId, productId)
              .update({ qty: snapshot.val().qty + quantityChange });
          }
        });
    }

    getQuantityInCart(productId) {
      const { cart } = this.state;
      const foundInCart = cart.items.filter(
        (item) => item.productId === productId && item.qty > 0
      );

      if (!foundInCart) return 0;
      return foundInCart.qty;
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
          getCartQty={this.getQuantityInCart}
          clearCart={this.clearCart}
        />
      );
    }
  }
  return withFirebase(WithCartService);
};

export default withCartService;
