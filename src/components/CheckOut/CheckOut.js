import React, { Component } from "react";
import { connect } from "react-redux";
import HrFrComp from "../HrFrComp/HrFrComp";
import { Redirect } from "react-router-dom";

const mapStateToProps = ({ cart, auth }) => ({
  cart,
  isSignedIn: auth.isSignedIn
});

class CheckOut extends Component {
  renderOrderedProducts = () =>
    this.props.cart.map(({ name, cartQty }) => (
      <div>
        <p>{name}</p>
        <p>Qty: {cartQty}</p>
      </div>
    ));

  render() {
    return this.props.cart.length < 1 ? (
      <Redirect to={{ pathname: "/cart" }} />
    ) : this.props.isSignedIn ? (
      <HrFrComp>
        <div className="container mt-5">
          <div className="row">
            <div className="col"></div>
            <div className="col-3 shadow bg-white">
              <p className="lead text-uppercase">Your Order</p>
              {this.renderOrderedProducts()}
            </div>
          </div>
        </div>
      </HrFrComp>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

export default connect(mapStateToProps)(CheckOut);
