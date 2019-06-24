import React from "react";

const Product = props => {
  const { image, star, name, price } = props.item;
  return (
    <div className="product item rounded">
      <img className="img-fluid rounded" src={image} alt={name} />
      <div className="product-cover rounded">
        <div className="product-cover-top rounded">
          <span className="bg-primary pt-3 pb-2 px-2">
            <i className="fas fa-shopping-cart text-white" />
          </span>
          <span className="float-right pt-1 px-2">
            {star} <i className="fas fa-star text-primary" />
          </span>
        </div>
        <div className="product-cover-bottom px-3 py-2 text-white rounded-bottom">
          <span className="font-weight-light">{name}</span>
          <span className="font-weight-bolder float-right">N {price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
