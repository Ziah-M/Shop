import React from "react";
import { Button as UnstyledButton } from "react-bootstrap";
import styled from "styled-components";

const AddToCartButton = ({ id, addToCart = (f) => f }) => {
  return (
    <Button block variant="primary" onClick={() => addToCart(id)}>
      Add To Cart
    </Button>
  );
};

const Button = styled(UnstyledButton)`
  cursor: pointer;
`;

export default AddToCartButton;
