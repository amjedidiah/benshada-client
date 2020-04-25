import React, { Component } from "react";
import { Link } from "react-router-dom";

import { fetchProducts, fetchStores } from "../../actions/misc";
import { filterContent } from "../../actions/load";
import $ from "jquery";
import {
  faStoreAlt,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      relatedStores: null,
      relatedProducts: null,
      totalResults: 0,
    };
  }

  search = async (e) => {
    let { value } = e.target;
    this.setState({ value });

    if (value !== "") {
      $("#searchDropDown").show();

      const req = await fetchStores(),
        stores = req.data.data,
        relatedStoresInit = stores.filter(
          ({ name }) =>
            name.toLowerCase().indexOf(this.state.value.toLowerCase()) >= 0
        ),
        relatedStores = relatedStoresInit.slice(0, 4);

      const res = await fetchProducts(),
        products = res.data.data,
        relatedProductsInit = filterContent(
          products.filter(
            ({ name }) =>
              name.toLowerCase().indexOf(this.state.value.toLowerCase()) >= 0
          )
        ),
        relatedProducts = relatedProductsInit.slice(0, 4);

      this.setState({
        relatedProducts,
        relatedStores,
        totalResults: relatedProductsInit.length + relatedStoresInit.length,
      });
    } else {
      $("#searchDropDown").hide();
    }
  };

  searchLoading = () => <FontAwesomeIcon icon={faSpinner} className="fa-pulse" />

  searchFound = () => 


  searchRenderHelper = () => this.state.relatedProducts === null || this.state.relatedStores === null ? this.searchLoading : 

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
              {}
              
            </ul>
          </div>

          <div className="input-group-append">
            <span
              className="input-group-text bg-white border-0"
              id="basic-addon2"
            >
              <FontAwesomeIcon
                className="text-primary pointer"
                id="showSearchBar"
                title="Search"
                icon={faSearch}
              />
            </span>
          </div>
        </div>
      </form>
    );
  }
}
