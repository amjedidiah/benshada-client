import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import UserAB from "../UserAB/UserAB";
import UserC from "../UserC/UserC";

import "./products.css";
import "./user.css";
import user from "./user"


class UserChoice extends React.Component {
  renderHelp() {
    if (this.props.isSignedIn === false) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />
      );
    }

    switch (this.props.user.type) {
      case "user":
        return (
          <Redirect
            to={{
              pathname: "/role",
              state: { from: this.props.location }
            }}
          />
        );
      case "c":
        return <UserC user={this.props.user} />;
      case "b":
        return <UserAB user={this.props.user} />;
      case "a":
        return <UserAB user={this.props.user} />;
      default:
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: this.props.location }
            }}
          />
        );
    }
  }

  componentDidMount() {
    user()
  }

  render() {
    return <div>{this.renderHelp()}</div>;
  }
}

const mapStateToProps = state => {
  let user = state.auth.user === null ? null : state.auth.user
  return { user };
};

export default connect(mapStateToProps)(UserChoice);
