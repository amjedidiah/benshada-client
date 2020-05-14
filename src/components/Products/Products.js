import React, { Component } from 'react';
import HrFrComp from '../HrFrComp/HrFrComp';
import CartButton from '../Cart/CartButton';
import { Link } from 'react-router-dom';
import All from '../All/All';
import { fetchProducts } from '../../actions/misc';
import Loading from '../Misc/Loading/Loading';
import NotFound from '../Misc/NotFound/NotFound';
import Review from './Review';
import './Product.css';

import qs from 'query-string';
import Reviews from './Reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Price from './Price';
// import { ifSeller } from "../../actions/auth";
// import ProductQty from "../Cart/ProductQty";
import ProductsBanner from './ProductsBanner';
import AllEnabled from '../All/AllEnabled';

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

  static getDerivedStateFromProps = (props, state) =>
    qs.parse(props.location.search).id !== state.queryString
      ? this.DEFAULT
      : qs.parse(props.location.search).name !== state.nameQueryString
      ? this.DEFAULT
      : qs.parse(props.location.search).category !== state.categoryQueryString
      ? this.DEFAULT
      : qs.parse(props.location.search).gender !== state.genderQueryString
      ? this.DEFAULT
      : null;

  resetStateQty = (product, qty) =>
    this.setState({
      productQty: qty
    });

  render() {
    let {
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
        {product === null ? (
          <Loading />
        ) : product.length === 0 ? (
          <NotFound type="product" />
        ) : categoryQueryString !== undefined ? (
          <>
            <ProductsBanner headers={[{ name: 'category', value: categoryQueryString }]} />
            <AllEnabled allProducts={allProducts} products={product} />
          </>
        ) : genderQueryString !== undefined ? (
          <>
            <ProductsBanner headers={[{ name: 'gender', value: genderQueryString }]} />
            <AllEnabled allProducts={allProducts} products={product} />
          </>
        ) : (queryString === undefined || queryString === '') &&
          (nameQueryString === undefined || nameQueryString === '') ? (
          <>
            <ProductsBanner />
            <AllEnabled allProducts={allProducts} products={product} />
          </>
        ) : (
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
                        : (product[0] && product[0].image).map((img) => (
                            <img
                              alt=""
                              src={img}
                              className="img-fluid border border-light"
                              onClick={() => this.helperFunc(img, true)}
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
                      <Price price={product[0] && product[0].price} discount={product[0].discountPercentage} />
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
                          <strong className="text-danger">Out of Stock"</strong>
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
                            <td>{product[0] && product[0].specifications && product[0].specifications.size}</td>
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
                            <td>{product[0] && product[0].specifications && product[0].specifications.color}</td>
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
                            <td>{product[0] && product[0].specifications && product[0].specifications.mainMaterial}</td>
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
                            <td>{product[0] && product[0].specifications && product[0].specifications.size} kg</td>
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
                              {product[0] && product[0].specifications && product[0].specifications.productionCountry}
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
        )}
      </HrFrComp>
    );
  }

  helperFunc = async (aIU, noFetch) => {
    if (noFetch === true) {
      this.setState({
        activeImageURL: aIU
      });
    } else {
      let queryString = qs.parse(this.props.location.search).id,
        nameQueryString = qs.parse(this.props.location.search).name,
        categoryQueryString = qs.parse(this.props.location.search).category,
        genderQueryString = qs.parse(this.props.location.search).gender,
        req = await fetchProducts(),
        product =
          req.data.data.length === 0
            ? []
            : req.data.data.filter((item) => {
                const { name, _id, category, gender } = item;
                return categoryQueryString !== undefined
                  ? category && category.toLowerCase() === categoryQueryString.toLowerCase()
                  : genderQueryString !== undefined
                  ? gender && gender.toLowerCase() === genderQueryString.toLowerCase()
                  : (queryString === undefined || queryString === '') &&
                    (nameQueryString === undefined || nameQueryString === '')
                  ? item
                  : nameQueryString !== undefined
                  ? name && name.toLowerCase() === nameQueryString.toLowerCase()
                  : _id === queryString;
              }),
        allProducts = req.data.data;

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

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    let { queryString, nameQueryString, categoryQueryString, genderQueryString, activeImageURL } = this.state;

    return qs.parse(this.props.location.search).id !== queryString ||
      qs.parse(this.props.location.search).name !== nameQueryString ||
      qs.parse(this.props.location.search).category !== categoryQueryString ||
      qs.parse(this.props.location.search).gender !== genderQueryString
      ? this.helperFunc(activeImageURL)
      : activeImageURL !== prevState.activeImageURL
      ? this.helperFunc(activeImageURL, true)
      : '';
  };

  componentDidMount = () => this.helperFunc(this.state.activeImageURL);
}
