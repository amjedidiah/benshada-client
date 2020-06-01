import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import HrFrComp from '../HrFrComp/HrFrComp.js';
import CartButton from '../Cart/CartButton.js';
import All from '../All/All.js';
import { fetchProducts } from '../../redux/old/actions/misc.js.js';
import Loading from '../Misc/Loading/Loading.js';
import NotFound from '../Misc/NotFound/NotFound.js';
import Review from './Review.js';
import './Product.css';

import Reviews from './Reviews.js';
import Price from './Price.js';
// import { ifSeller } from "../../actions/auth";
// import ProductQty from "../Cart/ProductQty";
import ProductsBanner from './ProductsBanner.js';
import AllEnabled from '../All/AllEnabled.js';

export default class Products extends Component {
  DEFAULT = {
    allProducts: null,
    product: null,
    queryString: null,
    nameQueryString: null,
    categoryQueryString: null,
    genderQueryString: null,
    activeImageURL: null
  };

  constructor(props) {
    super(props);
    this.state = this.DEFAULT;
  }

  static propTypes = {
    location: PropTypes.string
  }

  static getDerivedStateFromProps =
  (props, state) => (qs.parse(props.location.search).id !== state.queryString
  || qs.parse(props.location.search).name !== state.nameQueryString
    || qs.parse(props.location.search).category !== state.categoryQueryString
    || qs.parse(props.location.search).gender !== state.genderQueryString
    ? this.DEFAULT
    : null);

  resetStateQty = (product, qty) => this.setState({
    productQty: qty
  });

