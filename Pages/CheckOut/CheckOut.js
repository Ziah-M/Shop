import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CartSummary from "../Cart/CartSummary";
import Shipping from "../Shipping";
import withCartService from "../../Services/withCartService";
import { withProductService } from "../../Services";

const CheckOut = (props ) => {
  var totalQty = 0;
  var totalPrice = 0;

  props.cartItems.map((item) => {
    totalQty = totalQty + item.qty;
    totalPrice =
      totalPrice + item.qty * props.getProductById(item.productId).price;
  });

  return (
    <Container>
      <Row>
        <h2>Shipping</h2>
      </Row>
      <Row>
        <Col xs={6}>
          <Shipping />
        </Col>
        <Col xs={6}>
          <CartSummary items={props.cartItems} totalPrice={totalPrice} getProductById={props.getProductById}/>
        </Col>
      </Row>
    </Container>
  );
};

export default withCartService(withProductService(CheckOut));
