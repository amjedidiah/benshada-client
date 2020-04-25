import React, { Component } from "react";
import Product from "../Products/Product";
import Store from "../Stores/Store";
import { fetchProducts, fetchStores } from "../../actions/misc";
import { filterContent } from "../../actions/load";

export default class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      currentPage: 1,
      itemsPerPage: 16,
    };

    this.pageDirect = this.pageDirect.bind(this);
  }

  helperFunc = async () => {
    let {
        queryString,
        type,
        store,
        productName,
        productDiscount,
        productPrice,
      } = this.props,
      res = {
        product: await fetchProducts(),
        store: await fetchStores(),
      }[type],
      items = filterContent(res.data.data), defineItems = ()

    store = store && store.toLowerCase();

    items = defineItems();

    items =
      items === null
        ? null
        : queryString !== undefined
        ? items.filter(({ name }) => name.toLowerCase().includes(queryString))
        : store === undefined
        ? items.filter(({ name, price, discountPercentage }) =>
            store === null
              ? []
              : (price === productPrice ||
                  discountPercentage === productDiscount) &&
                name.toLowerCase() !== productName.toLowerCase()
          )
        : productDiscount === undefined
        ? items.filter(({ shop, name }) =>
            store === null || store === "null"
              ? []
              : store === ((shop && shop.name) || "A").toLowerCase() &&
                name.toLowerCase() !== productName.toLowerCase()
          )
        : items.filter(({ shop, discountPercentage }) =>
            store === null || store === "null"
              ? []
              : store === ((shop && shop.name) || "A").toLowerCase() &&
                discountPercentage > 0
          );

    this.setState({ items });
  };

  // componentDidUpdate = () => this.helperFunc();

  componentDidMount = () => this.helperFunc();

  pageDirect(event) {
    [
      ...event.target.parentElement.parentElement.querySelectorAll("button"),
    ].forEach((btn) =>
      btn === event.target
        ? btn.classList.add("active")
        : btn.classList.remove("active")
    );

    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  renderItems = (currentitems) =>
    ({
      product: (
        <Product
          title={this.props.title}
          products={currentitems}
          className={this.props.className}
        />
      ),
      store: <Store title={this.props.title} stores={currentitems} />,
    }[this.props.type]);

  renderPageNumbers = (pageNumbers) =>
    pageNumbers.map((number) => {
      return (
        <li key={number}>
          <button
            className={`btn btn-link text-primary ${
              number === 1 ? "active" : ""
            }`}
            id={number}
            onClick={this.pageDirect}
          >
            {number}
          </button>
        </li>
      );
    });

  render() {
    const { state } = this,
      { items, currentPage, itemsPerPage } = state,
      currentitems =
        items !== null
          ? items.slice(
              currentPage * itemsPerPage - itemsPerPage,
              currentPage * itemsPerPage
            )
          : null; // Logic for displaying items

    // Logic for displaying page numbers
    const itemPageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil((items && items.length) / itemsPerPage);
      i++
    ) {
      itemPageNumbers.push(i);
    }

    return (
      <>
        <ul className="p-0 m-0">{this.renderItems(currentitems)}</ul>
        <ul className="page-numbers">
          {this.renderPageNumbers(itemPageNumbers)}
        </ul>
      </>
    );
  }
}
