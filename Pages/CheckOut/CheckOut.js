import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CartSummary from "../Cart/CartSummary";
import Shipping from "../Shipping";

const CheckOut = () => {
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
          <CartSummary />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOut;
