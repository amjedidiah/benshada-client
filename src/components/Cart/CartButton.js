import React, { Component } from "react";
import { connect } from "react-redux";
import { cartRemove, cartAdd } from "../../actions/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCartPlus } from "@fortawesome/free-solid-svg-icons";

class CartButton extends Component {
  render() {
    const { cart, product, cartRemove, cartAdd, qty } = this.props,
      _id = product && product._id;

    return cart.filter((item) => item._id === _id).length > 0 ? (
      <FontAwesomeIcon
        icon={faShoppingCart}
        onClick={() => cartRemove(product)}
        className="pointer text-primary"
      />
    ) : (
      <FontAwesomeIcon
        icon={faCartPlus}
        onClick={() => cartAdd(product, qty)}
        className="pointer text-primary"
      />
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, { cartRemove, cartAdd })(CartButton);
