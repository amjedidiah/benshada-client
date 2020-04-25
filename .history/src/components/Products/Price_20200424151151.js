import React from "react";

const Price = (props) => {
  const { price, discount } = props;
  return discount > 0 ? (
    <>
      <span className="lead font-weight-bold">
        &#x20A6; {price * (1 - discount / 100)}
      </span>
      <br />
      <sm className="font-weight-lighter">
        <strike>&#x20A6; {price}</strike>
      </sm>
    </>
  ) : (
    <span>&#x20A6; {price}</span>
  );
};

export default Price;
