import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { faRedhat } from '@fortawesome/free-brands-svg-icons';
import { faShoppingBag, faTshirt, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'query-string';
import PropTypes from 'prop-types';
import Product from '../Products/Product.js';
import Stars from '../Products/Stars.js';

import './slider.css';
import {
  toSplittedString, unique, uniqueObjectArray, filterJargon, sortNumAsc, sortNumDesc, addComma
} from '../../prototypes.js';

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
      prices: { min: 0, max: 0 }
    };
  }

  static propTypes = {
    products: PropTypes.array,
    location: PropTypes.string
  }

  renderCats = (cats, products) => cats.map(({ name, icon }, i) => (
      <Link className={'nav-link text-capitalize px-0'} to={`/products/?category=${name}`} key={`renderCats${i}`}>
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {name}{' '}
        <span className="badge badge-primary bg-warning float-right mt-1">
          {products.filter(({ category }) => category === name).length}
        </span>
      </Link>
  ));

  renderCheckFilters = (title, items, type) => (
    <div className="col-12 p-3 mb-4">
      <h5 className="text-capitalize">{toSplittedString(title)}</h5>
      <nav className="nav flex-column">
        {items.map((item, i) => (type === 'list' ? (
          ''
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
                <label className="form-check-label text-capitalize text-truncate w-md-50" htmlFor={`prod${title}${i}`}>
                  {item}
                </label>
              </div>
            </div>
        )))}
      </nav>
    </div>
  );

  toggleProdCheckSpec(e, value, spec) {
    const { target } = e;
    const newSpec = target.checked === true
      ? [...this.state[spec], value]
      : this.state[spec].filter((i) => i !== value);

    this.setState({ [spec]: newSpec });
  }

  renderProdSpecs = (prods, spec) => {
    const items = [
      ...new Set(prods.map(({ specifications }) => specifications && specifications[spec]))
    ]
      .filter(
        (item) => item !== undefined && item.length !== 0
      );

    return items.length > 0 ? this.renderCheckFilters(spec, items, 'form-check') : '';
  };

  updateProductsByRatings = (count) => {
    const { rating } = this.state;
    const newRating = rating === count ? null : count;

    [...document.querySelectorAll('.nav-link.prod-rating')].forEach((li) => {
      li.classList.remove('bg-warning');

      if (li.getAttribute('data-count') === `rating-${newRating}`) {
        li.classList.add('bg-warning');
      }
    });

    this.setState({ rating: newRating });
  };

  updateProductsByDiscount = (count) => {
    const { discount } = this.state;
    const newDiscount = discount === count ? null : count;

    [...document.querySelectorAll('.nav-link.prod-discount')].forEach((li) => {
      li.classList.remove('bg-warning');

      if (li.getAttribute('data-count') === `discount-${newDiscount}`) {
        li.classList.add('bg-warning');
      }
    });

    this.setState({ discount: newDiscount });
  };

  range1 = (e) => {
    const { target } = e;

    target.value = Math.min(target.value, target.parentNode.childNodes[2].value - 1);

    const value = (100 / (parseInt(target.max, 2) - parseInt(target.min, 2)))
    * parseInt(target.value, 2)
    - (100 / (parseInt(target.max, 2) - parseInt(target.min, 2))) * parseInt(target.min, 2);

    const children = target.parentNode.childNodes[0].childNodes;
    children[0].style.width = `${value}%`;
    children[2].style.left = `${value}%`;
    children[3].style.left = `${value}%`;
    children[5].style.left = `${value}%`;
    children[5].childNodes[0].innerHTML = target.value;

    this.setState({
      prices: { min: Number(target.value), max: this.state.prices.max }
    });
  };

  range2 = (e) => {
    const { target } = e;

    target.value = Math.max(target.value, target.parentNode.childNodes[1].value - -1);
    const value = (100 / (parseInt(target.max, 2) - parseInt(target.min, 2)))
    * parseInt(target.value, 2)
    - (100 / (parseInt(target.max, 2) - parseInt(target.min, 2))) * parseInt(target.min, 2);

    const children = target.parentNode.childNodes[0].childNodes;
    children[1].style.width = `${100 - value}%`;
    children[2].style.right = `${100 - value}%`;
    children[4].style.left = `${value}%`;
    children[6].style.left = `${value}%`;
    children[6].childNodes[0].innerHTML = target.value;

    this.setState({
      prices: { min: this.state.prices.min, max: Number(target.value) }
    });
  };

  render() {
    const { props, state } = this;
    const { product, prices } = state;
    const { min, max } = prices;
    const initProds = props.products || [];
    const specs = initProds
      .map(({ specifications }) => unique(Object.keys(specifications) || [])
        .flat(Infinity))
      .filter((spec) => spec !== 'weight');
    const cats = [
      { name: 'accessories', icon: faRedhat },
      { name: 'bags', icon: faShoppingBag },
      { name: 'clothes', icon: faTshirt },
      { name: 'shoes', icon: faShoePrints }
    ];
    const ratings = initProds.map(({ overallRating }) => unique(Math.floor(overallRating)));
    const discounts = unique(initProds
      .map(({ discountPercentage }) => sortNumAsc(Math.floor(discountPercentage / 10) * 10)));
    const shop = filterJargon(unique(initProds
      .map(
        (item) => item && item.shop && item.shop.name && item.shop.name.toLowerCase()
      )));
    const gender = filterJargon(unique(initProds
      .map((item) => item && item.gender && item.gender.toLowerCase())));
    const initMin = sortNumAsc(unique(initProds
      .map(({ price }) => price)))[0];
    const initMax = sortNumDesc(unique(initProds
      .map(({ price }) => price)))[0];

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 col-xl-2 py-4">
            <div className="row">
              <div className="col-12 p-3 mb-4">
                <h5>Categories</h5>
                <nav className="nav flex-column">{this.renderCats(cats, initProds)}</nav>
              </div>

              {specs.map((spec) => this.renderProdSpecs(initProds, spec))}

              <div className="col-12 p-3 mb-4">
                <h5>Rating</h5>
                <nav className="nav flex-column">
                  {ratings.map((count, i) => (
                    <li
                      className={'nav-link prod-rating pointer'}
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
                      className={'nav-link prod-discount pointer'}
                      key={`renderDiscounts${i}`}
                      onClick={() => this.updateProductsByDiscount(count)}
                      data-count={`discount-${count}`}
                    >
                      {count}% off or More
                    </li>
                  ))}
                </nav>
              </div>

              {this.renderCheckFilters('shops', shop, 'form-check')}

              {qs.parse(this.props && this.props.location.search).gender === undefined
                ? this.renderCheckFilters('genders', gender, 'form-check')
                : ''}

              <div className="col-12 p-3 mb-4">
                <h5>Price</h5>
                <div className="body">
                  <div id="slider-distance">
                    <div>
                      <div id="inverse-left" style={{ width: '70%' }}></div>
                      <div id="inverse-right" style={{ width: '70%' }}></div>
                      <div
                        id="range"
                        style={{
                          left: `${Math.floor((initMin / initMax) * 100)}%`,
                          right: `${Math.floor((1 - initMin / initMax) * 100)}%`
                        }}
                      ></div>
                      <span
                        className="thumb"
                        style={{
                          left: `${Math.floor((initMin / initMax) * 100)}%`
                        }}
                      ></span>
                      <span className="thumb" style={{ left: '100%' }}></span>
                      <div
                        className="sign"
                        style={{
                          left: `${Math.floor((initMin / initMax) * 100)}%`
                        }}
                      >
                        <span id="value">{Math.floor(initMin)}</span>
                      </div>
                      <div className="sign" style={{ left: '100%' }}>
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
                    <span className="float-left">₦{addComma(min)}</span>
                    <span className="float-right">₦{addComma(max)}</span>
                  </div>
                </div>{' '}
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
    const { state, props } = this;
    const {
      rating, discount, shops, genders, prices
    } = state;
    const { min, max } = prices;
    const initProds = props.products || [];
    let displayProds = initProds;
    const specs = unique(initProds
      .map(({ specifications }) => Object.keys(specifications))
      .flat(Infinity)).filter((spec) => spec !== 'weight');

    // Filter for all specs, combine then make Unique
    displayProds = uniqueObjectArray((specs || [])
      .map((spec) => ((state[spec] || []).length > 0
        ? displayProds.filter(
          ({ specifications }) => state[spec].includes(specifications && specifications[spec])
        )
        : displayProds))
      .flat(Infinity), '_id');

    // Filter if ratings is set
    displayProds = rating !== null
      ? displayProds.filter(({ overallRating }) => overallRating >= rating)
      : displayProds;

    // Filter if discount is set
    displayProds = discount !== null
      ? displayProds.filter(({ discountPercentage }) => discountPercentage >= discount)
      : displayProds;

    // Filter for shops
    displayProds = (shops || []).length > 0
      ? displayProds.filter(
        ({ shop }) => shops.includes(shop && shop.name && shop.name.toLowerCase())
      )
      : displayProds;

    // Filter for genders
    displayProds = (genders || []).length > 0
      ? displayProds.filter(({ gender }) => genders.includes(gender && gender.toLowerCase()))
      : displayProds;

    // Filter for prices
    displayProds = displayProds.filter(({ price }) => price >= min && price <= max);

    this.setState({
      product: displayProds
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
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
      prices
    } = this.state;

    return rating !== prevState.rating
      || discount !== prevState.discount
      || prices.min !== prevState.prices.min
      || prices.max !== prevState.prices.max
      || product.length !== prevState.product.length
      || size.length !== prevState.size.length
      || color.length !== prevState.color.length
      || mainMaterial.length !== prevState.mainMaterial.length
      || productionCountry.length !== prevState.productionCountry.length
      || shops.length !== prevState.shops.length
      || genders.length !== prevState.genders.length
      ? this.helperFunc()
      : '';
  };

  componentDidMount = () => {
    const initProds = this.props.products || [];
    const displayProds = initProds;
    const min = sortNumAsc(unique(displayProds
      .map(({ price }) => price)))[0];
    const max = sortNumDesc(unique(displayProds
      .map(({ price }) => price)))[0];

    this.setState({ prices: { min, max } }, () => this.helperFunc());
  };
}

export default withRouter(AllEnabled);
