import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  productDelete,
  productUpdate,
  productsOneSelected
} from '../../../../redux/actions/products.js';
import ProductForm from '../ProductForm.js';

class ButtonProductOwner extends React.Component {
  INIT = {
    buttonValue: 'Update Product'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    product: PropTypes.object,
    user: PropTypes.object,
    productDelete: PropTypes.func,
    productsOneSelected: PropTypes.func,
    productUpdate: PropTypes.func
  };

  submit = ({
    _id,
    name,
    shortDescription,
    longDescription,
    price,
    discountPercentage,
    quantity,
    color,
    category,
    gender,
    mainMaterial,
    productionCountry,
    guarantee,
    batchQuality,
    isBatch,
    sizes
  }) => {
    this.setState({
      buttonValue: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    const product = {
      name,
      shortDescription,
      longDescription,
      price,
      discountPercentage,
      quantity,
      color,
      category,
      gender,
      mainMaterial,
      productionCountry,
      guarantee,
      batchQuality,
      isBatch,
      sizes
    };

    Object.keys(product).forEach((key) => {
      if (product[key] === undefined) {
        delete product[key];
      }
    });

    this.props.productUpdate(_id, product).catch((err) => {
      this.setState(this.INIT);
      toast.error(
        (err
          && err.response
          && err.response.data
          && err.response.data.message
          && err.response.data.message.name)
          || (err && err.response && err.response.statusText)
          || 'Network error'
      );
    });
  };

  render = () => {
    const { product } = this.props;
    const { _id, name } = product;

    return (
      <>
        <span className="pointer ml-2" data-toggle="modal" data-target="#productEdit">
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => this.props.productsOneSelected(product)}
          />
        </span>
        <span className="pointer ml-2" data-toggle="modal" data-target="#productDelete">
          <FontAwesomeIcon icon={faTrash} />
        </span>

        {/* Modal */}
        <div
          className="modal fade"
          id="productEdit"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <ProductForm
                  buttonValue={this.state.buttonValue}
                  onSubmit={this.submit}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="productDelete"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Product</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete <strong>{name}</strong>?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props.productDelete(_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

export default connect(null, { productDelete, productUpdate, productsOneSelected })(
  ButtonProductOwner
);
