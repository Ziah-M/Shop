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
    }

    componentDidMount() {
      this.getProductCategories();
      this.populateProducts();
    }

    componentWillUnmount() {
      this.props.firebase.products().off();
      this.props.firebase.categories().off();
    }

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

    populateProducts() {}

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
  )(WithProductService);
};

export default withProductService;
