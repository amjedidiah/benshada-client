/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  faSignInAlt,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginValidate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationClass: 'animate__zoomIn'
    };
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    onBlur: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  render() {
    const { animationClass } = this.state;

    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${animationClass} m-0 px-lg-5`}
        autoComplete="off"
      >
        <h2 className="mb-2 text-center pt-5">Login to Benshada Place <FontAwesomeIcon icon={faSignInAlt} className="ml-2" /></h2>
      <p className="lead mb-4 text-center">
        Or return{' '}
        <Link to="/">
          home
        </Link>
      </p>
        <div className="form-row">
          <Field
            action="login"
            name="email"
            type="email"
            component={FormField}
            label="Email Address"
            icon={faEnvelope}
            className="col-12"
            placeholder="e.g john.doe@example.com"
          />
        </div>

        <div className="form-row">
          <Field
            action="login"
            name="password"
            type="password"
            component={FormField}
            label="Password"
            icon={faLock}
            className="col-12"
            placeholder="Type here"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
          <Link to="/register" type="button" className="btn">
            Register
          </Link>
        </div>
      </form>
    );
  }
}

const warn = () => ({});

export default reduxForm({
  form: 'loginForm',
  loginValidate,
  warn
})(LoginForm);
