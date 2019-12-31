import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { roleSelect, ifSeller } from "../../../actions/auth";
import { actionLoad, actionNotify } from "../../../actions/load";

import "../Login/login.css";

class Role extends React.Component {
  roleSelect() {
    [...document.querySelectorAll(".role-benshada")].forEach(div => {
      div.addEventListener("click", e => {
        [...document.querySelectorAll(".role-benshada")].forEach(i => {
          i.classList.remove("text-white");
          i.classList.remove("bg-primary");
          i.classList.add("bg-white");
          i.classList.add("text-primary");
        });

        div.classList.remove("bg-white");
        div.classList.remove("text-primary");
        div.classList.add("bg-primary");
        div.classList.add("text-white");

        this.props.roleSelect(div.getAttribute("id"));
      });
    });
  }

  componentDidMount() {
    this.roleSelect();
  }

  render() {
    let { isSignedIn, role, location } = this.props;

    if (isSignedIn === false) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      );
    }

    if (ifSeller(role) || role === "c") {
      return (
        <Redirect
          to={{
            pathname: "/user",
            state: { from: location }
          }}
        />
      );
    }
    return (
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100">
          <div className="col col-md-3 col-lg-6 d-none d-md-block position-fixed h-100 login-left" />
          <div className="col col-md-9 col-lg-6 offset-lg-6 offset-md-3">
            <h3 className="mb-2 text-center pt-5">
              Choose your role on Benshada Place
            </h3>
            <p className="lead mb-4 text-center">
              Or{" "}
              <Link className="text-primary" to="./logout">
                logout
              </Link>
            </p>
            <div className="row justify-content-around px-4 px-md-5 mx-md-3">
              <div
                className="col-11 col-md-5 mb-5 text-center rounded shadow-sm text-primary p-4 role-benshada pointer"
                id="a"
              >
                <h4>Tier A</h4>
                <p>
                  <em>Manufacturers, Artisans</em>
                </p>
              </div>
              <div
                className="col-11 col-md-5 mb-5 text-center rounded shadow-sm text-primary p-4 role-benshada pointer"
                id="b"
              >
                <h4>Tier B</h4>
                <p>
                  <em>Retailers, Fashion houses or Small businesses</em>
                </p>
              </div>
              <div
                className="col-11 col-md-5 mb-5 text-center rounded shadow-sm text-primary p-4 role-benshada pointer"
                id="c"
              >
                <h4>Tier C</h4>
                <p>
                  <em>Exclusive Buyer</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    role: state.auth.user && state.auth.user.type
  };
};

export default connect(mapStateToProps, {
  roleSelect,
  actionLoad,
  actionNotify
})(Role);
