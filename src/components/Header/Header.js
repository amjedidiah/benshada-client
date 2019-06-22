import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import "./header.css";

import logo from "../../img/logo2.png";

class Header extends React.Component {
  renderAside() {
    if (this.props.isSignedIn) {
      return (
        <form className="form-inline">
          {/* <Link to="/register">
      <button
        className="btn btn-outline-primary flex-grow-1 mr-3"
        type="button"
      >
        Register
      </button>
    </Link> */}
          <Link to="/login">
            <button
              className="btn btn-outline-primary flex-grow-1"
              type="button"
            >
              Nice
            </button>
          </Link>
        </form>
      );
    }

    return (
      <form className="form-inline">
        {/* <Link to="/register">
      <button
        className="btn btn-outline-primary flex-grow-1 mr-3"
        type="button"
      >
        Register
      </button>
    </Link> */}
        <Link to="/login">
          <button className="btn btn-outline-primary flex-grow-1" type="button">
            Login
          </button>
        </Link>
      </form>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-white">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logo} className="mb-1" width="50" alt="" />
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
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <form className="form-inline my-3 my-lg-0 mx-lg-3 flex-grow-1">
                <div className="input-group flex-grow-1 border border-primary rounded">
                  <input
                    className="form-control border-0 rounded-0"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-primary border-0 rounded-0"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search text-white" />
                    </span>
                  </div>
                </div>
              </form>

              {this.renderAside()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Header);
