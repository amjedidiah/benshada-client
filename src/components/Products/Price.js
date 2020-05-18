import React from 'react';

import PropTypes from 'prop-types';

class Price extends React.Component {
  static propTypes = {
    price: PropTypes.number,
    discount: PropTypes.number
  }

  render() {
    const { price, discount } = this.props;

    if (price === undefined) return false;
    return discount > 0 ? (
    <>
      <span className="lead font-weight-bold">&#x20A6; {price * (1 - discount / 100)}</span>
      <br />
      <small className="font-weight-lighter">
        <strike>&#x20A6; {price}</strike>
        <span className="bg-warning p-1 ml-2 rounded">{`- ${discount}%`}</span>
      </small>
    </>
    ) : (
    <span>&#x20A6; {price}</span>
    );
  }
}

export default Price;
