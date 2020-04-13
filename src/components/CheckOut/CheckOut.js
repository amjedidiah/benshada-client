import React, { Component } from "react";
import { connect } from "react-redux";
import HrFrComp from "../HrFrComp/HrFrComp";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = ({ cart, auth }) => ({
  cart,
  isSignedIn: auth.isSignedIn
});

class CheckOut extends Component {
  renderDiscountedPrice = (price, discount) =>
    discount > 0 ? (
      <div className="text-primary">
        <small className="mb-0 font-weight-normal mr-3">
          <strike>
            &#x20A6; <span>{price}</span>
          </strike>
        </small>
        &#x20A6; <span>{price * (1 - discount / 100)}</span>
      </div>
    ) : (
      <div className="mb-0 text-primary">
        &#x20A6; <span>{price}</span>
      </div>
    );

  renderOrderedProducts = () =>
    this.props.cart.map(({ name, cartQty, price, discountPercentage }) => (
      <div className="p-3 border border-secondary border-left-0 border-top-0 border-right-0">
        <div>{name}</div>
        {this.renderDiscountedPrice(price, discountPercentage)}
        <div>Qty: {cartQty}</div>
      </div>
    ));

  render() {
    let { cart } = this.props,
      cartTotal = cart
        .map(
          ({ price, discountPercentage, cartQty }) =>
            price * (1 - discountPercentage / 100) * cartQty
        )
        .reduce((a, item) => a + item, 0),
      cartTransport = 1000,
      combinedTotal = cartTotal + cartTransport;

    return this.props.cart.length < 1 ? (
      <Redirect to={{ pathname: "/cart" }} />
    ) : this.props.isSignedIn ? (
      <HrFrComp>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-12 bg-white shadow p-0 mb-4">
                  <div className="d-flex text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                    <div className="flex-grow-1 text-left">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-ash mr-2 pointer"
                      />
                      1. Address Details
                    </div>
                    <div className="flex-grow-1 text-right text-primary">
                      Change
                    </div>
                  </div>
                  <div className="py-4 px-5">
                    <p className="font-weight-bold">Jedidiah Amaraegbu</p>
                    <p>62 Akobi crescent, Surulere (Ojuelegba), Lagos</p>
                    <p>+2348165972229</p>
                  </div>
                </div>
                <div className="col-12 bg-white shadow p-0 mb-4">
                  <div className="text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-ash mr-2 pointer"
                    />
                    2. Delivery Method
                  </div>
                  <div className="py-4 px-5">
                    <p>How do you want your order delivered?</p>

                    <div>
                      <div className="form-check my-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="option1"
                          checked
                        />
                        <label
                          className="form-check-label"
                          for="exampleRadios1"
                        >
                          <div>
                            <p className="lead font-weight-bold">
                              Door Delivery
                            </p>
                            <p>
                              Delivered between <strong>Friday 14 Feb</strong>{" "}
                              and <strong>Tuesday 18 Feb</strong> for{" "}
                              <span className="text-primary">&#x20A6;1200</span>
                            </p>
                            <div className="border border-secondary p-2 my-3">
                              <ul>
                                <li>
                                  Large items (e.g. Freezers) may arrive 2
                                  business days later than other products.
                                </li>
                                <li>
                                  Living in Lagos, Abuja or Ibadan, receive free
                                  delivery with JUMIA PRIME!{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="form-check my-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios2"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          for="exampleRadios2"
                        >
                          <div>
                            <p className="lead font-weight-bold">
                              Pickup Station
                            </p>
                            <p>
                              Ready for pickup between{" "}
                              <strong>Friday 14 Feb</strong> and{" "}
                              <strong>Tuesday 18 Feb</strong>
                            </p>
                            <button className="btn btn-link text-uppercase">
                              Select Pickup Station
                            </button>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 offset-1">
              <div className="row">
                <div className="col-12 shadow bg-white border border-light p-0">
                  <div className="lead text-uppercase font-weight-bold border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                    Your Order ({cart.length} items)
                  </div>
                  {this.renderOrderedProducts()}
                  <div className="d-flex p-3 font-weight-bold border border-secondary border-top-0 border-right-0 border-left-0">
                    <div className="text-left flex-grow-1">Subtotal</div>
                    <div className="text-right flex-grow-1">
                      &#x20A6; {cartTotal}
                    </div>
                  </div>
                  <div className="d-flex p-3 font-weight-bold border border-secondary border-top-0 border-right-0 border-left-0">
                    <div className="text-left flex-grow-1">Shipping Cost</div>
                    <div className="text-right flex-grow-1">
                      &#x20A6; {cartTransport}
                    </div>
                  </div>

                  <div className="d-flex p-3 font-weight-bold lead">
                    <div className="text-left flex-grow-1 text-uppercase">
                      total
                    </div>
                    <div className="text-right flex-grow-1">
                      &#x20A6; {combinedTotal}
                    </div>
                  </div>
                </div>

                <div className="col-12 text-center my-3 font-weight-bold">
                  <Link to="/cart" className="text-uppercase">
                    Modify your cart
                  </Link>
                </div>
              </div>
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
