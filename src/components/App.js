import React from "react";
import { Router, Route } from "react-router-dom";
import "../master.css";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Loading from "./Loading/Loading";

import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div className="h-100">
        <Router history={history}>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
        </Router>

        {/* <Loading type="bars" /> */}
      </div>
    );
  }
}
export default App;
