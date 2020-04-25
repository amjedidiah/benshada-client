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
                        undefined: <FontAwesomeIcon icon={faImage} />,
                      }[activeImageURL] || (
                        <img
                          alt=""
                          src={activeImageURL}
                          className="img-fluid"
                        />
                      )}
                    </div>

                    <div className="product-preview">
                      <img
                        alt=""
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a7908b88747571.5ddf89a76679b.jpg"
                        className="img-fluid border border-light"
                        onClick={() =>
                          this.helperFunc(
                            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a7908b88747571.5ddf89a76679b.jpg",
                            true
                          )
                        }
                      />
                      <img
                        alt=""
                        src="http://localhost:3000/img/login.jpg"
                        className="img-fluid border border-light"
                        onClick={() =>
                          this.helperFunc(
                            "http://localhost:3000/img/login.jpg",
                            true
                          )
                        }
                      />
                      <img
                        alt=""
                        src="http://localhost:3000/img/login.jpg"
                        className="img-fluid border border-light"
                        onClick={() =>
                          this.helperFunc(
                            "http://localhost:3000/img/login.jpg",
                            true
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    {/* <p className="float-right mb-0">
                      Add to Wishlist{" "}
                      <span className="ml-2">
                        <i className="far fa-heart"></i>
                      </span>
                    </p> */}
                    <div className="clear"></div>
                    <h5>{product[0] && product[0].name}</h5>
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
                      {product[0].discountPercentage > 0 ? (
                        <>
                          <span className="mr-3">
                            <del>&#x20A6;{product[0] && product[0].price}</del>
                          </span>
                          <span className="text-primry">
                            &#x20A6;{" "}
                            {product[0] &&
                              (1 - product[0].discountPercentage / 100) *
                                product[0].price}
                          </span>
                        </>
                      ) : (
                        <span className="text-primry">
                          &#x20A6; {product[0] && product[0].price}
                        </span>
                      )}
                    </h4>
                    <p>
                      <CartButton product={product[0]} />
                      {/* <button className="btn btn-outline-primary mr-3">
                      <i className="fas fa-share"></i>
                    </button> */}
                    </p>
                    <Review i={0} product={product[0]} />
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
    console.log(noFetch);

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
        product = req.data.data;

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
