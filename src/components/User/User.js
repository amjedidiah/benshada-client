import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./assets/products.css";
import "./assets/user.css";
import menu from "./assets/menu";

import DashNav from "./DashNav";
import DashBody from "./DashBody";
import userABlist from "./data/userABNav";
import userClist from "./data/userCNav";

import { userUpdateProfile } from "../../actions/user";

class User extends Component {
  componentDidMount = () => menu();

  renderHelp = () =>
    this.props.isSignedIn === false ? (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location }
        }}
      />
    ) : (
      {
        user: (
          <Redirect
            to={{
              pathname: "/role",
              state: { from: this.props.location }
            }}
          />
        )
      }[this.props.user.type]
    );

  render() {
    const { user } = this.props,
      list = user.type === "c" ? userClist : userABlist;

    return (
      <>
        {this.renderHelp()}
        <div className="container-fluid h-100">
          <div className="row h-100">
            <DashNav list={list} user={user} />
            <DashBody list={list} user={user} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user === null ? null : state.auth.user,
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, { userUpdateProfile })(User);
