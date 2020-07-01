import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import types from '../../assets/data/types.json';
import getDeliveryCompany from '../../assets/js/getDeliveryCompany.js';

class AuthRedirect extends Component {
  static propTypes = {
    auth: PropTypes.object,
    deliveryCompany: PropTypes.object,
    type: PropTypes.string,
    user: PropTypes.object
  };

  render = () => {
    const {
      auth, type, user, deliveryCompany
    } = this.props;

    if (type === 'logout') {
      return auth.isSignedIn ? '' : <Redirect to="/" />;
    }

    if (type === 'user') {
      if (!auth.isSignedIn) return <Redirect to="/login" />;

      if (user && user.createdAt === user && user.updatedAt && user && user.type !== 'UDC') {
        return <Redirect to="/onboarding" />;
      }

      if ((user && user.type === 'UA') || (user && user.type === 'UB')) {
        return ((user && user.shops) || []).filter(
          (shop) => shop !== null && shop !== undefined && shop !== ''
        ).length > 0 ? (
            ''
          ) : (
          <Redirect to="/onboarding" />
          );
      }

      if (user && user.type === 'UC') {
        return ((user && user.categories) || []).filter(
          (cat) => cat !== null && cat !== undefined && cat !== ''
        ).length > 0 ? (
            ''
          ) : (
          <Redirect to="/onboarding" />
          );
      }

      if (user && user.type === 'UDC') {
        return (deliveryCompany
          && deliveryCompany.contactPerson
          && deliveryCompany.contactPerson.email) === user.email ? (
            ''
          ) : (
          <Redirect to="/onboarding" />
          );
      }

      return <Redirect to="/onboarding" />;
    }

    if (type === 'onboarding') {
      if (!auth.isSignedIn) return <Redirect to="/login" />;

      if (
        (user && user.createdAt === user && user.updatedAt)
        || !types.includes(user && user.type)
      ) {
        return false;
      }

      if ((user && user.type === 'UA') || (user && user.type === 'UB')) {
        return ((user && user.shops) || []).filter(
          (shop) => shop !== null && shop !== undefined && shop !== ''
        ).length > 0 ? (
          <Redirect to="/user/profile" />
          ) : (
            ''
          );
      }

      if (user && user.type === 'UC') {
        return ((user && user.categories) || []).filter(
          (cat) => cat !== null && cat !== undefined && cat !== ''
        ).length > 0 ? (
          <Redirect to="/user/profile" />
          ) : (
            ''
          );
      }

      if (user && user.type === 'UDC') {
        return (deliveryCompany
          && deliveryCompany.contactPerson
          && deliveryCompany.contactPerson.email) === user.email ? (
          <Redirect to="/user/profile" />
          ) : (
            ''
          );
      }

      return <Redirect to="/user/profile" />;
    }

    return auth.isSignedIn ? <Redirect to="/user/profile" /> : '';
  };
}

const mapStateToProps = ({ auth, user, deliveryCompany }) => ({
  auth,
  user: user.selected,
  deliveryCompany: getDeliveryCompany(user, deliveryCompany)
});

export default connect(mapStateToProps)(AuthRedirect);
