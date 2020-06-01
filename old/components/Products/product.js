import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  // faBox,
  faPencilAlt,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { productDelete, productUpdate, userUpdateProfile } from '../../actions/user.js';
import { filterContent } from '../../actions/load.js';
import BenshadaForm from '../BenshadaForm/BenshadaForm.js';
import { ifSeller } from '../../actions/auth.js';
import { cartAdd, cartRemove } from '../../actions/cart.js';
import CartButton from '../Cart/CartButton.js';
import Loading from '../Misc/Loading/Loading.js';
import NotFound from '../Misc/NotFound/NotFound.js';
import Price from './Price.js';
import Src from '../Src/Src.js';
import { unique } from '../../prototypes.js';

class Product extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool,
    user: PropTypes.object,
    userUpdateProfile: PropTypes.func,
    productDelete: PropTypes.func,
    title: PropTypes.string,
    products: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    className: PropTypes.string,
    productUpdate: PropTypes.func
  }

  renderProductActions(i, id, product) {
    const saved = (this.props.user && this.props.user.saved) || [];

    if (!this.props.isSignedIn || !ifSeller(this.props.user && this.props.user.type)) {
      return <>
      <button className="btn mr-3">
        {saved.filter(({ _id }) => _id === id).length > 0 ? (
          <FontAwesomeIcon
            className="text-primary"
            onClick={() => this.props.userUpdateProfile({
              saved: unique(saved.filter(({ _id }) => _id !== id))
            })
            }
            icon={faHeart}
          />
        ) : (
          <FontAwesomeIcon
            className="text-primary"
            onClick={() => this.props.userUpdateProfile({ saved: unique([...saved, product]) })}
            icon={faHeart}
          />
        )}
      </button>
      <CartButton product={product} qty={1} />
    </>;
    } if (window.location.pathname.includes('user')) {
      return <>
      <button className="btn btn-danger mr-3" onClick={() => this.props.productDelete(id)}>
        <FontAwesomeIcon className="text-primary ml-2" icon={faTrash} /> Delete
      </button>
      <button className="btn btn-primary" data-toggle="modal" data-target={`#productUpdateModal${i}`}>
        <FontAwesomeIcon icon={faPencilAlt} /> Edit
      </button>
    </>;
    } return false;
  }

  renderProducts = (products) => {
    if (products === null) return <Loading />;

    return (products === undefined || products.length < 1 ? (
      <NotFound type="product" />
    ) : (
      <div className="card-columns products my-2">
        {filterContent(products).map((product, i) => {
          const {
            _id, discountPercentage, name, price, image
          } = product;
          const productFields = [
            {
              desc: '_id',
              varClass: 'input',
              type: 'hidden',
              options: [],
              icon: 0
            },
            {
              desc: 'name',
              label: 'Name',
              placeholder: 'Product Name',
              varClass: 'input',
              type: 'text',
              options: [],
              row: 1,
              icon: 0
            },
            {
              desc: 'description',
              label: 'Description',
              placeholder: 'Product Description',
              varClass: 'textarea',
              type: 'text',
              options: [],
              row: 2,
              icon: 0
            },
            {
              desc: 'price',
              label: 'Price',
              varClass: 'input',
              type: 'number',
              options: [],
              row: 1,
              icon: 1,
              help: 'Enter Naira value of price'
            },
            {
              desc: 'discountPercentage',
              label: 'Discount',
              varClass: 'input',
              type: 'number',
              options: [],
              row: 2,
              icon: 0,
              help: 'Discount in percentage'
            }
          ];
          const productButtons = [{ value: 'Upload Changes', className: 'btn-primary' }];

          return (
            <div key={`renderProducts${i}`}>
              <div className="card mb-4 product rounded shadow-sm border-0" key={`product${_id}`}>
                <div className="card-body p-0">
                  <Src name={name} image={image} type="product" size={6} xtraClass="p-3" />

                  <div className="text-left p-3">
                    <p>
                      <Link to={`/products/?id=${_id}`}>{name}</Link>
                    </p>
                    <p className="lead font-weight-bold">
                      <Price price={price} discount={discountPercentage} />
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id={`productUpdateModal${i}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={`productUpdateModalLabel${i}`}
                aria-hidden="true"
                key={`productModal${i}`}
              >
                <div className="modal-dialog modal-xl" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title font-weight-light" id={`productUpdateModalLabel${i}`}>
                        Edit {name}
                      </h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body text-left">
                      <BenshadaForm
                        form={`form-product-edit${i}`}
                        onSubmitForm={this.props.productUpdate}
                        className="form"
                        fields={productFields}
                        buttons={productButtons}
                        initialValues={product}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ));
  }

  render() {
    return (
      <div className={`container my-3 ${this.props.className}`}>
        <div className="row">
          <div className="col p-0">
            <h4 className="text-left text-uppercase">{this.props.title}</h4>
            {this.renderProducts(this.props.products)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, order, cart }) => ({
  isSignedIn: auth.isSignedIn,
  user: auth.user,
  orders: order,
  cart
});

export default connect(mapStateToProps, {
  productDelete,
  productUpdate,
  userUpdateProfile,
  cartAdd,
  cartRemove
})(Product);
