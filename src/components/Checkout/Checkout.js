/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import _ from 'lodash';
import HrFr from '../HrFr/HrFr.js';
import Price from '../ProductList/ProductDisplay/Price.js';
import AuthRedirect from '../Auth/AuthRedirect.js';
import Image from '../Image/Image.js';
import AddressForm from './AddressForm.js';

class CheckOut extends Component {
  INIT = {
    address: {},
    deliveryPackage: []
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    user: PropTypes.object,
    isSignedIn: PropTypes.bool
  };

  renderOrderedProducts = (cart) => cart.map(({
    name, price, discountPercentage, _id, color, image
  }, key) => {
    const qty = this.props.user.cart.filter((product) => product._id === _id).length;
    return (
        <div
          className="p-3 border border-secondary border-left-0 border-top-0 border-right-0 d-flex"
          key={key}
        >
          <div className="flex-grow-1 d-flex">
            <Image type="product" id={_id} image={image} xtraClass="mr-2" />
            <div>
              <span>{name}</span>
              <br />
              <div
                style={{
                  backgroundColor: color,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  marginTop: '5px'
                }}
              ></div>
            </div>
          </div>
          <div className="align-self-center">
            <p>X {qty}</p>
            <Price price={price * qty} discount={discountPercentage} />
          </div>
        </div>
    );
  });

  submitAddress = ({
    firstName, familyName, phone, address, state
  }) => this.setState({
    address: {
      name: `${firstName} ${familyName}`,
      phone,
      address,
      state
    }
  });

  renderAddress = () => {
    const {
      name, address, state, phone
    } = this.state.address;

    return name ? (
      <div className="py-4 px-5">
        <p className="font-weight-bold">{name}</p>
        <p>
          {address}, {state}
        </p>
        <p>+{phone}</p>
      </div>
    ) : (
      <div className="form-container-holder" id="formContainerHolder">
        <AddressForm buttonValue="Continue" onSubmit={this.submitAddress} />
      </div>
    );
  };

  renderDeliveryPackages = () => (
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
          <label className="form-check-label" htmlFor="exampleRadios1">
            <div>
              <p className="lead font-weight-bold">Door Delivery</p>
              <p>
                Delivered between <strong>Friday 14 Feb</strong> and <strong>Tuesday 18 Feb</strong>{' '}
                for <span className="text-primary-benshada">&#x20A6;1200</span>
              </p>
              <div className="border border-secondary p-2 my-3">
                <ul>
                  <li>
                    Large items (e.g. Freezers) may arrive 2 business days later than other
                    products.
                  </li>
                  <li>Living in Lagos, Abuja or Ibadan, receive free delivery with JUMIA PRIME!</li>
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
          <label className="form-check-label" htmlFor="exampleRadios2">
            <div>
              <p className="lead font-weight-bold">Pickup Station</p>
              <p>
                Ready for pickup between <strong>Friday 14 Feb</strong> and{' '}
                <strong>Tuesday 18 Feb</strong>
              </p>
              <button className="btn btn-link text-uppercase">Select Pickup Station</button>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  componentDidMount = () => this.setState({
    address: {
      name: this.props.user && this.props.user.name,
      address: this.props.user && this.props.user.address,
      state: this.props.user && this.props.user.state,
      phone: this.props.user && this.props.user.phone
    }
  });

  render() {
    const { user } = this.props;
    const cart = (user && user.cart) || [];
    const uniqCart = _.uniqBy(user && user.cart, '_id') || [];
    const cartTotal = cart.map(({ price }) => price).reduce((total, price) => total + price, 0);
    const cartTotalDiscount = cart
      .map(
        ({ price, discountPercentage }) => (discountPercentage < 1
          ? price
          : (1 - discountPercentage / 100) * price)
      )
      .reduce((total, price) => total + price, 0);
    const cartTransport = 1000;
    const combinedTotal = cartTotalDiscount + cartTransport;
    const { address } = this.state;

    if (cart.length < 1) return <Redirect to={{ pathname: '/user/cart' }} />;

    return (
      <>
        <AuthRedirect type="logout" />
        <HrFr>
          <div className="container mt-5 py-5" id="checkOut">
            <div className="row">
              <div className="col">
                <div className="row">
                  <div
                    className="col-12 bg-white shadow p-0 mb-4 form-container"
                    id="formContainer"
                  >
                    <div className="d-flex text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      <div className="flex-grow-1 text-left">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className={`${
                            address && address.address ? 'text-primary-benshada' : 'text-ash'
                          } mr-2 pointer`}
                        />
                        1. Address Details
                      </div>
                      {address && address.address ? (
                        <>
                          <div className="flex-grow-1 text-right text-primary-benshada">
                            <span
                              className="pointer"
                              data-toggle="modal"
                              data-target="#addressModal"
                            >
                              Change
                            </span>
                          </div>
                          <div
                            className="modal fade"
                            id="addressModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="modelTitleId"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-lg" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Change Address</h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body p-0 form-container" id="formContainer">
                                  <div className="form-container-holder" id="formContainerHolder">
                                    <AddressForm buttonValue="Save" onSubmit={this.submitAddress} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ''
                      )}{' '}
                    </div>
                    {this.renderAddress()}
                  </div>
                  <div className="col-12 bg-white shadow p-0 mb-4">
                    <div className="text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-ash mr-2 pointer" />
                      2. Delivery Method
                    </div>
                    {this.renderDeliveryPackages()}
                  </div>
                </div>
              </div>
              <div className="col-4 offset-1">
                <div className="row">
                  <div className="col-12 shadow bg-white border border-light p-0">
                    <div className="lead text-uppercase font-weight-bold border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      Your Order ({uniqCart.length} item{cart.length > 1 ? 's' : ''})
                    </div>
                    {this.renderOrderedProducts(uniqCart)}
                    <div className="d-flex p-3 font-weight-bold border border-secondary border-top-0 border-right-0 border-left-0">
                      <h4 className="text-left flex-grow-1">Subtotal</h4>
                      <div className="text-right flex-grow-1">
                        <Price
                          price={cartTotal}
                          discount={((cartTotal - cartTotalDiscount) / cartTotal) * 100}
                        />
                      </div>
                    </div>
                    <div className="d-flex p-3 font-weight-bold border border-secondary border-top-0 border-right-0 border-left-0">
                      <h4 className="text-left flex-grow-1">Shipping Cost</h4>
                      <div className="text-right flex-grow-1">
                        <Price price={cartTransport} />
                      </div>
                    </div>

                    <div className="d-flex p-3 font-weight-bold lead">
                      <h4 className="text-left flex-grow-1 text-uppercase">total</h4>
                      <div className="text-right flex-grow-1">
                        <Price price={combinedTotal} />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-center my-4 font-weight-bold">
                    <Link to="/user/cart" className="text-uppercase">
                      Modify your cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HrFr>
      </>
    );
  }
}

const mapStateToProps = ({ cart, auth }) => ({
  cart,
  isSignedIn: auth.isSignedIn
});

export default connect(mapStateToProps)(CheckOut);
