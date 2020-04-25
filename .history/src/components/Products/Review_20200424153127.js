import React, { Component } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { filterContent } from "../../actions/load";
import { connect } from "react-redux";
// import NotFound from "../Misc/NotFound/NotFound";
import Reviews from "./Reviews";

class Review extends Component {
  renderProductReview = (reviews, productId) => {
    let { orders } = this.props,
      orderedProductIds = [];

    orders.forEach(({ products }) =>
      products.forEach(({ _id }) => {
        orderedProductIds.push(_id);
      })
    );

    return <Reviews reviews={reviews} />;
  };

  renderStars(count) {
    let response = ["", "", "", "", ""],
      i = 0;

    while (i < count) {
      response[i] = i;

      i++;
    }
    return response.map((i) =>
      i === "" ? (
        <FontAwesomeIcon className="text-light mr-1" icon={faStar} />
      ) : (
        <FontAwesomeIcon className="text-primary mr-1" icon={faStar} />
      )
    );
  }

  render() {
    const { i, product, className } = this.props,
      { overallRating, _id, reviews } = product;

    return (
      <span className={`${className}`}>
        {this.renderStars(overallRating)}
      </span>
    );
  }
}

const mapStateToProps = ({ auth, order }) => ({
  isSignedIn: auth.isSignedIn,
  orders: order,
});

export default connect(mapStateToProps, {})(Review);
