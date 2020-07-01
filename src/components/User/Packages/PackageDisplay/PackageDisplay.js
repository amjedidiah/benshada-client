/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { deliveryPackageUpdate } from '../../../../redux/actions/deliveryPackages.js';
import Price from '../../../ProductList/ProductDisplay/Price.js';
import ButtonPackageOwner from './ButtonPackageOwner.js';

class PackageDisplay extends Component {
  static propTypes = {
    deliveryPackage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    deliveryPackageUpdate: PropTypes.func
  };

  renderDetails = ({
    method, pickupStation, to, from, duration
  }) => {
    if (method === 'pickup') {
      const { name, address, state } = pickupStation;
      return (
        <>
          <small className="d-block font-weight-bold" style={{ lineHeight: '16px' }}>
            {name}
          </small>
          <small className="d-block" style={{ lineHeight: '16px' }}>
            {address}, <br />
            {state}
          </small>
        </>
      );
    }
    return (
      <>
        <small className="d-block font-weight-bold" style={{ lineHeight: '16px' }}>
          {from} <FontAwesomeIcon icon={faArrowRight} /> {to}
        </small>
        <small className="d-block" style={{ lineHeight: '16px' }}>
          {duration} days
        </small>
      </>
    );
  };

  renderActionButtons = (deliveryPackage) => {
    const { deliveryCompany } = deliveryPackage;

    return deliveryCompany.contactPerson === this.props.user._id ? (
      <ButtonPackageOwner deliveryPackage={deliveryPackage} user={this.props.user} />
    ) : (
      ''
    );
  };

  render() {
    const { deliveryPackage } = this.props;
    const { cost, deliveryCompany, method } = deliveryPackage;

    return (
      <>
        <div
          className={`card mb-4 product rounded shadow-sm border-0  bg-${
            method === 'pickup' ? 'dark' : 'secondary'
          } text-white`}
        >
          <div className="card-body p-0">
            <div
              className={`d-flex align-items-center bg-white text-${
                method === 'pickup' ? 'dark' : 'secondary'
              } p-3`}
            >
              <h2 className="flex-grow-1 mb-0">
                <Price price={cost} />
              </h2>
              {this.renderActionButtons(deliveryPackage)}
            </div>

            <div className="p-3">
              <div>
                <small className="d-block text-uppercase" style={{ lineHeight: '16px' }}>
                  {method}
                </small>
                {this.renderDetails(deliveryPackage)}
              </div>
              <div className="flex-grow-1 d-flex mt-3">
                <div
                  style={{ width: '60px', height: '60px', overflow: 'hidden' }}
                  className="rounded-circle mr-1"
                >
                  <img
                    src={deliveryCompany && deliveryCompany.image}
                    alt=""
                    className="img-fluid"
                    style={{ minHeight: '60px', minWidth: '60px' }}
                  />
                </div>
                <div className="flex-grow-1 d-flex flex-column justify-content-center">
                  <small
                    className="d-block font-weight-bold text-uppercase"
                    style={{ lineHeight: '16px' }}
                  >
                    {deliveryCompany && deliveryCompany.name}
                  </small>
                  <small className="d-block" style={{ lineHeight: '16px' }}>
                    {deliveryCompany && deliveryCompany.email}
                  </small>
                  <small className="d-block" style={{ lineHeight: '16px' }}>
                    {deliveryCompany && deliveryCompany.phone}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user: user.selected });

export default connect(mapStateToProps, { deliveryPackageUpdate })(PackageDisplay);
