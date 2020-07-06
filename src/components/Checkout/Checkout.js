/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { toast } from 'react-toastify';
import HrFr from '../HrFr/HrFr.js';
import Price from '../ProductList/ProductDisplay/Price.js';
import AuthRedirect from '../Auth/AuthRedirect.js';
import Image from '../Image/Image.js';
import AddressForm from './AddressForm.js';
import PackageList from '../User/Packages/PackageList.js';
import { deliveryPackagesOneSelected } from '../../redux/actions/deliveryPackages.js';
import { orderAdd } from '../../redux/actions/orders.js';

class CheckOut extends Component {
  INIT = {
    address: {},
    btnOrder: 'Place Order'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    user: PropTypes.object,
    isSignedIn: PropTypes.bool,
    stores: PropTypes.array,
    deliveryPackages: PropTypes.array,
    selectedDeliveryPackage: PropTypes.object,
    deliveryPackagesOneSelected: PropTypes.func,
    orderAdd: PropTypes.func
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

  renderDeliveryPackages = (list) => (this.state.address && this.state.address.name ? (
      <div className="py-4 px-5">
        {list > 0 ? (
          <p>
            How do you want your order delivered?
            <br />
            Select one
          </p>
        ) : (
          ''
        )}

        <PackageList packages={list} count={4} title="Your Delivery Packages" />
      </div>
  ) : (
    ''
  ));

  componentDidMount = () => {
    this.setState({
      address: {
        name: this.props.user && this.props.user.name,
        address: this.props.user && this.props.user.address,
        state: this.props.user && this.props.user.state,
        phone: this.props.user && this.props.user.phone
      }
    });

    this.props.deliveryPackagesOneSelected({});
  };

  toAndFroms = (cart, stores, address) => {
    const shopsInCheckOutID = _.uniq(cart.map(({ shop }) => shop));
    const shopsInCheckOut = stores.filter(({ _id }) => shopsInCheckOutID.includes(_id));

    return { froms: shopsInCheckOut.map(({ state }) => state), to: address && address.state };
  };

  appropriatePackages = (deliveryPackages, toAndFroms) => deliveryPackages.filter(({
    method, pickupStation, to, from
  }) => (method === 'pickup'
    ? pickupStation && pickupStation.state === toAndFroms.to
    : toAndFroms.to === to && from === toAndFroms.froms.includes(from)));

  orderCreate = ({ _id, cart }, totalPrice, selectedDeliveryPackage) => {
    this.setState({
      btnOrder: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    const deliveryPackage = selectedDeliveryPackage._id;

    this.props
      .orderAdd({
        products: cart,
        user: _id,
        totalPrice,
        deliveryPackage
      })
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => this.setState({ btnOrder: this.INIT.btnOrder }));
  };

  render() {
    const { user, stores, selectedDeliveryPackage } = this.props;
    const cart = (user && user.cart) || [];
    const uniqCart = _.uniqBy(user && user.cart, '_id') || [];
    const cartTotal = cart.map(({ price }) => price).reduce((total, price) => total + price, 0);
    const cartTotalDiscount = cart
      .map((
        { price, discountPercentage }
      ) => (discountPercentage < 1
        ? price
        : (1 - discountPercentage / 100) * price))
      .reduce((total, price) => total + price, 0);
    const { address, btnOrder } = this.state;
    const cartTransport = (selectedDeliveryPackage && selectedDeliveryPackage.cost) || 0;
    const combinedTotal = cartTotalDiscount + cartTransport;
    const list = this.appropriatePackages(
      this.props.deliveryPackages,
      this.toAndFroms(cart, stores, address)
    );

    return (
      <>
        <AuthRedirect type="checkout" />
        <HrFr>
          <div className="container mt-5 py-5" id="checkOut">
            <div className="row">
              <div className="col-12 col-lg">
                <div className="row">
                  <div
                    className="col-12 bg-sm-white shadow-sm p-0 mb-4 form-container"
                    id="formContainer"
                  >
                    <div className="d-flex text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      <div className="flex-grow-1 text-left">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className={`${
                            address && address.address ? 'text-primary-benshada' : 'text-ash'
                          } mr-2`}
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
                  <div className="col-12 bg-sm-white shadow-sm p-0 mb-4">
                    <div className="text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={`${
                          selectedDeliveryPackage && selectedDeliveryPackage.cost
                            ? 'text-primary-benshada'
                            : 'text-ash'
                        } mr-2`}
                      />
                      2. Delivery Method
                    </div>
                    {this.renderDeliveryPackages(list)}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 offset-lg-1">
                <div className="row">
                  <div className="col-12 shadow-sm bg-sm-white border border-light p-0">
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
              <div className="col-12">
            <button
              className="btn btn-primary d-block w-100"
              onClick={() => this.orderCreate(user, combinedTotal, selectedDeliveryPackage)}
            >
              {btnOrder}
            </button>
            <small>This is where you go ahead to make payment</small>
          </div>
            </div>
          </div>

        </HrFr>
      </>
    );
  }
}

const mapStateToProps = ({
  cart, auth, store, deliveryPackage
}) => ({
  cart,
  isSignedIn: auth.isSignedIn,
  stores: store.all,
  deliveryPackages: deliveryPackage.all,
  selectedDeliveryPackage: deliveryPackage.selected
});

export default connect(mapStateToProps, { deliveryPackagesOneSelected, orderAdd })(CheckOut);
