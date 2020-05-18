import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotFound from '../Misc/NotFound/NotFound.js';
import { ifSeller } from '../../actions/auth.js';
import { orderCancel } from '../../actions/user.js';

class Order extends Component {
  static propTypes = {
    orders: PropTypes.array,
    user: PropTypes.object,
    orderCancel: PropTypes.func
  }

  makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  renderDiscountedPrice = (price, discount) => (discount > 0 ? (
      <>
        <small className="mb-0 font-weight-normal">
          <strike>
            &#x20A6; <span>{price}</span>
          </strike>
        </small>
        <p className="mb-0">
          &#x20A6; <span>{price * (1 - discount / 100)}</span>
        </p>
      </>
  ) : (
      <p className="mb-0">
        &#x20A6; <span>{price}</span>
      </p>
  ));

  render() {
    const { orders } = this.props;

    return orders.length < 1 ? (
      <NotFound type="order" />
    ) : (
      <div className="card-columns products">
        {orders.map(({
          products, status, _id, user, totalPrice, createdAt
        }, i) => (
          <>
            <div className="card mb-4 pb-3 product rounded shadow-sm border-0" key={`orderCard${i}`}>
              <div className="card-body p-0">
                <div className="d-flex orders">
                  {products.map(({ name, src }, j) => (
                    <div className="card-img-holder border border-light shadow-sm" key={j}>
                      <img src={src} className="img-fluid" alt={name} />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="px-3">
                    <p className="float-left mr-3 rounded-0 text-left">
                      <small>{new Date(createdAt).toDateString()}</small>
                    </p>
                    <h4 className="flex-grow-1 font-weight-bold text-right">
                      <p className="mb-0">
                        &#x20A6; <span>{totalPrice}</span>
                      </p>
                    </h4>
                    <div className="clear"></div>
                  </div>
                  <div className="my-4 px-3 text-center">
                    <p className="lead text-truncate text-capitalize my-0">{_id}</p>
                    <small className="text-uppercase font-weight-bold my-0">{user && user.name}</small>

                    <p className="py-1 px-2 rounded-0 text-white bg-success ml-auto mr-auto">{status}</p>
                  </div>
                  <button className="btn btn-primary mx-3" data-toggle="modal" data-target={`#orderModal${i}`}>
                    View
                  </button>
                  {ifSeller(this.props.user.type) ? (
                    <button className="btn btn-danger mx-3" onClick={() => this.props.orderCancel(_id)}>
                      Delete
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id={`orderModal${i}`}
              tabIndex="-1"
              role="dialog"
              aria-labelledby={`orderModalLabel${i}`}
              aria-hidden="true"
              key={`orderModal${i}`}
            >
              <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title font-weight-light" id={`#orderModalLabel${i}`}>
                      Order {_id}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {products.map(({ name, price, discountPercentage }, j) => (
                      <div className="container bg-white p-4 mb-4 text-center d-md-flex shadow-sm" key={j}>
                        {/* <img
                    src={src}
                    className="float-sm-left rounded mr-4 cart-img mb-3"
                    alt={name}
                  /> */}
                        <div className="flex-grow-1 text-left">
                          <h4>{name}</h4>
                          <div className="my-4">
                            {/* <p className="float-sm-left">Quantity: 1</p> */}
                            <p className="lead font-weight-bold float-sm-right">
                              ₦ {this.renderDiscountedPrice(price, discountPercentage)}
                            </p>
                            <div className="clear"></div>
                          </div>
                          {/* <div className="my-4">
                      <p className="float-sm-left">
                        Color
                        <span className="bg-primary px-3 py-2 mr-2 rounded"></span>
                      </p>
                      <div className="clear"></div>
                    </div> */}
                        </div>
                        <div className="clear"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(mapStateToProps, { orderCancel })(Order);
