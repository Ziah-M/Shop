import React from "react";
import { Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Constants/routes";
import QuantityBar from "../Products/QuantityBar";
import { withCartService } from "../../Services";
import styled from "styled-components";

const Cart = ({
  items = [],
  addToCart = (f) => f,
  removeFromCart = (f) => f,
  clearCart = (f) => f,
  totalPrice = 0,
}) => {
  const totalQty = items.length;
  return (
    <Container fluid>
      <Header totalQty={totalQty} clearCart={clearCart} />
      <ItemsTable
        items={items}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        totalQty={totalQty}
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
      <Button onClick={clearCart} variant="danger" size="sm">
        Clear Cart
      </Button>
    </p>
  </>
);

const ClearCartButton = styled(Button)`
  float: right;
`;

const ItemsTable = ({
  items,
  totalQty,
  totalPrice,
  addToCart,
  removeFromCart,
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
              if (!item.product || item.quantity < 1) return <div></div>; //avoid undefined + 0 quantity
              return (
                <tr>
                  <td
                    style={{
                      backgroundImage: `url(${item.product.imageUrl})` || "",
                      width: "80px",
                      height: "80px",
                      borderRadius: "100%",
                      backgroundSize: "cover",
                      padding: "10px",
                    }}
                    className="thumbnail"
                  ></td>
                  <td>{item.product.title}</td>
                  <td>
                    <QuantityBar
                      product={item.product}
                      qty={item.qty}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                  </td>
                  <td className="text-right">
                    $ {item.qty * item.product.price}
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

export default withCartService(Cart);
