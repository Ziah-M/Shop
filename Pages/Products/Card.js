import React from "react";
import { Card as UnstyledCard } from "react-bootstrap";
import AddToCartButton from "./AddToCartButton";
import ProductQuantity from "./QuantityBar";
import styled from "styled-components";

const ProductCard = ({
  product: { uid: id, title:name, price = "$0.00", imageUrl = "" },
  qty = 0,
  addToCart = (f) => f,
  removeFromCart = (f) => f,
}) => {
  return !id ? (
    "Not found"
  ) : (
    <Card>
      <Img variant="top" src={imageUrl} alt={name} />
      <Card.Body>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="text-center">${price}</Card.Text>
      </Card.Body>
      <Footer>
        {qty <= 0 ? (
          <AddToCartButton id={id} addToCart={addToCart}/>
        ) : (
          <ProductQuantity
            id={id}
            cartQty={qty}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        )}
      </Footer>
    </Card>
  );
};

const Card = styled(UnstyledCard)`
  margin-top: 30px;
`;

const Img = styled(Card.Img)`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Footer = styled(Card.Footer)`
  padding: 0;
`;

export default ProductCard;
