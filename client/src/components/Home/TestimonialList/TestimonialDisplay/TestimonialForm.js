/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { testimonialValidate as validate } from '../../../../assets/js/validate.js';

import '../../../../assets/css/form.css';
import FormField from '../../../form/formField.js';

class TestimonialForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationClass: 'animate__zoomIn'
    };
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    testimonial: PropTypes.object,
    initialValues: PropTypes.object,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize:
      (prvP.testimonial && prvP.testimonial._id)
      !== (this.props.testimonial && this.props.testimonial._id)
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize ? this.props.initialize(this.props.testimonial) : '');

  render() {
    const { animationClass } = this.state;

    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${animationClass} m-0`}
        autoComplete="off"
      >
        <h2 className="mb-0">Edit testimonial</h2>
        <p>
          Make changes to your testimonial
          <FontAwesomeIcon icon={faUserEdit} className="ml-2" />
        </p>
        <div className="form-row">
          <Field
            action="testimonial"
            name="testimony"
            type="textarea"
            component={FormField}
            label="Testimony"
            className="col-12"
            placeholder="e.g Benshada's place meets all my fashion needs"
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

const mapStateToProps = ({ testimonial }) => ({
  testimonial: testimonial.selected
});

export default reduxForm({
  form: 'testimonialForm',
  validate,
  warn
})(connect(mapStateToProps)(TestimonialForm));
