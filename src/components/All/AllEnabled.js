import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { faRedhat } from "@fortawesome/free-brands-svg-icons";
import {
  faShoppingBag,
  faTshirt,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import Product from "../Products/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from "../Products/Stars";
import qs from "query-string";

import "./slider.css";

class AllEnabled extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      size: [],
      color: [],
      mainMaterial: [],
      productionCountry: [],
      rating: null,
      discount: null,
      shops: [],
      genders: [],
      prices: { min: 0, max: 0 },
    };
  }

  renderCats = (cats, products) =>
    cats.map(({ name, icon }, i) => (
      <Link
        className={`nav-link text-capitalize px-0`}
        to={`/products/?category=${name}`}
        key={`renderCats${i}`}
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {name}{" "}
        <span className="badge badge-primary bg-warning float-right mt-1">
          {products.filter(({ category }) => category === name).length}
        </span>
      </Link>
    ));

  renderCheckFilters = (title, items, type) => (
    <div className="col-12 p-3 mb-4">
      <h5 className="text-capitalize">{title.toSplittedString()}</h5>
      <nav className="nav flex-column">
        {items.map((item, i) =>
          type === "list" ? (
            ""
          ) : (
            <div key={`render${title}${i}`}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item}
                  defaultChecked={false}
                  id={`prod${title}${i}`}
                  onClick={(e) => this.toggleProdCheckSpec(e, item, title)}
                />
                <label
                  className="form-check-label text-capitalize text-truncate w-md-50"
                  htmlFor={`prod${title}${i}`}
                >
                  {item}
                </label>
              </div>
            </div>
          )
        )}
      </nav>
    </div>
  );

  toggleProdCheckSpec(e, value, spec) {
    let { target } = e,
      newSpec =
        target.checked === true
          ? [...this.state[spec], value]
          : this.state[spec].filter((i) => i !== value);

    this.setState({ [spec]: newSpec });
  }

  renderProdSpecs = (prods, spec) => {
    let items = [
      ...new Set(
        prods.map(
          ({ specifications }) => specifications && specifications[spec]
        )
      ),
    ].filter((item) => item !== undefined && item.length !== 0);

    return items.length > 0
      ? this.renderCheckFilters(spec, items, "form-check")
      : "";
  };

  updateProductsByRatings = (count) => {
    let { rating } = this.state,
      newRating = rating === count ? null : count;

    [...document.querySelectorAll(".nav-link.prod-rating")].forEach((li) => {
      li.classList.remove("bg-warning");

      if (li.getAttribute("data-count") === "rating-" + newRating) {
        li.classList.add("bg-warning");
      }
    });

    this.setState({ rating: newRating });
  };

  updateProductsByDiscount = (count) => {
    let { discount } = this.state,
      newDiscount = discount === count ? null : count;

    [...document.querySelectorAll(".nav-link.prod-discount")].forEach((li) => {
      li.classList.remove("bg-warning");

      if (li.getAttribute("data-count") === "discount-" + newDiscount) {
        li.classList.add("bg-warning");
      }
    });

    this.setState({ discount: newDiscount });
  };

  range1 = (e) => {
    let { target } = e;

    target.value = Math.min(
      target.value,
      target.parentNode.childNodes[2].value - 1
    );

    let value =
        (100 / (parseInt(target.max) - parseInt(target.min))) *
          parseInt(target.value) -
        (100 / (parseInt(target.max) - parseInt(target.min))) *
          parseInt(target.min),
      children = target.parentNode.childNodes[0].childNodes;
    children[0].style.width = value + "%";
    children[2].style.left = value + "%";
    children[3].style.left = value + "%";
    children[5].style.left = value + "%";
    children[5].childNodes[0].innerHTML = target.value;

    this.setState({
      prices: { min: Number(target.value), max: this.state.prices.max },
    });
  };

  range2 = (e) => {
    let { target } = e;

    target.value = Math.max(
      target.value,
      target.parentNode.childNodes[1].value - -1
    );
    let value =
        (100 / (parseInt(target.max) - parseInt(target.min))) *
          parseInt(target.value) -
        (100 / (parseInt(target.max) - parseInt(target.min))) *
          parseInt(target.min),
      children = target.parentNode.childNodes[0].childNodes;
    children[1].style.width = 100 - value + "%";
    children[2].style.right = 100 - value + "%";
    children[4].style.left = value + "%";
    children[6].style.left = value + "%";
    children[6].childNodes[0].innerHTML = target.value;

    this.setState({
      prices: { min: this.state.prices.min, max: Number(target.value) },
    });
  };

  render() {
    let { props, state } = this,
      { product, prices } = state,
      { min, max } = prices,
      initProds = props.products || [],
      specs = initProds
        .map(({ specifications }) => Object.keys(specifications))
        .flat(Infinity)
        .unique()
        .filter((spec) => spec !== "weight"),
      cats = [
        { name: "accessories", icon: faRedhat },
        { name: "bags", icon: faShoppingBag },
        { name: "clothes", icon: faTshirt },
        { name: "shoes", icon: faShoePrints },
      ],
      ratings = initProds
        .map(({ overallRating }) => Math.floor(overallRating))
        .unique(),
      discounts = initProds
        .map(
          ({ discountPercentage }) => Math.floor(discountPercentage / 10) * 10
        )
        .unique()
        .sortNumAsc(),
      shop = initProds
        .map(({ shop }) => shop && shop.name && shop.name.toLowerCase())
        .unique()
        .filterJargon(),
      gender = initProds
        .map(({ gender }) => gender && gender.toLowerCase())
        .unique()
        .filterJargon(),
      initMin = initProds
        .map(({ price }) => price)
        .unique()
        .sortNumAsc()[0],
      initMax = initProds
        .map(({ price }) => price)
        .unique()
        .sortNumDesc()[0];

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 col-xl-2 py-4">
            <div className="row">
              <div className="col-12 p-3 mb-4">
                <h5>Categories</h5>
                <nav className="nav flex-column">
                  {this.renderCats(cats, initProds)}
                </nav>
              </div>

              {specs.map((spec) => this.renderProdSpecs(initProds, spec))}

              <div className="col-12 p-3 mb-4">
                <h5>Rating</h5>
                <nav className="nav flex-column">
                  {ratings.map((count, i) => (
                    <li
                      className={`nav-link prod-rating pointer`}
                      key={`renderStars${i}`}
                      onClick={() => this.updateProductsByRatings(count)}
                      data-count={`rating-${count}`}
                    >
                      <Stars count={count} /> & Up
                    </li>
                  ))}
                </nav>
              </div>

              <div className="col-12 p-3 mb-4">
                <h5>Discount</h5>
                <nav className="nav flex-column">
                  {discounts.map((count, i) => (
                    <li
                      className={`nav-link prod-discount pointer`}
                      key={`renderDiscounts${i}`}
                      onClick={() => this.updateProductsByDiscount(count)}
                      data-count={`discount-${count}`}
                    >
                      {count}% off or More
                    </li>
                  ))}
                </nav>
              </div>

              {this.renderCheckFilters("shops", shop, "form-check")}

              {qs.parse(this.props && this.props.location.search).gender ===
              undefined
                ? this.renderCheckFilters("genders", gender, "form-check")
                : ""}

              <div className="col-12 p-3 mb-4">
                <h5>Price</h5>
                <div className="body">
                  <div id="slider-distance">
                    <div>
                      <div id="inverse-left" style={{ width: "70%" }}></div>
                      <div id="inverse-right" style={{ width: "70%" }}></div>
                      <div
                        id="range"
                        style={{
                          left: `${Math.floor((initMin / initMax) * 100)}%`,
                          right: `${Math.floor(
                            (1 - initMin / initMax) * 100
                          )}%`,
                        }}
                      ></div>
                      <span
                        className="thumb"
                        style={{
                          left: `${Math.floor((initMin / initMax) * 100)}%`,
                        }}
                      ></span>
                      <span className="thumb" style={{ left: `100%` }}></span>
                      <div
                        className="sign"
                        style={{
                          left: `${Math.floor((initMin / initMax) * 100)}%`,
                        }}
                      >
                        <span id="value">{Math.floor(initMin)}</span>
                      </div>
                      <div className="sign" style={{ left: `100%` }}>
                        <span id="value">{Math.floor(initMax)}</span>
                      </div>
                    </div>
                    <input
                      id="rangeMin"
                      type="range"
                      tabIndex="0"
                      defaultValue={Math.floor(min)}
                      max={Math.floor(initMax)}
                      min={Math.floor(initMin)}
                      step="1"
                      onInput={(e) => this.range1(e)}
                    />

                    <input
                      type="range"
                      tabIndex="0"
                      defaultValue={Math.floor(max)}
                      max={Math.floor(initMax)}
                      min={Math.floor(initMin)}
                      step="1"
                      onInput={(e) => this.range2(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <span className="float-left">₦{min.addComma()}</span>
                    <span className="float-right">₦{max.addComma()}</span>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="col">
            <Product products={product} />
          </div>
        </div>
      </div>
    );
  }

  helperFunc = () => {
    let { state, props } = this,
      { rating, discount, shops, genders, prices } = state,
      { min, max } = prices,
      initProds = props.products || [],
      displayProds = initProds,
      specs = initProds
        .map(({ specifications }) => Object.keys(specifications))
        .flat(Infinity)
        .unique()
        .filter((spec) => spec !== "weight");

    // Filter for all specs, combine then make Unique
    displayProds = (specs || [])
      .map((spec) =>
        (state[spec] || []).length > 0
          ? displayProds.filter(({ specifications }) =>
              state[spec].includes(specifications & specifications[spec])
            )
          : displayProds
      )
      .flat(Infinity)
      .uniqueObjectArray("_id");

    // Filter if ratings is set
    displayProds =
      rating !== null
        ? displayProds.filter(({ overallRating }) => overallRating >= rating)
        : displayProds;

    // Filter if discount is set
    displayProds =
      discount !== null
        ? displayProds.filter(
            ({ discountPercentage }) => discountPercentage >= discount
          )
        : displayProds;

    // Filter for shops
    displayProds =
      (shops || []).length > 0
        ? displayProds.filter(({ shop }) =>
            shops.includes(shop && shop.name && shop.name.toLowerCase())
          )
        : displayProds;

    // Filter for genders
    displayProds =
      (genders || []).length > 0
        ? displayProds.filter(({ gender }) =>
            genders.includes(gender && gender.toLowerCase())
          )
        : displayProds;

    // Filter for prices
    displayProds = displayProds.filter(
      ({ price }) => price >= min && price <= max
    );

    this.setState({
      product: displayProds,
    });
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const {
      product,
      size,
      color,
      mainMaterial,
      productionCountry,
      rating,
      discount,
      shops,
      genders,
      prices,
    } = this.state;

    return rating !== prevState.rating ||
      discount !== prevState.discount ||
      prices.min !== prevState.prices.min ||
      prices.max !== prevState.prices.max ||
      product.length !== prevState.product.length ||
      size.length !== prevState.size.length ||
      color.length !== prevState.color.length ||
      mainMaterial.length !== prevState.mainMaterial.length ||
      productionCountry.length !== prevState.productionCountry.length ||
      shops.length !== prevState.shops.length ||
      genders.length !== prevState.genders.length
      ? this.helperFunc()
      : "";
  };

  componentDidMount = () => {
    let initProds = this.props.products || [],
      displayProds = initProds,
      min = displayProds
        .map(({ price }) => price)
        .unique()
        .sortNumAsc()[0],
      max = displayProds
        .map(({ price }) => price)
        .unique()
        .sortNumDesc()[0];

    this.setState({ prices: { min, max } }, () => this.helperFunc());
  };
}

export default withRouter(AllEnabled);
