import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { googleSignOut } from "../../actions";

import "./header.css";

import logo from "../../img/logo2.png";

class Header extends React.Component {
  renderAside() {
    if (this.props.isSignedIn) {
      return (
        <form className="form-inline">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={this.props.googleSignOut}
          >
            signOut
          </button>
        </form>
      );
    }

    return (
      <form className="form-inline">
        <Link to="/login" className="w-100">
          <button className="btn btn-outline-primary w-100" type="button">
            Login
          </button>
        </Link>
      </form>
    );
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logo} className="mb-1" width="65" alt="" />
            </Link>

            <button
              className="navbar-toggler mt-0 pb-0 btn border border-primary"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                paddingTop: "12px",
                transform: "scale(0.8)"
              }}
            >
              <span className="navbar-toggler-icon w-100 p-0 m-0">MENU</span>
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
      </>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { googleSignOut }
)(Header);
