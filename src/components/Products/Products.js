import React from "react";
import "./Products.css";
import Product from "./Product";
import Shop from "./Shop";

class Products extends React.Component {
  renderList() {
    if (this.props.title === "Featured Shops") {
      return this.props.list.map(item => {
        return <Shop key={item.id} item={item} />;
      });
    }
    return this.props.list.map(item => {
      return <Product key={item.id} item={item} />;
    });
  }

  renderTopList() {
    if (this.props.top.length > 0) {
      return this.props.top.map(topItem => {
        return (
          <span key={topItem.id} className="px-3">
            {topItem.name}
          </span>
        );
      });
    }
    return;
  }

  renderTop() {
    if (this.props.type === "p-3 product-carousel") {
      return (
        <>
          <div className="bg-primary text-white px-3 pt-2 pb-1 w-100 rounded-top">
            <h5>{this.props.title}</h5>
          </div>
          <div className="p-3">
            {this.props.topSearch}
            {this.renderTopList()}
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <div className="container bg-white shadow-sm my-5 rounded">
        <div className="row">
          {this.renderTop()}
          <div className={`owl-carousel owl-theme ${this.props.type}`}>
            {this.renderList()}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
