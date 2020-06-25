// Module imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Asset imports
import ifSeller from '../../assets/js/ifSeller.js';

class AuthHeader extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    cart: PropTypes.array
  }

  // Link to cart
  renderCartLink() {
    const cart = this.props.cart || [];
    return (
      <li className="nav-item position-relative border border-left-0 border-top-0 border-bottom-0 border-right-light px-md-3">
        <Link className="nav-link" to="/cart">
          {cart.length < 1 ? '' : <small id="cartCount">{cart.length}</small>}
          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
          {/* Cart */}
        </Link>
      </li>
    );
  }

  render() {
    const { user } = this.props;
    const name = user && user.name;
    const firstName = name.includes(' ') ? name.split(' ')[0] : name;

    return (
      <ul className="navbar-nav ml-auto " id="loggedIn">
        {ifSeller(user && user.type) ? '' : this.renderCartLink()}
        <li className="nav-item dropdown pl-md-3">
          <Link
            className="nav-link dropdown-toggle"
            to=""
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FontAwesomeIcon className="mr-2" icon={faUser} />
            {firstName}
          </Link>
          <div className="dropdown-menu border-0 shadow-md-sm" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={'/cart'}>
              Cart
            </Link>
            <Link className="dropdown-item" to={'/user'}>
              Account
            </Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/logout">
              Logout
            </Link>
          </div>
        </li>
      </ul>
    );
  }
}

export default AuthHeader;
