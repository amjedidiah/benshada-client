import React, { Component } from "react";
import Product from "../../Products/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons";

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
              Make your selection from our latest arrivals and top deals in this
              category to add to your cart. <br /> Some of these products are
              discounted also.
            </p>

            <div className="d-flex">
              <button className="btn btn-outline-danger rounded-pill mt-3">
                Shop Now
              </button>
              <FontAwesomeIcon
                icon={faShoePrints}
                className="fa-5x float-right pt-4"
              />
            </div>
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
