import React from "react";
import { Router, Route } from "react-router-dom";

import { connect } from "react-redux";

import { googleOAuth, googleSignIn, googleSignOut } from "../actions";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Account from "./Account/Account";
import "../master.css";

import history from "../history";

class App extends React.Component {
  componentDidMount = () => {
    // this.props.googleOAuth();
  };

  render() {
    return (
      <div className=" ">
        <Router history={history}>
          <Route path="/" component={Home} exact />
          {/* <Route path="/login" component={Login} exact />
          <Route path="/user/account" component={Account} exact /> */}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.oAuth };
};

export default connect(
  mapStateToProps,
  { googleOAuth, googleSignIn, googleSignOut }
)(App);
