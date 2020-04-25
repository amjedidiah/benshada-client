import React from "react";
import ReactDOM from "react-dom";

import "jquery/dist/jquery.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";
import "./prototypes"

import "./master.css";
import App from "./components/App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxMulti from "redux-multi";
import { batchedSubscribe } from "redux-batched-subscribe";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

import { save, load } from "redux-localstorage-simple";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    save(["auth, store, order, transaction, cart"]),
    reduxThunk,
    reduxMulti
  )
)(createStore);

const createStoreWithBatching = batchedSubscribe(fn => fn())(
  createStoreWithMiddleware
);

const store = createStoreWithBatching(reducers, load());

// localStorage.clear();
// sessionStorage.clear();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
