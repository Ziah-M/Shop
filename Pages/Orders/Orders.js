import React from "react";
import { Container, Table, Nav } from "react-bootstrap";
import { withOrderService } from "../../Services";
import { withRouter } from "react-router-dom";

const DEFAULT_ORDERS = [
  { shipping: { name: "testOrder1" }, datePlaced: "testDate1" },
  { shipping: { name: "testOrder2" }, datePlaced: "testDate2" },
];

const Orders = ({ orders = DEFAULT_ORDERS }) => {
  return (
    <Container>
      <h1>Orders</h1>
      <Table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th></th>
          </tr>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order.shipping.name}</td>
                <td>{order.datePlaced}</td>
                <td>
                  <Nav.Link>View</Nav.Link>
                </td>
              </tr>
            ))}
          </tbody>
        </thead>
      </Table>
    </Container>
  );
};

export default withOrderService(withRouter(Orders));
