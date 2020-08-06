/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faDollarSign, faPercentage, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { ticketResponseValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';
import categories from '../../../assets/js/categories.js';
import genders from '../../../assets/js/genders.js';
import ticketResponseSizes from '../../../assets/data/sizes.json';
import ImageUpload from '../../Image/ImageUpload.js';

class TicketResponseForm extends Component {
  INIT = {
    animationClass: 'animate__zoomIn',
    imageButtonValue: 'Select Image',
    data: null,
    buttonTicketResponse: 'respond'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    ticketResponse: PropTypes.object,
    onSubmit: PropTypes.func,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize:
      (prvP.ticketResponse && prvP.ticketResponse._id)
      !== (this.props.ticketResponse && this.props.ticketResponse._id)
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize ? this.props.initialize(this.props.ticketResponse) : '');

  componentDidMount = () => this.props.initialize(this.props.ticketResponse);

  onSubmit = ({
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
    ticketResponseionCountry,
    guarantee,
    sizes,
    batchQuality
  }) => {
    const { data } = this.state;

    if (!data) {
      return toast.error('Do select an image');
    }

    const ticketResponseData = {
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
      ticketResponseionCountry,
      guarantee,
      sizes,
      batchQuality: batchQuality || 0
    };

    Object.entries(ticketResponseData).forEach(([key, value]) => {
      const v = key === 'sizes' ? value.map((size) => size.value) : value;

      return data.get(key) ? '' : data.append(key, v);
    });

    return this.props.onSubmit(data);
  };

  render() {
    const { animationClass } = this.state;

    return (
      <>
        <h2 className="mb-0 px-3 pt-4">
          {this.props.action ? 'Upload TicketResponse' : 'Edit TicketResponse'}
        </h2>
        <p className="px-3 pb-4 text-danger font-weight-bold lead">
          Image should be 680x850 pixels
        </p>
        <div
          className="position-absolute w-100 text-center item-upload"
          id="ticketResponseUpload"
          style={{
            top: '0'
          }}
        >
          <ImageUpload
            buttonValue={this.state.imageButtonValue}
            object={this.props.ticketResponse}
            onImageChange={(data) => this.setState({ data })}
            type="ticketResponse"
          />
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={`animate__animated ${animationClass} m-0`}
          autoComplete="off"
          id="ticketResponseForm"
        >
          <div className="form-row">
            <Field
              action="ticketResponse"
              name="name"
              type="text"
              component={FormField}
              label="TicketResponse Name"
              className="col-12"
              placeholder="e.g Oxford Shoes"
            />
          </div>

          <div className="form-row">
            <Field
              action="ticketResponse"
              name="shortDescription"
              type="textarea"
              component={FormField}
              label="Short Description"
              className="col-12 col-md-6"
              placeholder="e.g: Cooperate unisex shoes"
            />
            <Field
              action="ticketResponse"
              name="longDescription"
              type="textarea"
              component={FormField}
              label="Long Description"
              className="col-12 col-md-6"
              placeholder="e.g: Cooperate unisex shoes for men to go for weddings"
            />
          </div>

          <div className="form-row">
            <Field
              action="ticketResponse"
              name="price"
              type="number"
              component={FormField}
              label="Price"
              icon={faDollarSign}
              className="col-12 col-md-6"
              placeholder="e.g: 50000"
            />
            <Field
              action="ticketResponse"
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
              action="ticketResponse"
              name="quantity"
              type="number"
              component={FormField}
              label="Quantity"
              className="col-12 col-md-6"
              placeholder="e.g: 100"
            />

            <Field
              action="ticketResponse"
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
                action="ticketResponse"
                name="category"
                type="radio"
                component={FormField}
                label={name}
                icon={icon}
                className="col form-holder-select"
                value={name}
                key={`ticketResponse-category-${name}`}
              />
            ))}
          </div>

          <small className="section-header">Gender</small>
          <div className="form-row align-items-center">
            {genders.map(({ name, icon }) => (
              <Field
                action="ticketResponse"
                name="gender"
                type="radio"
                component={FormField}
                label={name}
                icon={icon}
                className="col form-holder-select"
                value={name}
                key={`ticketResponse-gender-${name}`}
              />
            ))}
          </div>

          <div className="form-row">
            <Field
              action="ticketResponse"
              name="mainMaterial"
              type="text"
              component={FormField}
              label="Main Material"
              className="col-12 col-md-6"
              placeholder="e.g: Leather"
            />
            <Field
              action="ticketResponse"
              name="ticketResponseionCountry"
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
              action="ticketResponse"
              name="guarantee"
              type="number"
              component={FormField}
              label="Days of Warranty"
              placeholder="e.g: 10"
              className="col-12 col-md-6"
            />
            {(this.props.ticketResponse && this.props.ticketResponse.isBatch)
            || (this.props.user && this.props.user.type === 'UA') ? (
              <Field
                action="ticketResponse"
                name="batchQuality"
                type="number"
                component={FormField}
                label="Batch Quality"
                placeholder="e.g: 30"
                className="col-12 col-md-6"
              />
              ) : (
                ''
              )}
          </div>

          <div className="form-row">
            <Field
              action="ticketResponse"
              name="sizes"
              type="multi"
              component={FormField}
              label="Available Sizes"
              className="col-12"
              options={ticketResponseSizes}
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
      </>
    );
  }
}

const warn = () => ({});

const mapStateToProps = ({ ticketResponse }) => ({
  ticketResponse: ticketResponse.selected
});

export default reduxForm({
  form: 'ticketResponseForm',
  validate,
  warn
})(connect(mapStateToProps)(TicketResponseForm));
