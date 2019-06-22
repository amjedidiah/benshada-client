import React from "react";
import { Router, Route } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Account from "./Account/Account";
import "../master.css";

import history from "../history";

function App() {
  return (
    <div className="h-100 container-fluid">
      <Router history={history}>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/user/account" component={Account} exact />
      </Router>
    </div>
  );
}

export default App;
