import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { cartRemove, cartAdd } from '../../actions/cart.js';

class CartButton extends Component {
  static propTypes = {
    cart: PropTypes.array,
    product: PropTypes.object,
    cartRemove: PropTypes.func,
    cartAdd: PropTypes.func,
    qty: PropTypes.number
  }

  render() {
    const {
      cart, product, qty
    } = this.props;
    const { _id } = product;

    // eslint-disable-next-line no-underscore-dangle
    return cart.filter((item) => item._id === _id).length > 0 ? (
      <button className="btn btn-danger mb-2 mb-sm-0" onClick={() => this.props.cartRemove(product)}>
        Remove <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    ) : (
      <button className="btn btn-primary mb-2 mb-sm-0" onClick={() => this.props.cartAdd(product, qty)}>
        Add <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, { cartRemove, cartAdd })(CartButton);
