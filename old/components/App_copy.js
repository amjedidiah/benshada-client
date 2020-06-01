import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from 'react-loading-screen';
import Home from './Home/Home.js';
import Login from './Auth/Login/Login.js';
import Register from './Auth/Register/Register.js';
import Role from './Auth/Role/Role.js';
import Logout from './Auth/Logout/Logout.js';
import User from './User/User.js';
import FormToast from './FormToast/FormToast.js';

import history from '../history.js';
import Cart from './Cart/Cart.js';
import Catalog from './Catalog/Catalog.js';
import Products from './Products/Products.js';
import Stores from './Stores/Stores.js';
import CheckOut from './CheckOut/CheckOut.js';

class App extends Component {
  static propTypes = { loader: PropTypes.object }

  render() {
    const {
      loading, bgColor, spinnerColor, show, message
    } = this.props.loader;

    return (
      <div className="h-100">
        <Router history={history}>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/role" component={Role} exact />
          <Route path="/user" component={User} />
          <Route path="/logout" component={Logout} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/catalog" component={Catalog} />
          <Route path="/products" component={Products} />
          <Route path="/stores" component={Stores} />
          <Route path="/checkout" component={CheckOut} />
        </Router>
        <LoadingScreen loading={loading} bgColor={bgColor} spinnerColor={spinnerColor}>
          {''}
        </LoadingScreen>

        <FormToast message={message} show={show} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ loader: state.load });

export default connect(mapStateToProps)(App);
