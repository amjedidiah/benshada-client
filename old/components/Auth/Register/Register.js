import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../../redux/old/actions/auth.js.js';

import '../Login/login.css';

import BenshadaForm from '../../BenshadaForm/BenshadaForm.js';

class Register extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.bool,
    location: PropTypes.string,
    register: PropTypes.func
  }

  render() {
    const registerFields = [
      {
        desc: 'name',
        label: 'Full Name',
        placeholder: 'e.g Paul Ahmed',
        varClass: 'input',
        type: 'text',
        options: []
      },
      {
        desc: 'email',
        label: 'Email Address',
        placeholder: 'example@gmail.com',
        varClass: 'input',
        type: 'email',
        options: []
      },
      {
        desc: 'password',
        label: 'Password',
        varClass: 'input',
        type: 'password',
        options: []
      },
      {
        desc: 'confirmpassword',
        label: 'Confirm Password',
        varClass: 'input',
        type: 'password',
        options: []
      }
    ];
    const registerButtons = [{ value: 'register', className: 'btn-primary' }];

    if (this.props.isSignedIn === true) {
      return (
        <Redirect
          to={{
            pathname: '/role',
            state: { from: this.props.location }
          }}
        />
      );
    }

    return (
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100">
          <div className="col col-md-3 col-lg-6 d-none d-md-block position-fixed h-100 login-left" />
          <div className="col col-md-9 col-lg-6 offset-lg-6 offset-md-3">
            <h3 className="mb-2 text-center pt-5">Register on Benshada Place</h3>
            <p className="lead mb-4 text-center">
              Or return{' '}
              <Link className="text-primary" to="/">
                home
              </Link>
            </p>

            <BenshadaForm
              form={'form-register'}
              onSubmitForm={this.props.register}
              className="form px-4 px-md-5 mx-md-3"
              fields={registerFields}
              buttons={registerButtons}
              initialValues={{}}
            />

            {/* <BenshadaFormOld
              form={`form-${this.props.location.pathname.substr(1)}`}
              onSubmitForm={this.props.register}
              className="form px-4 px-md-5 mx-md-3"
              btn="Register"
              type="register"
            /> */}

            <p className="text-muted text-left px-4 px-md-5 mx-md-3 my-3">
              Have an account?
              <br />
              <Link to="/login">Login</Link>
            </p>
            {/* <p className="text-center my-3">
            <Link to="#" className="text-primary">Forgot password or email?</Link>
          </p> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps, { register })(Register);
