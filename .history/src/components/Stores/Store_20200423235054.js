import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "../Misc/Loading/Loading";
import NotFound from "../Misc/NotFound/NotFound";

export default class Store extends Component {
  renderStores = (stores, radius) =>
    stores === null ? (
      <Loading />
    ) : stores.length < 1 ? (
      <NotFound type="store" />
    ) : (
      <div className="card-columns products my-2">
        {stores.map((store, i) => (
          <div
            className={`card ${
              radius > 0 ? "rounded-circle" : ""
            } mb-4 product rounded shadow-sm border-0`}
            key={i}
          >
            <div className="card-body px-0 pb-4">
              <div className="border border-success">
                <img
                  className="card-img border border-danger w-100"
                  src={store.src}
                  alt="product"
                  height="60"
                />
              </div>
              <div className=" text-center px-3">
                <Link
                  to={`/stores/?id=${store._id}`}
                  className="text-capitalize"
                >
                  {store.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  render() {
    let { stores, radius, title } = this.props;

    return (
      <div className="container-fluid my-3 text-center">
        <h4 className="text-left text-capitalize">{title}</h4>
        {this.renderStores(stores, radius)}
      </div>
    );
  }
}
