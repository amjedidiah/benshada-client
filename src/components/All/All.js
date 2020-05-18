import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Product from '../Products/Product.js';
import Store from '../Stores/Store.js';
import { fetchProducts, fetchStores } from '../../actions/misc.js';
import { filterContent } from '../../actions/load.js';
import { splice } from '../../prototypes.js';

export default class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      currentPage: 1,
      itemsPerPage: 16
    };

    this.pageDirect = this.pageDirect.bind(this);
  }

  static propTypes = {
    queryString: PropTypes.string,
    type: PropTypes.string,
    store: PropTypes.string,
    productGender: PropTypes.string,
    productCategory: PropTypes.string,
    productName: PropTypes.string,
    productDiscount: PropTypes.number,
    productPrice: PropTypes.number,
    limit: PropTypes.number,
    title: PropTypes.string,
    className: PropTypes.string
  };

  helperFunc() {
    const {
      queryString,
      type,
      productGender,
      productCategory,
      productName,
      productDiscount,
      productPrice,
      limit
    } = this.props;
    let { store } = this.props;
    const res = {
      product: fetchProducts(),
      store: fetchStores()
    }[type];
    let items = filterContent(res && res.data && res.data.data);
    const defineItems = () => {
      let response = [];

      if (items !== null) {
        // If fetch is based on search
        if (queryString !== undefined) {
          response = items
            .filter(({ name }) => (name && name.toLowerCase()).includes(queryString.toLowerCase()));
        } else if (store === undefined) {
          if (productCategory !== undefined) {
            response = items === undefined ? [] : items.filter(
              ({ category }) => category && category.toLowerCase() === productCategory.toLowerCase()
            );
          } else if (productGender !== undefined) {
            response = items.filter(
              ({ gender }) => gender && gender.toLowerCase() === productGender.toLowerCase()
            );
          } else {
            response = items.filter(
              ({
                name, price, discountPercentage
              }) => (price === productPrice || discountPercentage === productDiscount)
                    && name
                    && name.toLowerCase() !== productName.toLowerCase()
            );
          }
        } else if (productDiscount === undefined) {
          response = items.filter(({ shop, name }) => (store === null || store === 'null'
            ? []
            : store.toLowerCase()
                        === (((shop && shop.name) || 'A') && ((shop && shop.name) || 'A')).toLowerCase()
                      && (name && name.toLowerCase()) !== productName.toLowerCase()));
        } else {
          response = items.filter(({ shop, discountPercentage }) => (store === null || store === 'null'
            ? []
            : store.toLowerCase()
                        === (((shop && shop.name) || 'A') && ((shop && shop.name) || 'A')).toLowerCase()
                      && discountPercentage > 0));
        }
      }

      return limit !== undefined ? splice(response, 0, limit) : response;
    };

    store = store && store.toLowerCase();

    items = defineItems(limit);

    this.setState({ items });
  }

  // componentDidUpdate = () => this.helperFunc();

  componentDidMount() { this.helperFunc(); }

  pageDirect(event) {
    [...event.target.parentElement.parentElement.querySelectorAll('button')].forEach((btn) => (btn === event.target ? btn.classList.add('active') : btn.classList.remove('active')));

    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  renderItems(currentitems) {
    return ({
      product: <Product
                title={this.props.title}
                products={currentitems}
                className={this.props.className}
                />,
      store: <Store title={this.props.title} stores={currentitems} />
    }[this.props.type]);
  }

  renderPageNumbers(pageNumbers) {
    return pageNumbers.map((number) => (
        <li key={number}>
          <button
            className={`btn btn-link text-primary ${number === 1 ? 'active' : ''}`}
            id={number}
            onClick={this.pageDirect}
          >
            {number}
          </button>
        </li>
    ));
  }

  render() {
    const { state, props } = this;
    const { productCategory } = props;
    const { items, currentPage, itemsPerPage } = state;
    const currentitems = items !== null
      ? items.slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage)
      : null; // Logic for displaying items

    // Logic for displaying page numbers
    const itemPageNumbers = [];
    for (let i = 1; i <= Math.ceil((items && items.length) / itemsPerPage); i += 1) {
      itemPageNumbers.push(i);
    }

    return (
      <>
        <ul className="p-0 m-0">{this.renderItems(currentitems)}</ul>
        {productCategory === undefined ? (
          <ul className="page-numbers">{this.renderPageNumbers(itemPageNumbers)}</ul>
        ) : (
          ''
        )}
      </>
    );
  }
}
