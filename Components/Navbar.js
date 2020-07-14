import React from "react";
import {
  Button,
  DropdownButton,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory, useRouteMatch } from "react-router";
import * as ROUTES from "../Constants/routes";
import { AuthUserContext } from "../../../shared/Session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => {
  let { path, url } = useRouteMatch();
  return (
    <Navbar expand="md" style={{ borderBottom: "3px solid #e7e7e7" }}>
      <LinkContainer to={`${path}${ROUTES.LANDING}`}>
        <Navbar.Brand>
          <Button
            size="sm"
            variant="success"
            style={{
              padding: "10px",
              margin: "0px",
              spacing: "0px",
            }}
          >
            Portfolio Home
          </Button>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <LinkContainer to={`${path}${ROUTES.LANDING}`}>
        <Nav.Link>
          <Button
            size="sm"
            style={{
              backgroundColor: "#c1d62e",
              borderColor: "#c1d62e",
            }}
          >
            Products
          </Button>
        </Nav.Link>
      </LinkContainer>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={`${path}${ROUTES.CART}`}>
            <Nav.Link>
              <Button size="sm" variant="light">
                Cart
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${path}${ROUTES.CHECK_OUT}`}>
            <Nav.Link>
              <Button size="sm" variant="light">
                Check-Out
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${path}${ROUTES.ORDERS}`}>
            <Nav.Link>
              <Button size="sm" variant="light">
                My Orders
              </Button>
            </Nav.Link>
          </LinkContainer>
          <Nav.Link>
            <DropdownButton
              size="sm"
              title="Example Pages"
              id="basic-nav-dropdown"
              variant="info"
              className="justify-center"
            >
              <LinkContainer to={`${path}${ROUTES.ORDERS}`}>
                <NavDropdown.Item>(EXAMPLE) Admin Orders</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to={`${path}${ROUTES.ORDER_SUCCESS}`}>
                <NavDropdown.Item>(EXAMPLE) Order Success</NavDropdown.Item>
              </LinkContainer>
            </DropdownButton>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavigationNonAuth = () => {
  let { path, url } = useRouteMatch();
  return (
    <Navbar expand="md" style={{ borderBottom: "3px solid #e7e7e7" }}>
      <LinkContainer to={`${path}${ROUTES.LANDING}`}>
        <Navbar.Brand>
          <Button
            size="sm"
            variant="success"
            style={{
              padding: "10px",
              margin: "0px",
              spacing: "0px",
            }}
          >
            Portfolio Home
          </Button>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <LinkContainer to={`${path}${ROUTES.LANDING}`}>
        <Nav.Link>
          <Button
            size="sm"
            style={{
              backgroundColor: "#c1d62e",
              borderColor: "#c1d62e",
            }}
          >
            Products
          </Button>
        </Nav.Link>
      </LinkContainer>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={`${path}${ROUTES.CART}`}>
            <Nav.Link>
              <Button size="sm" variant="light">
                Cart
              </Button>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${path}${ROUTES.CHECK_OUT}`}>
            <Nav.Link>
              <Button size="sm" variant="light">
                Check-Out
              </Button>
            </Nav.Link>
          </LinkContainer>

          <Nav.Link>
            <DropdownButton
              size="sm"
              title="Example Pages"
              id="basic-nav-dropdown"
              variant="info"
              className="justify-center"
            >
              <LinkContainer to={`${path}${ROUTES.ORDERS}`}>
                <NavDropdown.Item>(EXAMPLE) Admin Orders</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to={`${path}${ROUTES.ORDER_SUCCESS}`}>
                <NavDropdown.Item>(EXAMPLE) Order Success</NavDropdown.Item>
              </LinkContainer>
            </DropdownButton>
          </Nav.Link>
          <Nav.Link>
            <LinkContainer to={`/sign-in`}>
              <Nav.Link>
                <Button size="sm" variant="success">
                  Sign In
                </Button>
              </Nav.Link>
            </LinkContainer>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
