/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  faBox,
  faDollarSign,
  faPercentage,
  faPaintBrush
} from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { productValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';
import categories from '../../../assets/js/categories.js';
import genders from '../../../assets/js/genders.js';
import sizes from '../../../assets/data/sizes.json';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationClass: 'animate__zoomIn'
    };
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    product: PropTypes.object,
    initialValues: PropTypes.object,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prevProps) => ({
    shouldInitialize:
      prevProps.product
      && prevProps.product._id !== this.props.product
      && this.props.product._id
  });

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot.shouldInitialize) {
      this.props.initialize(this.props.product);
    }
  }

  render() {
    const { animationClass } = this.state;

    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${animationClass} m-0`}
        autoComplete="off"
      >
        <h2 className="mb-0">Edit {this.props.product && this.props.product.name}</h2>
        <p>
          Make changes to your product
          <FontAwesomeIcon icon={faBox} className="ml-2" />
        </p>
        <div className="form-row">
          <Field
            action="product"
            name="name"
            type="text"
            component={FormField}
            label="Product Name"
            icon={''}
            className="col-12"
            placeholder="e.g Oxford Shoes"
          />
        </div>

        <div className="form-row">
          <Field
            action="product"
            name="shortDescription"
            type="textarea"
            component={FormField}
            label="Short Description"
            icon={''}
            className="col-12 col-md-6"
            placeholder="e.g: Cooperate unisex shoes"
          />
          <Field
            action="product"
            name="longDescription"
            type="textarea"
            component={FormField}
            label="Long Description"
            icon={''}
            className="col-12 col-md-6"
          />
        </div>

        <div className="form-row">
          <Field
            action="product"
            name="price"
            type="number"
            component={FormField}
            label="Price"
            icon={faDollarSign}
            className="col-12 col-md-6"
            placeholder="e.g: 50000"
          />
          <Field
            action="product"
            name="discountPercentage"
            type="number"
            component={FormField}
            label="Discount"
            icon={faPercentage}
            className="col-12 col-md-6"
            placeholder="e.g: 10"
          />
        </div>

        <div className="form-row">
          <Field
            action="product"
            name="quantity"
            type="number"
            component={FormField}
            label="Quantity"
            icon={''}
            className="col-12 col-md-6"
            placeholder="e.g: 100"
          />

          <Field
            action="product"
            name="color"
            type="color"
            component={FormField}
            label="Color"
            icon={faPaintBrush}
            className="col-12 col-md-6"
            placeholder="#000000"
          />
        </div>

        <small className="section-header">Category</small>
        <div className="form-row align-items-center">
          {categories.map(({ name, icon }) => (
            <Field
              action="product"
              name="category"
              type="radio"
              component={FormField}
              label={name}
              icon={icon}
              className="col form-holder-select"
              value={name}
              key={`product-category-${name}`}
            />
          ))}
        </div>

        <small className="section-header">Gender</small>
        <div className="form-row align-items-center">
          {genders.map(({ name, icon }) => (
            <Field
              action="product"
              name="gender"
              type="radio"
              component={FormField}
              label={name}
              icon={icon}
              className="col form-holder-select"
              value={name}
              key={`product-gender-${name}`}
            />
          ))}
        </div>

        <div className="form-row">
          <Field
            action="product"
            name="mainMaterial"
            type="text"
            component={FormField}
            label="Main Material"
            icon={''}
            className="col-12 col-md-6"
            placeholder="e.g: Leather"
          />
          <Field
            action="product"
            name="productionCountry"
            type="text"
            component={FormField}
            label="Made In"
            placeholder="e.g: Nigeria"
            icon={faFlag}
            className="col-12 col-md-6"
          />
        </div>

        <div className="form-row">
          <Field
            action="product"
            name="guarantee"
            type="text"
            component={FormField}
            label="Days of Warranty"
            placeholder="e.g: 10"
            icon={''}
            className="col-12 col-md-6"
          />
          {this.props.product && this.props.product.isBatch ? <Field
            action="product"
            name="batchQuality"
            type="number"
            component={FormField}
            label="Batch Quality"
            placeholder="e.g: 30"
            icon={''}
            className="col-12 col-md-6"
          /> : ''}

        </div>

        <div className="form-row">
          <Field
            action="product"
            name="sizes"
            type="multi"
            component={FormField}
            label="Available Sizes"
            icon={''}
            className="col-12"
            options={sizes}
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Done
          </button>
        </div>
      </form>
    );
  }
}

const warn = () => ({});

const mapStateToProps = ({ product }) => ({
  product: product.selected
});

export default reduxForm({
  form: 'productForm',
  validate,
  warn
})(connect(mapStateToProps)(ProductForm));
