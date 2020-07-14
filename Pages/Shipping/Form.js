import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withOrderService } from "../../Services";

const DEFAULT_SHIPPING = {
  addressLine1: "",
  addressLine2: "",
  name: "",
  city: "",
};

const ShippingForm = ({ placeOrder = (f) => f }) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [shipping, setShipping] = useState(DEFAULT_SHIPPING);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("FOR WAS INVALID!");
    }
    // TODO --- placeOrder(shipping)} valid={formIsValid}
    // TODO Input fields to create shipping object
    setFormIsValid(true);
    console.log("FORM WAS VALID!");
  };

  return (
    <Form submit={handleSubmit}>
      <Form.Group id="input name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" required></Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Name is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group id="input Address Line 1">
        <Form.Label>Address</Form.Label>
        <Form.Control
          required
          name="addressLine1"
          type="text"
          placeholder="Line 1"
        ></Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide line 1 of address.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group id="input Address Line 2">
        <Form.Label>Address</Form.Label>
        <Form.Control
          name="addressLine2"
          type="text"
          placeholder="Line 2"
          required
        ></Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide line 2 of address.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group id="input City">
        <Form.Label>City</Form.Label>
        <Form.Control name="city" type="text" required></Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide a valid city.
        </Form.Control.Feedback>
      </Form.Group>

      <Button id="Submit Order" variant="primary" type="submit">
        Place Order
      </Button>
    </Form>
  );
};

export default withOrderService(ShippingForm);
