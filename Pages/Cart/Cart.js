import React from "react";
import { Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Constants/routes";
import QuantityBar from "../Products/QuantityBar";
import { withCartService, withProductService } from "../../Services";
import styled from "styled-components";

const Cart = (props) => {
  var totalQty = 0;
  var totalPrice=0;

  props.cartItems.map(item => {
    totalQty=totalQty+item.qty;
    totalPrice=totalPrice+item.qty*props.getProductById(item.productId).price
  })

  return (
    <Container fluid>
      <Header totalQty={totalQty} clearCart={props.clearCart} />
      <ItemsTable
        {...props}
        totalPrice={totalPrice}
      />
    </Container>
  );
};

const Header = ({ totalQty, clearCart }) => (
  <>
    <h1>Shopping Cart</h1>
    <p>
      You have {totalQty} items in your cart.
      <ClearCartButton onClick={clearCart} variant="danger" size="sm">
        Clear Cart
      </ClearCartButton>
    </p>
  </>
);

const ClearCartButton = styled(Button)`
  float: right;
`;

const ItemsTable = ({
  cartItems: items,
  totalPrice,
  addToCart,
  removeFromCart,
  getProductById = f=>f
}) => (
  <>
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th className="text-center" style={{ width: "230px" }}>
            Quantity
          </th>
          <th className="text-right" style={{ width: "200px" }}>
            Price
          </th>
        </tr>
      </thead>

      <tbody>
        {!items
          ? ""
          : items.map((item) => {
              if (!item || item.qty < 1) return <div></div>;
              
              const product = getProductById(item.productId)
              return (
                <tr>
                  <td
                    style={{
                      backgroundImage: `url(${product.imageUrl})` || "",
                      width: "80px",
                      height: "80px",
                      borderRadius: "100%",
                      backgroundSize: "cover",
                      padding: "10px",
                    }}
                    className="thumbnail"
                  ></td>
                  <td>{product.title}</td>
                  <td>
                    <QuantityBar
                      id={product.uid}
                      cartQty={item.qty}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                  </td>
                  <td className="text-right">
                    $ {item.qty * product.price}
                  </td>
                </tr>
              );
            })}
      </tbody>

      <tfoot>
        {totalPrice > 0 ? (
          <tr>
            <th>
              {" "}
              <Link to={ROUTES.CHECK_OUT} className="btn btn-primary">
                Check Out
              </Link>
            </th>
            <th></th>
            <th></th>
            <th className="text-right">$ {totalPrice}</th>
          </tr>
        ) : (
          ""
        )}
      </tfoot>
    </Table>
  </>
);

export default withCartService(withProductService(Cart));
