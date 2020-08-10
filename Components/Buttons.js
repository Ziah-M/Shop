import { Button as UnstyledButton } from "react-bootstrap";
import styled from "styled-components";

const Button = styled(UnstyledButton)`
  cursor: pointer;

  &.btn-primary {
    background-color: #c1d62e;
    border-color: #c1d62e;
  }

  &:hover {
    background-color: #b1c522;
    border-color: #b1c522;
  }

  &.btn-primary-disabled {
    background-color: #c1d62e;
    border-color: #c1d62e;
  }
`;

export { Button };
