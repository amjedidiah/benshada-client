import React, { Component } from "react";
import Product from "../../Products/Product";

export default class Category extends Component {
  render() {
    const { reversed, shortDesc, longDesc } = this.props;

    return (
      <div className="container-fluid my-3 bg-white h-100">
        <div
          className={`row ${
            reversed ? "flex-row-reverse" : ""
          }  h-100 align-items-center`}
        >
          <div className="col-12 col-md-3 col-lg- bg-warning p-4">
            <h5 className="text-capitalize">{shortDesc}</h5>
            <p>
              Make your selection from our latest arrivals and top & discounted
              deals in this category to add to your cart. Some of these products
              are discounted also.
            </p>
            <button className="btn btn-outline-danger rounded-pill mt-3">
              Shop Now
            </button>
          </div>
          <div className="col">
            <div className="row">
              <Product />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
