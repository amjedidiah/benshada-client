import React, { Component } from "react";
import { connect } from "react-redux";

import { productDelete, productUpdate } from "../../actions/user";
import BenshadaForm from "../BenshadaForm/BenshadaForm";

class Product extends Component {
  renderDiscountedPrice = (price, discount) =>
    discount > 0 ? (
      <div>
        <small className="mb-0 font-weight-normal">
          <strike>
            &#x20A6; <span>{price}</span>
          </strike>
        </small>
        <p className="mb-0">
          &#x20A6; <span>{price * (1 - discount / 100)}</span>
        </p>
      </div>
    ) : (
      <p className="mb-0">
        &#x20A6; <span>{price}</span>
      </p>
    );

  renderProductActions = (i, id) =>
    window.location.pathname.includes("user") ? (
      <>
        <p
          className="float-left mr-3 rounded-0 text-left pointer"
          data-toggle="modal"
          data-target={`#infoModal${i}`}
        >
          <i className="fas fa-info text-primary ml-2"></i>
        </p>
        <p
          className="float-left mr-3 rounded-0 text-left pointer"
          onClick={() => this.props.productDelete(id)}
        >
          <i className="fas fa-trash ml-2 text-primary"></i>
        </p>
      </>
    ) : (
      <p className="float-left mr-3 rounded-0 text-left">
        <i className="fas fa-heart text-primary"></i>
      </p>
    );

  renderProductButton = i =>
    window.location.pathname.includes("user") ? (
      <button
        className="btn btn-primary mx-3"
        data-toggle="modal"
        data-target={`#productUpdateModal${i}`}
      >
        Edit
      </button>
    ) : (
      <button className="btn btn-primary mx-3">Add to Cart</button>
    );

  renderProductReview = reviews => {
    let display =
      reviews === undefined ? (
        ""
      ) : reviews.length < 1 ? (
        ""
      ) : (
        <div className="card-columns products my-2">
          {""}
          {reviews.map((review, i) =>
            review.isDeleted ? (
              ""
            ) : (
              <div className="card shadow-sm text-left" key={`review${i}`}>
                <div className="card-header bg-white d-flex">
                  <img
                    src="../"
                    alt="Review"
                    className="img-fluid rounded-circle border border-light"
                    width="40"
                    height="40"
                  />
                  <p className="flex-grow-1 mx-3 pt-3">
                    {review && review.user}
                  </p>
                  <p className="pt-3">
                    <i className="fas fa-star text-primary mr-2"></i>{" "}
                    <span>{review.rating}</span>
                  </p>
                </div>
                <div className="card-body">
                  <p>{review.description}</p>
                  <small className="float-right">
                    {review.createdAt.toDateString()}
                  </small>
                  <div className="clear"></div>
                </div>
              </div>
            )
          )}
          {""}
        </div>
      );

    if (typeof display === "object") {
      let res = null;
      display.props.children[1].forEach(child => {
        if (child !== "") {
          res = display;
        }
      });

      display =
        res === null ? (
          <>
            No reviews for this product yet.
            <span
              className="pointer text-primary"
              data-toggle="modal"
              data-target="#writeReviewModal"
            >
              {window.location.href.includes("user") ? "" : " Write a review"}
            </span>
          </>
        ) : (
          res
        );
    } else {
      display = (
        <>
          No reviews for this product yet.
          <span
            className="pointer text-primary"
            data-toggle="modal"
            data-target="#writeReviewModal"
          >
            {window.location.href.includes("user") ? "" : " Write a review"}
          </span>
        </>
      );
    }
    return display;
  };

