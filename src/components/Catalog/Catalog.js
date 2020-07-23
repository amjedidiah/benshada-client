// Module imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Component imports
import HrFr from '../HrFr/HrFr.js';

// Asset imports
import '../../assets/css/catalog.css';
import ProductList from '../ProductList/ProductList.js';

class Catalog extends Component {
  static propTypes = {
    location: PropTypes.string,
    products: PropTypes.array
  };

  queryString = decodeURI(this.props.location.search.split('=')[1]);

  render() {
    const { queryString } = this;

    return queryString === 'undefined' || queryString === '' ? (
      <Redirect to={{ pathname: '/' }} />
    ) : (
      <HrFr>
        <ProductList
          products={this.props.products}
          count={12}
          type={{ name: 'name', value: queryString }}
          title="Discounted"
        />
      </HrFr>
    );
  }
}

const mapStateToProps = ({ product }) => ({ products: product.all });

export default connect(mapStateToProps)(Catalog);
