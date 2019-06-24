import React from "react";

const Shop = props => {
  const { image, name } = props.item;
  return (
    <div className="product item rounded border border-light">
      <img className="img-fluid rounded" src={image} alt={name} />
    </div>
  );
};

export default Shop;
