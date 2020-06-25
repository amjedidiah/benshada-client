import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Auth from '../Auth.js';
import RegisterForm from './RegisterForm.js';
import { authSignup } from '../../../redux/actions/auth.js';

class Register extends Component {
  INIT = {
    buttonValue: 'Register'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    authSignup: PropTypes.func,
    users: PropTypes.array
  };

  submit = (registerData) => {
    this.setState({
      buttonValue: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    const user = {
      ...registerData,
      name: `${registerData.firstName} ${registerData.familyName}`
    };
    delete user.firstName;
    delete user.familyName;
    delete user.confirmPassword;

    return this.props.users.filter(({ email }) => email === registerData.email).length > 0
      ? (this.setState(this.INIT), toast.warn('You have already registered'))
      : this.props
        .authSignup(user)
        .then((response) => toast.success(
          (response && response.data && response.data.message && response.data.message.name)
                || (response && response.statusText)
                || 'Success'
        ))
        .catch((err) => toast.error(
          (err
                && err.response
                && err.response.data
                && err.response.data.message
                && err.response.data.message.name)
                || (err && err.response && err.response.statusText)
                || 'Network error'
        ))
        .finally(() => this.setState(this.INIT));
  };

  render = () => (
    <Auth>
      <RegisterForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />
    </Auth>
  );
}

const mapStateToProps = ({ user }) => ({ users: user.all });

export default connect(mapStateToProps, { authSignup })(Register);
