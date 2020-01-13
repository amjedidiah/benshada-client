import React, { Component } from "react";

export default class Stores extends Component {
  renderStores = (stores, radius) =>
    stores.map((store, i) => (
      <div
        className={`card ${
          radius > 0 ? "rounded-circle" : ""
        } mb-4 product rounded shadow-sm border-0`}
        key={i}
      >
        <div className="card-body px-0 py-4">
          <img
            className="card-img rounded-top p-0"
            src={store.src}
            alt="product"
          />
          <div className=" text-center px-3">
            <p className="lead font-weight-bold mb-0 text-truncate text-capitalize flex-grow-1">
              {store.name}
            </p>
            <button className="btn btn-primary ">Follow</button>
          </div>
        </div>
      </div>
    ));
  render() {
    let { stores, radius, title } = this.props;

    return (
      <div className="container my-5 text-center">
        <h4 className="text-left text-uppercase font-weight-bold">{title}</h4>
        <div className="card-columns products no-restrict">
          {this.renderStores(stores, radius)}
        </div>
      </div>
    );
  }
}
