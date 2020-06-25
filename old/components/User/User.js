import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import './assets/products.css';
import './assets/user.css';
import PropTypes from 'prop-types';
import menu from './assets/menu.js';

import DashNav from './DashNav.js';
import DashBody from './DashBody.js';
import userABlist from './data/userABNav.json';
import userClist from './data/userCNav.json';
import { ifSeller } from '../../actions/auth.js';

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    store: PropTypes.object,
    orders: PropTypes.array,
    isSignedIn: PropTypes.bool,
    location: PropTypes.object
  }

  componentDidMount = () => menu();

  renderPage() {
    const { user, store, orders } = this.props;
    const list = !ifSeller(user && user.type) ? userClist : userABlist;

    return (
      <>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <DashNav list={list} user={user} className="bg-light user-side-main" />
            <DashBody list={list} user={user} store={store} orders={orders} />
          </div>
        </div>
      </>
    );
  }
  
  renderHelp() {
    const { isSignedIn, user, location } = this.props;

    return isSignedIn === false ? (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    ) : (
      {
        user: (
          <Redirect
            to={{
              pathname: '/role',
              state: { from: location }
            }}
          />
        )
      }[user && user.type] || this.renderPage()
    );
  }

  render() {
    return <>{this.renderHelp()}</>;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth && state.auth.user,
  store: state.store,
  orders: state.order,
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, {})(User);
