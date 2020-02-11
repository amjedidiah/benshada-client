import React, { Component } from "react";
import { connect } from "react-redux";
import { cartRemove, cartAdd } from "../../actions/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class CartButton extends Component {
  render() {
    const { cart, product, cartRemove, cartAdd } = this.props,
      { _id } = product;

    return cart.filter(item => item._id === _id).length > 0 ? (
      <button
        className="btn btn-danger mx-2 mb-2 mb-sm-0"
        onClick={() => cartRemove(product)}
      >
        Remove <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    ) : (
      <button
        className="btn btn-primary mx-2 mb-2 mb-sm-0"
        onClick={() => cartAdd(product)}
      >
        Add <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, { cartRemove, cartAdd })(CartButton);
