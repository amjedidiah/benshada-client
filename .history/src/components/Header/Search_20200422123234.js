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

  searchLoading() {
    return (
      <div className="text-center">
        {" "}
        <FontAwesomeIcon icon={faSpinner} className="fa-pulse fa-3x" />
        <br />
        p{Looking for }
      </div>
    );
  }

  searchFound = () => {
    return (
      <>
        <li className="dropdown-header text-uppercase">
          <small className="font-weight-bold">stores</small>
        </li>
        {this.state.relatedStores.length < 1 ? (
          <div className="px-4 py-2">No store found</div>
        ) : (
          this.state.relatedStores.map(({ name, _id }, i) => (
            <li className="" key={`relatedStores${i}`}>
              <Link
                to={`/stores/?id=${_id}`}
                className="d-block px-4 py-2 border border-white"
              >
                <div className="d-flex">
                  <div className="mr-4">
                    <FontAwesomeIcon
                      className="text-secondary"
                      icon={faStoreAlt}
                    />
                  </div>
                  <div className="flex-grow-1 text-secondary">{name}</div>
                </div>
              </Link>
            </li>
          ))
        )}

        <li className="dropdown-divider"></li>

        <li className="dropdown-header text-uppercase">
          <small className="font-weight-bold">products</small>
        </li>

        {this.state.relatedProducts.length < 1 ? (
          <div className="px-4 py-2">No products found</div>
        ) : (
          this.state.relatedProducts.map(
            ({ name, _id, discountPercentage, price }, i) => (
              <li className="" key={`relatedProducts${i}`}>
                <Link
                  to={`/products/?id=${_id}`}
                  className="d-block px-4 py-2 border border-white"
                >
                  <div className="d-flex">
                    <div className="flex-grow-1 text-secondary">
                      <div>{name}</div>
                      <div className="d-flex">
                        {discountPercentage > 0 ? (
                          <>
                            <div>
                              <strike>
                                &#x20A6; <span>{price}</span>
                              </strike>
                            </div>
                            <div className="font-weight-bold ml-3">
                              &#x20A6;{" "}
                              <span>
                                {price * (1 - discountPercentage / 100)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="font-weight-bold">
                            &#x20A6; <span>{price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          )
        )}

        {this.state.totalResults > 0 ? (
          <li className="text-center text-primary text-uppercase">
            <Link to={`/catalog/?q=${this.state.value}`} className="p-2">
              see all results ({this.state.totalResults})
            </Link>
          </li>
        ) : (
          ""
        )}
      </>
    );
  };

  searchRenderHelper() {
    return this.state.relatedProducts === null ||
      this.state.relatedStores === null
      ? this.searchLoading()
      : this.searchFound();
  }

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
