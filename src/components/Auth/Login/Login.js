import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../actions/auth';

import './login.css';

import BenshadaForm from '../../BenshadaForm/BenshadaForm';

class Login extends React.Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } },
      loginFields = [
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
        }
      ],
      loginButtons = [{ value: 'login', className: 'btn-primary' }];

    if (this.props.isSignedIn === true) {
      return (
        <Redirect
          to={{
            from,
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
            <h3 className="mb-2 text-center pt-5">Login to Benshada Place</h3>
            <p className="lead mb-4 text-center">
              Or return{' '}
              <Link className="text-primary" to="/">
                home
              </Link>
            </p>

            {/* <BenshadaForm
              form={`form-${this.props.location.pathname.substr(1)}`}
              onSubmitForm={this.props.login}
              className="form px-4 px-md-5 mx-md-3"
              btn="Login"
              type="login"
            /> */}

            <BenshadaForm
              form={`form-login`}
              onSubmitForm={this.props.login}
              className="form px-4 px-md-5 mx-md-3"
              fields={loginFields}
              buttons={loginButtons}
              initialValues={{}}
            />

            <p className="text-muted text-left px-4 px-md-5 mx-md-3 my-3">
              New to Benshada?
              <br />
              <Link to="/register">Register</Link>
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { login })(Login);
