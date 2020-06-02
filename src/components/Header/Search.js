/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component imports
import Price from '../Products/Price.js';
import Image from '../Image/Image.js';

// Asset imports
import filterContent from '../../assets/js/filterContent.js';
import searchAnimate from '../../assets/js/searchAnimate.js';

// ActionCreator imports
import { productsAll } from '../../redux/actions/products.js';
import { shopsAll } from '../../redux/actions/stores.js';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      relatedStores: null,
      relatedProducts: null,
      totalResults: 0
    };
  }

  search = async (e) => {
    const { value } = e.target;
    this.setState({ value });


    if (value !== '') {
      $('#searchDropDown').show();

      this.setState({
        relatedStores: null,
        relatedProducts: null
      });

      const reqStores = await shopsAll();
      const stores = reqStores.data.data;
      const relatedStoresInit = stores.filter(
        ({ name }) => name.toLowerCase().indexOf(this.state.value.toLowerCase()) >= 0
      );
      const relatedStores = relatedStoresInit.slice(0, 3);

      const reqProducts = await productsAll();
      const products = reqProducts.data.data;
      const relatedProductsInit = filterContent(
        products.filter(
          ({ name }) => name.toLowerCase().indexOf(this.state.value.toLowerCase()) >= 0
        )
      );
      const relatedProducts = relatedProductsInit.slice(0, 3);

      this.setState({
        relatedProducts,
        relatedStores,
        totalResults: relatedProductsInit.length + relatedStoresInit.length
      });
    } else {
      $('#searchDropDown').hide();
    }
  };

  searchLoading() {
    return (
      <div className="text-center">
        <h2>
          <FontAwesomeIcon icon={faSpinner} className="fa-pulse" />
        </h2>
        <p>
          Searching for <strong> {this.state.value}</strong>
        </p>
      </div>
    );
  }

  renderResult = (related, type) => (related < 1 ? (
      <div className="px-4 py-2">No {type} found</div>
  ) : (
    related.map((item, i) => (
          <li className="" key={`related${type}${i}`}>
            <Link to={`/${type}s/?id=${item && item._id}`} className="d-block px-4 py-2 border border-white">
              <div className="row align-items-center h-100">
                <div className="mr-2 p-0 text-center" style={{ width: '60px' }}>
                  <Image name={item && item.name} image={item && item.image} type={type} size={2} />
                </div>
                <div className="flex-grow-1 text-secondary">
                  <div>{item && item.name}</div>
                  <div className="">
                    <Price price={item && item.price} discount={item && item.discountPercentage} />
                  </div>
                </div>
              </div>
            </Link>
          </li>
    ))
  ));

  searchFound = () => (
      <>
        <li className="dropdown-header text-uppercase">
          <small className="font-weight-bold">stores</small>
        </li>
        {this.renderResult(this.state.relatedStores, 'store')}

        <li className="dropdown-divider"></li>

        <li className="dropdown-header text-uppercase">
          <small className="font-weight-bold">products</small>
        </li>

        {this.renderResult(this.state.relatedProducts, 'product')}

        {this.state.totalResults > 0 ? (
          <li className="text-center text-primary text-uppercase my-2">
            <Link to={`/catalog/?q=${this.state.value}`} className="p-2">
              see all results ({this.state.totalResults})
            </Link>
          </li>
        ) : (
          ''
        )}
      </>
  );

  searchRenderHelper() {
    return this.state.relatedProducts === null || this.state.relatedStores === null
      ? this.searchLoading()
      : this.searchFound();
  }

  // Animation for search component
  componentDidMount = () => searchAnimate();

  render() {
    return (
      <form className="form-inline flex-grow-1 mb-2 mb-md-0">
        <div className="input-group flex-grow-1">
          <div className="dropdown flex-grow-1">
            <input
              className="form-control  w-100 border-top-0 border-right-0 border-left-0 rounded-0 search-bar invisible dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={this.state.value}
              onChange={(e) => this.search(e)}
            />

            <ul className="dropdown-menu w-100" id="searchDropDown">
              {this.searchRenderHelper()}
            </ul>
          </div>

          <div className="input-group-append">
            <span className="input-group-text bg-white border-0" id="basic-addon2">
              <FontAwesomeIcon className="text-primary pointer" id="showSearchBar" title="Search" icon={faSearch} />
            </span>
          </div>
        </div>
      </form>
    );
  }
}