  renderHelp = (allProducts,
    product,
    queryString,
    nameQueryString,
    categoryQueryString,
    genderQueryString,
    activeImageURL) => {
    if (product === null) {
      return <Loading />;
    }
    if (product.length === 0) {
      return <NotFound type="product" />;
    }
    if (categoryQueryString !== undefined) {
      return <>
        <ProductsBanner headers={[{ name: 'category', value: categoryQueryString }]} />
        <AllEnabled allProducts={allProducts} products={product} />
      </>;
    }
    if (genderQueryString !== undefined) {
      return <>
         <ProductsBanner headers={[{ name: 'gender', value: genderQueryString }]} />
            <AllEnabled allProducts={allProducts} products={product} />
      </>;
    }
    if ((queryString === undefined || queryString === '')
    && (nameQueryString === undefined || nameQueryString === '')) {
      return <> <ProductsBanner /><AllEnabled allProducts={allProducts} products={product} /></>;
    }
    return (
      <div className="my-2">
        <ProductsBanner
          headers={[
            { name: 'category', value: product[0] && product[0].category },
            { name: 'name', value: product[0] && product[0].name }
          ]}
        />

        <div className="bg-white">
          <div className="container">
            <div className="row py-4">
              <div className="col-12 col-md-6 mb-3 mb-md-0 border border-light px-5 py-3 product-gallery">
                <div className="product-gallery-active-image">
                  {{
                    null: <Loading />,
                    undefined: <FontAwesomeIcon icon={faImage} className="fa-6x" />
                  }[activeImageURL] || <img alt="" src={activeImageURL} className="img-fluid" />}
                </div>

                <div className="product-preview">
                  {product[0] && product[0].image === undefined
                    ? ''
                    : (product[0] && product[0].image).map((img, key) => (
                        <img
                          alt=""
                          src={img}
                          className="img-fluid border border-light"
                          onClick={() => this.helperFunc(img, true)} key={key}
                        />
                    ))}
                </div>
              </div>
              <div className="col-12 col-md-6 p-3">
                {/* <p className="float-right mb-0">
                  Add to Wishlist{" "}
                  <span className="ml-2">
                    <i className="far fa-heart"></i>
                  </span>
                </p>
                <div className="clear"></div> */}
                <h4>{product[0] && product[0].name}</h4>
                <Review i={0} product={product[0]} />
                <h3>
                  <Price
                  price={product[0] && product[0].price}
                  discount={product[0].discountPercentage} />
                </h3>
                <p>{product[0] && product[0].shortDescription}</p>

                <div className="row">
                  <div className="col-6 my-1">
                    <strong>Shop</strong>{' '}
                  </div>
                  <div className="col-6 my-1">
                    <Link
                      to={`/stores?name=${product[0] && product[0].shop && product[0].shop.name}`}
                      className="text-primary"
                    >
                      {product[0] && product[0].shop && product[0].shop.name}
                    </Link>
                  </div>
                  <div className="col-6 my-1">
                    <strong>Guarantee</strong>{' '}
                  </div>
                  <div className="col-6 my-1">
                    <strong>{(product[0] && product[0].guarantee) || 0}</strong> days
                  </div>
                  <div className="col-6 my-1">
                    <strong>Delivery time</strong>{' '}
                  </div>
                  <div className="col-6 my-1">
                    <strong>{(product[0] && product[0].deliveryTime) || 0}</strong> days
                  </div>
                  <div className="col-6 my-1">
                    <strong>Availability</strong>{' '}
                  </div>
                  <div className="col-6 my-1">
                    {product[0] && product[0].inStock ? (
                      <strong className="text-success">In Stock</strong>
                    ) : (
                      <strong className="text-danger">Out of Stock</strong>
                    )}
                  </div>
                </div>
                <p className="mt-3">
                  <CartButton product={product[0]} qty={1} />
                  <br />
                  <small>**Go to cart to increase number of products to purchase</small>
                  {/* <button className="btn btn-outline-primary mr-3">
                  <i className="fas fa-share"></i>
                </button> */}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <div className="row justify-content-between">
            <div className="col-12 col-md-7">
              <div className="row">
                <div className="col-12 pb-3">
                  <h5>Description</h5>
                  <p>{product[0] && product[0].longDescription}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-12 pb-3">
                  <h5>Specifications</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Gender</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{product[0] && product[0].gender}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{
                          product[0]
                        && product[0].specifications
                        && product[0].specifications.size
                        }</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Color</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{
                          product[0]
                          && product[0].specifications
                          && product[0].specifications.color
                        }</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Main Material</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{
                          product[0]
                          && product[0].specifications
                          && product[0].specifications.mainMaterial
                          }</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{
                          product[0]
                        && product[0].specifications
                        && product[0].specifications.size
                        } kg</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Production Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {
                            product[0]
                          && product[0].specifications
                          && product[0].specifications.productionCountry
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="row bg-white p-3 shadow-sm">
                <h5>Reviews</h5>
                <Reviews reviews={product[0] && product[0].reviews} />
              </div>
            </div>
          </div>
        </div>

        <All
          type="product"
          className="p-4"
          store={product[0] && product[0].shop && product[0].shop.name}
          productName={product[0] && product[0].name}
          title={`Products By
                  ${product[0] && product[0].shop && product[0].shop.name}`}
        />

        <All
          type="product"
          className="p-4"
          productCategory={product[0] && product[0].category}
          title={`Products in ${product[0] && product[0].category}`}
        />

        <All
          type="product"
          className="p-4"
          productGender={product[0] && product[0].gender}
          title={`Products for ${product[0] && product[0].gender}s`}
        />

        <All
          type="product"
          className="p-4"
          productName={product[0] && product[0].name}
          productPrice={product[0] && product[0].price}
          productDiscount={product[0] && product[0].discountPercentage}
          title="Related Products"
        />
      </div>
    );
  }

  render() {
    const {
      allProducts,
      product,
      queryString,
      nameQueryString,
      categoryQueryString,
      genderQueryString,
      activeImageURL
    } = this.state;


    return (
      <HrFrComp>
        {this.renderHelp(allProducts,
          product,
          queryString,
          nameQueryString,
          categoryQueryString,
          genderQueryString,
          activeImageURL)}
      </HrFrComp>
    );
  }

  helperFunc = async (aIU, noFetch) => {
    if (noFetch === true) {
      this.setState({
        activeImageURL: aIU
      });
    } else {
      const queryString = qs.parse(this.props.location.search).id;
      const nameQueryString = qs.parse(this.props.location.search).name;
      const categoryQueryString = qs.parse(this.props.location.search).category;
      const genderQueryString = qs.parse(this.props.location.search).gender;
      const req = await fetchProducts();
      const product = req.data.data.length === 0
        ? []
        : req.data.data.filter((item) => {
          const {
            name, _id, category, gender
          } = item;

          if (categoryQueryString !== undefined) {
            return category && category.toLowerCase() === categoryQueryString.toLowerCase();
          }

          if (genderQueryString !== undefined) {
            return gender && gender.toLowerCase() === genderQueryString.toLowerCase();
          }

          if ((queryString === undefined || queryString === '')
          && (nameQueryString === undefined || nameQueryString === '')) {
            return item;
          }

          return nameQueryString !== undefined
            ? name && name.toLowerCase() === nameQueryString.toLowerCase()
            : _id === queryString;
        });
      const allProducts = req.data.data;

      this.setState({
        allProducts,
        product,
        queryString,
        nameQueryString,
        categoryQueryString,
        genderQueryString,
        activeImageURL: product[0] && product[0].image && product[0].image[0]
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      queryString, nameQueryString, categoryQueryString, genderQueryString, activeImageURL
    } = this.state;

    if (qs.parse(this.props.location.search).id !== queryString
    || qs.parse(this.props.location.search).name !== nameQueryString
    || qs.parse(this.props.location.search).category !== categoryQueryString
    || qs.parse(this.props.location.search).gender !== genderQueryString) {
      return this.helperFunc(activeImageURL);
    }

    return activeImageURL !== prevState.activeImageURL
      ? this.helperFunc(activeImageURL, true)
      : '';
  };

  componentDidMount = () => this.helperFunc(this.state.activeImageURL);
}
