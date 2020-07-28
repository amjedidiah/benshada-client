import React, { Component } from 'react';
// import { filterContent } from "../../actions/load";
import { connect } from 'react-redux';
// import NotFound from "../Misc/NotFound/NotFound";
import PropTypes from 'prop-types';
import Reviews from './Reviews.js';
import Stars from './Stars.js';

class Review extends Component {
  static propTypes = {
    orders: PropTypes.array,
    className: PropTypes.string,
    product: PropTypes.object
  }

  renderProductReview = (reviews) => {
    const { orders } = this.props;
    const orderedProductIds = [];

    orders.forEach(({ products }) => products.forEach(({ _id }) => {
      orderedProductIds.push(_id);
    }));

    return <Reviews reviews={reviews} />;
  };

  render() {
    const { product, className } = this.props;
    const { overallRating } = product;

    return (
      <p className={`${className}`}>
        <Stars count={overallRating} />
      </p>
    );
  }
}

const mapStateToProps = ({ auth, order }) => ({
  isSignedIn: auth.isSignedIn,
  orders: order.all
});

export default connect(mapStateToProps, {})(Review);
