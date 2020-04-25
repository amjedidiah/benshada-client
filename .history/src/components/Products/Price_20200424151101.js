import React from "react";

const Price = (props) => {
  const { price, discount } = props;
  return discount > 0 ? (
    <>
      <span className="lead font-weight-bold">
        &#x20A6; {price * (1 - discount / 100)}
      </span>
      <br />
      <span className="font-weight-lighter">
        <strike>&#x20A6; {price}</strike>
      </span>
    </>
  ) : (
    <span>&#x20A6; {price}</span>
  )} including VAT`});
};

export default Price;
