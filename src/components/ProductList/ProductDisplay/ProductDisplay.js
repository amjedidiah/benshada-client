import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Price from './Price.js';
import Image from '../../Image/Image.js';
import Rating from './Rating.js';
import Returns from './Returns.js';
import ButtonProductBuyer from './Buttons/ButtonProductBuyer.js';
import ButtonProductOwner from './Buttons/ButtonProductOwner.js';

class ProductDisplay extends Component {
  static propTypes = {
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  renderActionButtons = (product) => {
    const { user } = this.props;
    const shops = (user && user.shops) || [];
    const { shop, isBatch } = product;

    if (shops.includes(shop) || (user && user.type === 'ADMIN')) {
      return <ButtonProductOwner product={product} user={user} />;
    }

    if (isBatch && (user && user.type) === 'UB') {
      return <ButtonProductBuyer product={product} user={user} />;
    }

    if (!isBatch && (user && user.type) === 'UC') {
      return <ButtonProductBuyer product={product} user={user} />;
    }

    return <ButtonProductBuyer product={product} user={user} />;
  };

  render() {
    const { product } = this.props;
    const {
      _id, name, image, price, discountPercentage, overallRating, returns
    } = product;

    return (
      <div className="card mb-4 product rounded shadow-sm border-0" key={`product${_id}`}>
        <div className="card-body p-0">
          <Image name={name} image={image} type="product" size={6} id={_id} />

          <div className="text-left p-3">
            <div className="d-flex">
              <div className="d-flex flex-grow-1 justify-content-start">
                <Rating rating={overallRating} xtraClass="mr-2" />
                <Returns returns={returns} />
              </div>
              <div className="d-flex flex-grow-1 justify-content-end">{this.renderActionButtons(product)}</div>
            </div>
            <Link to={`/products/?id=${_id}`}>{name}</Link>

            <p className="">
              <Price price={price} discount={discountPercentage} />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user: user.selected });

export default connect(mapStateToProps)(ProductDisplay);
