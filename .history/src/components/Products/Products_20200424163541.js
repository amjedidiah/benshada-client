import React, { Component } from "react";
import HrFrComp from "../HrFrComp/HrFrComp";
import CartButton from "../Cart/CartButton";
import { Link } from "react-router-dom";
import All from "../All/All";
import { fetchProducts } from "../../actions/misc";
import Loading from "../Misc/Loading/Loading";
import NotFound from "../Misc/NotFound/NotFound";
import Review from "./Review";
import "./Product.css";

import qs from "query-string";
import Reviews from "./Reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Price from "./Price";

export default class Products extends Component {
  DEFAULT = {
    product: null,
    queryString: null,
    nameQueryString: null,
    categoryQueryString: null,
    genderQueryString: null,
    activeImageURL: null,
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

  render() {
    let {
      product,
      queryString,
      nameQueryString,
      categoryQueryString,
      genderQueryString,
      activeImageURL,
    } = this.state;

    console.log(product);

    return (
      <HrFrComp>
        {product === null ? (
          <Loading />
        ) : product.length === 0 ? (
          <NotFound type="product" />
        ) : categoryQueryString !== undefined ? (
          <All
            type="product"
            productCategory={categoryQueryString}
            className="py-5"
            title={categoryQueryString}
            limit={12}
          />
        ) : genderQueryString !== undefined ? (
          <All
            type="product"
            productGender={genderQueryString}
            className="py-5"
            title={genderQueryString}
            limit={12}
          />
        ) : (queryString === undefined || queryString === "") &&
          (nameQueryString === undefined || nameQueryString === "") ? (
          <All type="product" queryString="" title="All Products" />
        ) : (
          <div className="my-2">
            <div className="bg-warning py-3">
              <div className="container p-0">
                <Link to="/"> Home </Link> /{" "}
                <Link
                  to={`/products/?category=${
                    product[0] && product[0].category
                  }`}
                >
                  {" "}
                  {product[0] && product[0].category}{" "}
                </Link>{" "}
                /{" "}
                <Link to={`/products/?name=${product[0] && product[0].name}`}>
                  {" "}
                  {product[0] && product[0].name}
                </Link>
              </div>
            </div>

            <div className="bg-white">
              <div className="container">
                <div className="row py-4">
                  <div className="col-12 col-md-6 mb-3 mb-md-0 border border-light px-5 py-3 product-gallery">
                    <div className="product-gallery-active-image">
                      {{
                        null: <Loading />,
                        undefined: (
                          <FontAwesomeIcon icon={faImage} className="fa-6x" />
                        ),
                      }[activeImageURL] || (
                        <img
                          alt=""
                          src={activeImageURL}
                          className="img-fluid"
                        />
                      )}
                    </div>

                    <div className="product-preview">
                      {product[0] && product[0].src === undefined
                        ? ""
                        : (product[0] && product[0].src).map((img) => (
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
                    <p className="text-uppercase font-weight-bold">
                      <Link
                        to={`/stores?name=${
                          product[0] && product[0].shop && product[0].shop.name
                        }`}
                        className="text-primary"
                      >
                        {product[0] && product[0].shop && product[0].shop.name}
                      </Link>
                    </p>
                    <h4>
                      <Price
                        price={product[0] && product[0].price}
                        discount={product[0].discountPercentage}
                      />
                    </h4>
                    <p>
                      <CartButton product={product[0]} />
                      {/* <button className="btn btn-outline-primary mr-3">
                      <i className="fas fa-share"></i>
                    </button> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container p-4 my-4 bg-white shadow-sm">
              <div className="row">
                <div className="col-12">
                  <h4>Description</h4>
                  <p>{product[0] && product[0].description}</p>
                </div>
              </div>
            </div>

            <div className="container p-4 my-4 bg-white shadow-sm">
              <div className="row">
                <div className="col-12">
                  <h4>Reviews</h4>
                  <Reviews reviews={product[0] && product[0].reviews} />
                </div>
              </div>
            </div>

            <All
              type="product"
              className="p-4 my-4 bg-white shadow-sm"
              store={product[0] && product[0].shop && product[0].shop.name}
              productName={product[0] && product[0].name}
              title={`Other Products By 
                      ${product[0] && product[0].shop && product[0].shop.name}`}
            />

            <All
              type="product"
              className="p-4 my-4 bg-white shadow-sm"
              productCategory={product[0] && product[0].category}
              title={`Other Products in ${product[0] && product[0].category}`}
            />

            <All
              type="product"
              className="p-4 my-4 bg-white shadow-sm"
              productGender={product[0] && product[0].gender}
              title={`Other Products for ${product[0] && product[0].gender}s`}
            />

            <All
              type="product"
              className="p-4 my-4 bg-white shadow-sm"
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
        activeImageURL: aIU,
      });
    } else {
      let queryString = qs.parse(this.props.location.search).id,
        nameQueryString = qs.parse(this.props.location.search).name,
        categoryQueryString = qs.parse(this.props.location.search).category,
        genderQueryString = qs.parse(this.props.location.search).gender,
        req = await fetchProducts(),
        product = req.data.data.filter(({ name, _id, category }) =>
          categoryQueryString !== undefined
            ? category === categoryQueryString
            : genderQueryString !== undefined
            ? gender === genderQueryString
            : nameQueryString !== undefined
            ? name === nameQueryString
            : _id === queryString
        );

      this.setState({
        product,
        queryString,
        nameQueryString,
        categoryQueryString,
        genderQueryString,
        activeImageURL: product[0] && product[0].src && product[0].src[0],
      });
    }
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    let {
      queryString,
      nameQueryString,
      categoryQueryString,
      genderQueryString,
      activeImageURL,
    } = this.state;

    return qs.parse(this.props.location.search).id !== queryString ||
      qs.parse(this.props.location.search).name !== nameQueryString ||
      qs.parse(this.props.location.search).category !== categoryQueryString ||
      qs.parse(this.props.location.search).gender !== genderQueryString
      ? this.helperFunc(activeImageURL)
      : activeImageURL !== prevState.activeImageURL
      ? this.helperFunc(activeImageURL, true)
      : "";
  };

  componentDidMount = () => this.helperFunc(this.state.activeImageURL);
}
