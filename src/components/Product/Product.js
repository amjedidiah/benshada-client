import React, { Component } from "react";

export default class Product extends Component {
  renderDiscountedPrice = (price, discount) =>
    discount > 0 ? (
      <div>
        <small className="mb-0 font-weight-normal">
          <strike>
            &#x20A6; <span>{price}</span>
          </strike>
        </small>
        <p className="mb-0">
          &#x20A6; <span>{price}</span>
        </p>
      </div>
    ) : (
      <p className="mb-0">
        &#x20A6; <span>{price}</span>
      </p>
    );

  renderProductActions = () =>
    window.location.pathname.includes("user") ? (
      <>
        <p className="float-left mr-3 rounded-0 text-left">
          <i
            className="fas fa-info text-primary ml-2"
            data-toggle="modal"
            data-target="#infoModal"
          ></i>
        </p>
        <p className="float-left mr-3 rounded-0 text-left">
          <i className="fas fa-trash ml-2 text-primary"></i>
        </p>
      </>
    ) : (
      <p className="float-left mr-3 rounded-0 text-left">
        <i className="fas fa-heart text-primary"></i>
      </p>
    );

  renderProductButton = () =>
    window.location.pathname.includes("user") ? (
      <button
        className="btn btn-primary mx-3"
        data-toggle="modal"
        data-target="#productModal"
      >
        Edit
      </button>
    ) : (
      <button className="btn btn-primary mx-3">Add to Cart</button>
    );

  renderProducts = products =>
    products.map((product, i) => (
      <div
        className="card mb-4 pb-3 product rounded shadow-sm border-0"
        key={i}
      >
        <div className="card-body p-0">
          <img
            className="card-img rounded-top p-0"
            src={product.src}
            alt="product"
          />
          <div className="px-3">
            <p
              className="float-left mr-3 rounded-0 text-left pointer"
              data-toggle="modal"
              data-target="#reviewModal"
            >
              <i className="fas fa-star text-primary mr-1"></i>{" "}
              <span className="">{product.ratings}</span>
            </p>
            {/* <p className="float-left mr-3 rounded-0 text-left">
                <i className="fas fa-shopping-cart text-secondary"></i>
              </p> */}
            {this.renderProductActions()}
            <h4 className="flex-grow-1 font-weight-bold text-right">
              {this.renderDiscountedPrice(product.price, product.discount)}
            </h4>
            <div className="clear"></div>
          </div>
          <div className="my-4 px-3 text-center">
            <p className="lead text-truncate text-capitalize my-0">
              {product.name}
            </p>
            <small className="text-uppercase font-weight-bold my-0">
              {product.category}
            </small>

            <p className="py-1 px-2 rounded-0 text-white bg-success ml-auto mr-auto">
              In stock
            </p>
          </div>
          {this.renderProductButton()}
        </div>
      </div>
    ));

  render() {
    let { title, products } = this.props;

    return (
      <div className="container my-5 text-center">
        <h4 className="text-left text-uppercase font-weight-bold">{title}</h4>
        <div className="card-columns products my-2">
          {this.renderProducts(products)}
        </div>
        {/* <button className="btn btn-primary">View More</button> */}

        <div
          className="modal fade"
          id="reviewModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="reviewModalLabel"
          aria-hidden="true"
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
                  <div className="card shadow-sm text-left">
                    <div className="card-header bg-white d-flex">
                      <img
                        src="../"
                        alt="Review"
                        className="img-fluid rounded-circle border border-light"
                        width="40"
                        height="40"
                      />
                      <p className="flex-grow-1 mx-3 pt-3">Reviewer</p>
                      <p className="pt-3">
                        <i className="fas fa-star text-primary mr-2"></i>{" "}
                        <span>4</span>
                      </p>
                    </div>
                    <div className="card-body">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni laudantium, molestiae necessitatibus dolorem alias
                        labore nostrum voluptatem reprehenderit vel cum vitae ab
                        repudiandae mollitia minima, ad, at temporibus modi
                        ducimus?
                      </p>
                      <small className="float-right">5th December 2019</small>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
