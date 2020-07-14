import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../../shared/Firebase";
import { convertObjectToList } from "../Services/helperFunctions";
import * as action from "../../../shared/redux/actionCreators";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    selectedProductCategory: state.shop.selectedProductCategory,
    products: state.shop.products,
    productCategories: state.shop.productCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedProductCategory: (filter) =>
      dispatch(action.doSetProductFilter(filter)),

    setProducts: (products) => dispatch(action.doSetProducts(products)),

    setProductCategories: (categories) =>
      dispatch(action.doSetProductCategories(categories)),
  };
};

const withProductService = (ComposedComponent) => {
  class WithProductService extends Component {
    constructor(props) {
      super(props);

      this.getProductCategories = this.getProductCategories.bind(this);
      this.populateProducts = this.populateProducts.bind(this);
      this.filterByProductsMatchingCategory = this.filterByProductsMatchingCategory.bind(
        this
      );
      this.setSelectedCategory = this.setSelectedCategory.bind(this);
      this.createNewProduct = this.createNewProduct.bind(this);
      this.getProductById = this.getProductById.bind(this);
      this.updateProductById = this.updateProductById.bind(this);
      this.deleteProductById = this.deleteProductById.bind(this);
    }

    componentDidMount() {
      this.getProductCategories();
      this.populateProducts();
    }

    componentWillUnmount() {
      this.props.firebase.products().off();
      this.props.firebase.categories().off();
    }

    // TODO -> extract this firebase logic as a seperate function
    getProductCategories() {
      this.props.firebase.categories().on("value", (snapshot) => {
        const categoriesObject = snapshot.val();

        if (!categoriesObject) {
          // NULL case
          this.props.setProductCategories(null);
        } else {
          const categoriesList = convertObjectToList(categoriesObject);
          this.props.setProductCategories(categoriesList);
        }
      });
    }

    // TODO -> extract this firebase logic as a seperate function
    populateProducts() {
      this.props.firebase.products().on("value", (snapshot) => {
        const dataObject = snapshot.val();

        if (!dataObject) {
          // NULL case
          this.props.setProducts(null);
        } else {
          const dataList = convertObjectToList(dataObject);
          this.props.setProducts(dataList);
        }
      });
    }

    filterByProductsMatchingCategory(
      products = [],
      selectedProductCategory = "All"
    ) {
      let filteredProductsList = [];

      selectedProductCategory.toLowerCase() === "All".toLowerCase()
        ? (filteredProductsList = products)
        : (filteredProductsList = products.filter(
            (p) =>
              p.category.toLowerCase() === selectedProductCategory.toLowerCase()
          ));

      return filteredProductsList;
    }

    setSelectedCategory(newCategory) {
      this.props.setSelectedProductCategory(newCategory);
    }

    createNewProduct(product) {
      this.props.firebase.products().push(product);
      // TODO -- enforce object creation to match a product model
      //will trigger the products listener from populateProducts
    }

    getProductById(productId) {
      const { products } = this.props;

      return products.filter((p) => p.uid === productId);
    }

    updateProductById(productId, product) {
      this.props.firebase.product(productId).once((p) => {
        !p
          ? this.props.firebase.products().push({ product }) // product does not exist yet
          : p.update({ product });
      });
    }

    deleteProductById(productId) {
      this.props.firebase.product(productId).remove();
    }

    render() {
      const productsMatchingCategory = this.filterByProductsMatchingCategory(
        this.props.products,
        this.props.selectedProductCategory
      );
      return (
        <ComposedComponent
          {...this.props}
          productsMatchingCategory={productsMatchingCategory}
        />
      );
    }
  }
  return compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
  )(WithProductService);
};

export default withProductService;
