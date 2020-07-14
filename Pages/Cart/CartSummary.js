import React from "react";
import {
  Card,
  Container,
  ListGroup as List,
  ListGroupItem as ListItem,
} from "react-bootstrap";
import { withCartService } from "../../Services";

const CartSummary = ({ items, totalPrice = 0 }) => {
  return (
    <Container fluid>
      {items ? (
        <Card>
          <Card.Body>
            <Card.Title>OrderSummary</Card.Title>
            <Card.Text>You have {items.length} items in your cart.</Card.Text>
            <List variant="flush">
              {items.map((item) => (
                <ListItem>
                  <span>
                    {item.qty} x {item.product.title}
                  </span>
                  <Container style={{ float: "right" }}>
                    <span>${item.qty * item.product.price}</span>
                  </Container>
                </ListItem>
              ))}
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
