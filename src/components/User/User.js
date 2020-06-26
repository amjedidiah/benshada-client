import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthRedirect from '../Auth/AuthRedirect.js';
import navUA from '../../assets/js/navUA.js';
import navUB from '../../assets/js/navUB.js';
import navUC from '../../assets/js/navUC.js';
import UserNav from './UserNav.js';
import '../../assets/css/user.css';
import UserBody from './UserBody.js';

class User extends Component {
  static propTypes = {
    email: PropTypes.string,
    user: PropTypes.object,
    userOne: PropTypes.func
  };

  render = () => {
    const { user } = this.props;
    const list = { UA: navUA, UB: navUB, UC: navUC }[user && user.type] || [];

    return (
      <>
        <AuthRedirect type="user" />{' '}
        <div className="container-fluid h-100">
          <div className="row h-100">
            <UserNav list={list} user={user} className="bg-primary-benshada user-side-main" />
            <UserBody list={list} user={user} store={user && user.shops && user.shops[0]} />
          </div>
        </div>
      </>
    );
  };
}

export default User;
