import React from "react";
import {
  Container as UnstyledContainer,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import styled from "styled-components";

const QuantityBar = ({
  id,
  cartQty = 0,
  addToCart = (f) => f,
  removeFromCart = (f) => f,
}) => {
  return (
    <Container fluid>
      <Row noGutters>
        <Col xs={2}>
          <Button block variant="secondary" onClick={() => removeFromCart(id)}>
            -
          </Button>
        </Col>
        <Col className="text-center">{cartQty} in Cart</Col>
        <Col xs={2}>
          <Button block variant="secondary" onClick={() => addToCart(id)}>
            +
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled(UnstyledContainer)`
  height: 37px;
  line-height: 37px;
`;

export default QuantityBar;
