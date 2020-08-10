import React from "react";
import { Button as UnstyledButton } from "react-bootstrap";
import { Button } from "../../Components/Buttons";
import styled from "styled-components";

const AddToCartButton = ({ id, addToCart = (f) => f }) => {
  return (
    <Button block variant="primary" onClick={() => addToCart(id)}>
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;