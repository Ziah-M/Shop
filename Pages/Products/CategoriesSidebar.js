import React from "react";
import {
  ListGroup as List,
  ListGroupItem as ListItem,
  Container as UnstyledContainer,
} from "react-bootstrap";
import styled from "styled-components";

const DEFAULT_CATEGORIES = ["All", "Dairy", "Savory", "Frozen"];

const CategoriesSidebar = ({
  categories = DEFAULT_CATEGORIES,
  selectedCategory = "All",
  setSelectedCategory = (f) => f,
}) => {
  return (
    <Container>
      <List>
        {categories.map((category) => (
          <ListItem
            action
            onClick={() => setSelectedCategory(category)}
            active={selectedCategory === category}
          >
            {category}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const Container = styled(UnstyledContainer)`
  position: sticky;
  top: 80px;
`;

export default CategoriesSidebar;
