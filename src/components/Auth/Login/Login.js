import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Auth from '../Auth.js';
import LoginForm from './LoginForm.js';
import { authLogin } from '../../../redux/actions/auth.js';

class Login extends Component {
  INIT = {
    buttonValue: 'Login'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    authLogin: PropTypes.func
  };

  submit = (loginData) => {
    this.setState({
      buttonValue: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    this.props.authLogin(loginData).catch((err) => {
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

  render = () => (
    <Auth>
      <LoginForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />

      {/* <p className="text-muted text-left my-3">
        <Link to="#">
          Forgot password or email?
        </Link>
      </p> */}
    </Auth>
  );
}

export default connect(null, { authLogin })(Login);
