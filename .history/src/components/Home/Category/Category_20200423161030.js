import React, { Component } from "react";
import Product from "../../Products/Product";

export default class Category extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-3">
            <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto officia porro ea quas perferendis recusandae labore
              soluta eveniet? A, earum quod nulla qui similique praesentium
              architecto deleniti eaque est laboriosam.
            </p>
            <button className="btn btn-outline-warning"></button>
          </div>
          <div className="col">
            <div className="row">
              <Product />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