  renderProducts = products => {
    let display =
      products === undefined ? (
        ""
      ) : products.length < 1 ? (
        ""
      ) : (
        <div className="card-columns products my-2">
          {" "}
          {products.map((product, i) => {
            let {
                _id,
                reviews,
                overallRating,
                inStock,
                discountPercentage,
                isDeleted,
                name,
                description,
                price
              } = product,
              productFields = [
                {
                  desc: "_id",
                  varClass: "input",
                  type: "hidden",
                  options: [],
                  icon: 0
                },
                {
                  desc: "name",
                  label: "Name",
                  placeholder: "Product Name",
                  varClass: "input",
                  type: "text",
                  options: [],
                  row: 1,
                  icon: 0
                },
                {
                  desc: "description",
                  label: "Description",
                  placeholder: "Product Description",
                  varClass: "textarea",
                  type: "text",
                  options: [],
                  row: 2,
                  icon: 0
                },
                {
                  desc: "price",
                  label: "Price",
                  varClass: "input",
                  type: "number",
                  options: [],
                  row: 1,
                  icon: 1,
                  help: "Price is in dollars"
                },
                {
                  desc: "discountPercentage",
                  label: "Discount",
                  varClass: "input",
                  type: "number",
                  options: [],
                  row: 2,
                  icon: 0,
                  help: "Discount in percentage"
                }
              ],
              productButtons = [
                { value: "Upload Changes", className: "btn-primary" }
              ];

            return isDeleted ? (
              ""
            ) : (
              <>
                <div
                  className="card mb-4 pb-3 product rounded shadow-sm border-0"
                  key={`product${i}`}
                >
                  <div className="card-body p-0">
                    {/* <img
              className="card-img rounded-top p-0"
              src={product.src}
              alt="product"
            /> */}
                    <div className="px-3">
                      <p
                        className="float-left mr-3 rounded-0 text-left pointer"
                        data-toggle="modal"
                        data-target={`#reviewModal${i}`}
                      >
                        <i className="fas fa-star text-primary mr-1"></i>{" "}
                        <span className="">{overallRating}</span>
                      </p>
                      {/* <p className="float-left mr-3 rounded-0 text-left">
                  <i className="fas fa-shopping-cart text-secondary"></i>
                </p> */}
                      {this.renderProductActions(i, _id)}
                      <h4 className="flex-grow-1 font-weight-bold text-right">
                        {this.renderDiscountedPrice(price, discountPercentage)}
                      </h4>
                      <div className="clear"></div>
                    </div>
                    <div className="my-4 px-3 text-center">
                      <p className="lead text-truncate text-capitalize my-0">
                        {name}
                      </p>
                      {/* <small className="text-uppercase font-weight-bold my-0 px-2">
                  {product.category}
                </small>
                |
                <small className="text-uppercase font-weight-bold my-0 px-2">
                  {product.gender}
                </small> */}
                      <p
                        className={`py-1 px-2 rounded-0 text-white ${
                          inStock ? "bg-success" : "bg-danger"
                        } ml-auto mr-auto`}
                      >
                        {inStock ? "In stock" : "Out of stock"}
                      </p>
                    </div>
                    {this.renderProductButton(i)}
                  </div>
                </div>
                <div
                  className="modal fade"
                  id={`reviewModal${i}`}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="reviewModalLabel"
                  aria-hidden="true"
                  key={`reviewModal${i}`}
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title font-weight-light"
                          id="reviewModalLabel"
                        >
                          Reviews
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="card-columns">
                          {this.renderProductReview(reviews)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`productUpdateModal${i}`}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby={`productUpdateModalLabel${i}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title font-weight-light"
                          id={`productUpdateModalLabel${i}`}
                        >
                          Edit {name}
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body text-left">
                        <BenshadaForm
                          form={`form-product-edit${i}`}
                          onSubmitForm={this.props.productUpdate}
                          className="form"
                          fields={productFields}
                          buttons={productButtons}
                          initialValues={product}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`infoModal${i}`}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="infoModalLabel"
                  aria-hidden="true"
                  key={`infoModal${i}`}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title font-weight-light"
                          id="infoModalLabel"
                        >
                          Product Info
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}{" "}
        </div>
      );

    if (typeof display === "object") {
      let res = null;
      display.props.children[1].forEach(child => {
        if (child !== "") {
          res = display;
        }
      });

      display =
        res === null ? (
          <>
            No products found.
            <span
              className="pointer text-primary"
              data-toggle="modal"
              data-target="#productModal"
            >
              {window.location.href.includes("user") ? " Upload one" : ""}
            </span>
          </>
        ) : (
          res
        );
    } else {
      display = (
        <>
          No products found.
          <span
            className="pointer text-primary"
            data-toggle="modal"
            data-target="#productModal"
          >
            {window.location.href.includes("user") ? " Upload one" : ""}
          </span>
        </>
      );
    }

    return display;
  };

  render() {
    let { title, products } = this.props;

    return (
      <div className="container my-5 text-center">
        <h4 className="text-left text-uppercase font-weight-bold">{title}</h4>

        {this.renderProducts(products)}

        {/* <button className="btn btn-primary">View More</button> */}
      </div>
    );
  }
}

export default connect(null, { productDelete, productUpdate })(Product);
