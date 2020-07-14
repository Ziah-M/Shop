import React, { useEffect } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import Card from "./Card";
import { Container, Row, Col, Button } from "react-bootstrap";
import {withProductService, withCartService} from '../../Services'
import { compose } from "recompose";

const Products = ({
  productsMatchingCategory:products,
  productCategories:categories,
  addToCart = (f) => f,
  removeFromCart = (f) => f,
  selectedCategory,
  setSelectedProductCategory:setSelectedCategory = (f) => f,
  getCartQty = (f) => f,
}) => {
  // TODO --- append cartQty for all products
  // 2. map over the products and append the cartQty using getCartQty(id)
  return (
    <Container fluid>
      <Row>
        <Col lg={3} md={4} sm={9} xs={12}>
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Col>
        <Col>
          <Row>
            {products.map((product, index) => (
              <Col key={index} lg={4} md={6}>
                <Card
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  product={product}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default compose(withCartService, withProductService)(Products);