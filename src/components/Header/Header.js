import React from "react";
import { Link } from "react-router-dom";
// Connect to redux for Authentication, to see if user is logged in
import { connect } from "react-redux";

import searchAnimate from "./searchAnimate";
import "./header.css";

class Header extends React.Component {
  authRender() {
    let { isSignedIn, user } = this.props;

    if (isSignedIn === false) {
      return (
        <form className="form-inline px-md-3">
          <Link to="/login" className="flex-grow-1">
            <button className="btn btn-primary rounded-0 w-100" type="button">
              Login
            </button>
          </Link>
        </form>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto " id="loggedIn">
          <li className="nav-item border border-left-0 border-top-0 border-bottom-0 border-right-light px-md-3">
            <Link className="nav-link" to="/cart">
              <i className="fas fa-shopping-cart mr-2" />
              Cart
            </Link>
          </li>
          <li className="nav-item dropdown px-md-3">
            <Link
              className="nav-link dropdown-toggle"
              to=""
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="far fa-user mr-2" />
              {user && user.name.split(" ")[0]}
            </Link>
            <div
              className="dropdown-menu border-0 shadow-md-sm"
              aria-labelledby="navbarDropdown"
            >
              <Link className="dropdown-item" to={`/user`}>
                Account
              </Link>
              <Link className="dropdown-item" to="/orders">
                My Orders
              </Link>
              <Link className="dropdown-item" to="/saved">
                My Saved Items
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
        className="navbar navbar-expand-md shadow-sm mb-1 bg-white"
        id="header"
      >
        <div className="container-fluid">
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
            <i className="fas fa-stream" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline flex-grow-1 mb-2 mb-md-0">
              <div className="input-group flex-grow-1">
                <input
                  className="form-control border-top-0 border-right-0 border-left-0 rounded-0 search-bar invisible"
                  data-toggle="dropdown"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text bg-white border-0"
                    id="basic-addon2"
                  >
                    <i
                      className="fas fa-search text-primary pointer"
                      id="showSearchBar"
                    />
                  </span>
                </div>
              </div>
            </form>
            {this.authRender()}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, user: state.auth.user };
};

export default connect(mapStateToProps)(Header);
