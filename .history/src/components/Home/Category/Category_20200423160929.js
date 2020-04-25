import React, { Component } from "react";
import Product from "../../Products/Product";

export default class Category extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-3">
            
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
