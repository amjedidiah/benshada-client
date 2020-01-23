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
import { ifSeller } from "../../actions/auth";

class User extends Component {
  componentDidMount = () => menu();

  renderPage() {
    const { user, store, orders } = this.props,
      list = !ifSeller(user && user.type) ? userClist : userABlist;

    return (
      <>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <DashNav
              list={list}
              user={user}
              className="bg-light user-side-main"
            />
            <DashBody list={list} user={user} store={store} orders={orders} />
          </div>
        </div>
      </>
    );
  }

  renderHelp() {
    let { isSignedIn, user, location } = this.props;

    return isSignedIn === false ? (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    ) : (
      {
        user: (
          <Redirect
            to={{
              pathname: "/role",
              state: { from: location }
            }}
          />
        )
      }[user && user.type] || this.renderPage()
    );
  }

  render() {
    return <>{this.renderHelp()}</>;
  }
}

const mapStateToProps = state => ({
  user: state.auth && state.auth.user,
  store: state.store,
  orders: state.order,
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, {})(User);
