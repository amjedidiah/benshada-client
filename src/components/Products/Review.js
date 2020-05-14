import React, { Component } from 'react';
// import { filterContent } from "../../actions/load";
import { connect } from 'react-redux';
// import NotFound from "../Misc/NotFound/NotFound";
import Reviews from './Reviews';
import Stars from './Stars';

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

  render() {
    const { product, className } = this.props,
      { overallRating } = product;

    return (
      <p className={`${className}`}>
        <Stars count={overallRating} />
      </p>
    );
  }
}

const mapStateToProps = ({ auth, order }) => ({
  isSignedIn: auth.isSignedIn,
  orders: order
});

export default connect(mapStateToProps, {})(Review);
