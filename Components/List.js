import { ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";

const ListItem = styled(ListGroupItem)`
  &.active {
    background-color: #c1d62e;
    border-color: #c1d62e;
  }
`;

export { ListItem };
