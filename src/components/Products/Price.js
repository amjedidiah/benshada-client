import React from 'react';

import PropTypes from 'prop-types';

class Price extends React.Component {
  static propTypes = {
    price: PropTypes.number,
    discount: PropTypes.number
  }

  render = () => {
    if (this.props.price === undefined) return false;
    return this.props.discount > 0 ? (
    <>
      <span className="lead font-weight-bold">&#x20A6; {this.props.price * (1 - this.props.discount / 100)}</span>
      <br />
      <small className="font-weight-lighter">
        <strike>&#x20A6; {this.props.price}</strike>
        <span className="bg-warning p-1 ml-2 rounded">{`- ${this.props.discount}%`}</span>
      </small>
    </>
    ) : (
    <span>&#x20A6; {this.props.price}</span>
    );
  }
}

export default Price;
