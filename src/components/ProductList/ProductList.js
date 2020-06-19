// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import ProductDisplay from './ProductDisplay/ProductDisplay.js';
import NotFound from '../NotFound/NotFound.js';

// Start Component
export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.object,
    count: PropTypes.number,
    title: PropTypes.string
  };

  filterProductList = (product, filterType, filterValue) => {
    if (!filterType) return product;
    if (typeof product[filterType] === 'number') {
      return Number(product[filterType]) <= filterValue;
    }

    if (typeof product[filterType] === 'object') {
      return filterValue.forEach((value) => (product[filterType] || []).includes(value));
    }

    return (product[filterType] || '').toLowerCase() === filterValue;
  };

  renderProductList = (products, filterType, filterValue) => {
    const filteredProducts = products.filter(
      (product) => this.filterProductList(product, filterType, filterValue)
    );

    return filteredProducts.length > 0 ? (
      <>
        <h4 className="text-capitalize">{this.props.title}</h4>
        <div className="card-columns">
          {filteredProducts.slice(0, this.props.count).map((product, key) => (
            <ProductDisplay key={`productList${key}`} product={product} />
          ))}
        </div>
      </>
    ) : (
      <NotFound type="product" />
    );
  };

  render() {
    const { products, type } = this.props;
    const filterType = type && type.name;
    const filterValue = type && type.value;

    return <>{this.renderProductList(products, filterType, filterValue)}</>;
  }
}
// End Component
