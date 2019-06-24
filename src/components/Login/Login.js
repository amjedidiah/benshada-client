import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { googleOAuth } from "../../actions";

import GoogleAuth from "../GoogleAuth";

class Login extends React.Component {
  componentDidMount() {
    this.props.googleOAuth();
  }

  render() {
    return (
      <div className="h-100 row align-items-center text-center">
        <div
          className="col col-md-3 col-lg-6 d-none d-md-block h-100"
          style={{
            backgroundImage: `url(img/login.jpg)`,
            backgroundSize: "cover"
          }}
        />
        <div className="col col-md-9 col-lg-6">
          <form className="form px-4 px-md-5 mx-md-3" action="">
            <h3 className="mb-2">Log into Benshada Place</h3>
            <p className="lead mb-4">
              Or{" "}
              <Link to="/" className="text-primary">
                return home
              </Link>
            </p>
            <div className="input-group my-3">
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white border-top-0 border-right-0 border-left-0"
                  id="basic-addon2"
                >
                  <i className="fas fa-envelope text-primary" />
                </span>
              </div>
              <input
                className="form-control border-top-0 border-right-0 border-left-0"
                type="text"
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div className="input-group my-3">
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white border-top-0 border-right-0 border-left-0"
                  style={{ paddingLeft: "12.75px", paddingRight: "12.75px" }}
                  id="basic-addon2"
                >
                  <i className="fas fa-lock text-primary" />
                </span>
              </div>
              <input
                className="form-control border-top-0 border-right-0 border-left-0"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <button
              className="mt-3 w-100 btn btn-primary"
              type="button"
              name="button"
            >
              Login
            </button>
            <GoogleAuth />
          </form>

          <p className="my-3">Forgot password or email?</p>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { googleOAuth }
)(Login);
