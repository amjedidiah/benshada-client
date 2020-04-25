import React from "react";
import { Link } from "react-router-dom";
// Connect to redux for Authentication, to see if user is logged in
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStream } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import searchAnimate from "./searchAnimate";
import "./header.css";
import Search from "./Search";
import { ifSeller } from "../../actions/auth";

class Header extends React.Component {
  renderCartLink() {
    return (
      <li className="nav-item position-relative border border-left-0 border-top-0 border-bottom-0 border-right-light px-md-3">
        <Link className="nav-link" to="/cart">
          {this.props.cart.length < 1 ? (
            ""
          ) : (
            <small id="cartCount">{this.props.cart.length}</small>
          )}
          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
          {/* Cart */}
        </Link>
      </li>
    );
  }

  authRender() {
    let { isSignedIn, user } = this.props;

    if (isSignedIn === false) {
      return (
        <>
          <ul className="navbar-nav ml-auto " id="loggedIn">
            {this.renderCartLink()}
          </ul>
          <form className="form-inline pl-md-3">
            <Link to="/login" className="flex-grow-1">
              <button className="btn btn-primary rounded-0 w-100" type="button">
                Login
              </button>
            </Link>
          </form>
        </>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto " id="loggedIn">
          {ifSeller(user && user.type) ? "" : this.renderCartLink()}
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
              {user && user.name.split(" ")[0]}
            </Link>
            <div
              className="dropdown-menu border-0 shadow-md-sm"
              aria-labelledby="navbarDropdown"
            >
              <Link className="dropdown-item" to={`/user`}>
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

  componentDidMount() {
    searchAnimate();
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-md shadow-sm mb-1 bg-white fixed-top"
        id="header"
      >
        <div className="container px-0">
          <Link to="/" className="navbar-brand">
            <i className="text-primary font-weight-bold">benshada</i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faStream} />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Search />
            {this.authRender()}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, cart }) => {
  return {
    isSignedIn: auth.isSignedIn,
    user: auth.user,
    cart
  };
};

export default connect(mapStateToProps)(Header);
