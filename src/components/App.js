import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./Home/Home";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Role from "./Auth/Role/Role";
import Logout from "./Auth/Logout/Logout";
import User from "./User/User";
import LoadingScreen from "react-loading-screen";

import history from "../history";

class App extends React.Component {
  render() {
    let { loading, bgColor, spinnerColor } = this.props.load;
    return (
      <div className="h-100">
        <Router history={history}>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/role" component={Role} exact />
          <Route path="/user" component={User} />
          <Route path="/logout" component={Logout} exact />
        </Router>
        <LoadingScreen
          loading={loading}
          bgColor={bgColor}
          spinnerColor={spinnerColor}
        >
          {""}
        </LoadingScreen>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { load: state.load };
};
export default connect(mapStateToProps)(App);
