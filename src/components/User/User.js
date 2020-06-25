import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthRedirect from '../Auth/AuthRedirect.js';
import ifSeller from '../../assets/js/ifSeller.js';
import buyerNav from '../../assets/js/buyerNav.js';
import sellerNav from '../../assets/js/sellerNav.js';
import UserNav from './UserNav.js';
import '../../assets/css/user.css';
import UserBody from './UserBody.js';

class User extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render = () => {
    const { user } = this.props;
    const list = ifSeller(user && user.type) ? sellerNav : buyerNav;

    return (
      <>
        <AuthRedirect type="user" />{' '}
        <div className="container-fluid h-100">
          <div className="row h-100">
            <UserNav list={list} user={user} className="bg-light-benshada user-side-main" />
            <UserBody list={list} user={user} />
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = ({ user }) => ({ user: user.selected });

export default connect(mapStateToProps)(User);
