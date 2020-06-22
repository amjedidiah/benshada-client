import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends Component {
  static propTypes = { auth: PropTypes.object, type: PropTypes.string, user: PropTypes.object };

  render = () => {
    const { auth, type, user } = this.props;

    if (type === 'logout') {
      return auth.isSignedIn ? '' : <Redirect to="/" />;
    }

    if (type === 'user') {
      if (!auth.isSignedIn) return <Redirect to="/login" />;

      if ((user && user.createdAt === user && user.updatedAt) || (user && user.userType === 'user')) { return <Redirect to="/onboarding" />; }
    }

    if (type === 'onboarding') {
      if (!auth.isSignedIn) return <Redirect to="/login" />;

      if ((user && user.createdAt === user && user.updatedAt) || (user && user.userType === 'user')) { return false; }
    }

    return auth.isSignedIn ? <Redirect to="/user" /> : '';
  };
}

const mapStateToProps = ({ auth, user }) => ({ auth, user: user.selected });

export default connect(mapStateToProps)(AuthRedirect);
