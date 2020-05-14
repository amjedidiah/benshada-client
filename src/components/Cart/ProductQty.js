import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default class ProductQty extends Component {
  decreaseQuantity = (product) =>
    this.props.quantity - 1 === 0 ? '' : this.props.resetQty(product, this.props.quantity - 1);

  increaseQuantity = (product) => this.props.resetQty(product, this.props.quantity + 1);

  render() {
    const { quantity, product } = this.props;
    return (
      <>
        <FontAwesomeIcon icon={faMinus} onClick={() => this.decreaseQuantity(product)} className="pointer" />{' '}
        <span className="text-uppercase mx-3 text-secondary">{quantity}</span>{' '}
        <FontAwesomeIcon icon={faPlus} onClick={() => this.increaseQuantity(product)} className="pointer" />
      </>
    );
  }
}
