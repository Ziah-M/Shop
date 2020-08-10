import React from "react";
import {
  Card,
  Container,
  ListGroup as List,
} from "react-bootstrap";
import { withCartService } from "../../Services";
import { ListItem } from "../../Components/List";

const CartSummary = ({ items, totalPrice = 0, totalQty=0, getProductById=f=>f }) => {
  return (
    <Container fluid>
      {items ? (
        <Card>
          <Card.Body>
            <Card.Title>Order Summary</Card.Title>
            <Card.Text>You have {totalQty} items in your cart.</Card.Text>
            <List variant="flush">
              {items.map((item) => {
                const product = getProductById(item.productId)
                return (
                <ListItem>
                  <span>
                    {item.qty} x {product.title}
                  </span>
                  <Container style={{ float: "right" }}>
                    <span>${item.qty * product.price}</span>
                  </Container>
                </ListItem>
              )})}
              <ListItem>
                <span>
                  <b>Total</b>
                </span>
                <Container style={{ float: "right" }}>$ {totalPrice}</Container>
              </ListItem>
            </List>
          </Card.Body>
        </Card>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default withCartService(CartSummary);
