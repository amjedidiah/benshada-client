import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import All from "../../All/All";

export default class Category extends Component {
  render() {
    const { reversed, shortDesc, icon } = this.props;

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

            <Link to={} className="btn btn-outline-danger rounded-pill mt-3">
              Shop Now
            </Link>
            <div className="text-right">
              <FontAwesomeIcon icon={icon} className="fa-3x" />
            </div>
          </div>
          <div className="col">
            <All
              type="product"
              className="bg-white"
              productCategory={shortDesc}
              title=""
            />
          </div>
        </div>
      </div>
    );
  }
}
