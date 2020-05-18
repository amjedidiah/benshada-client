import React from 'react';
import ReactDOM from 'react-dom';

// Import Necessary JS
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'popper.js/dist/popper.min';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxMulti from 'redux-multi';
import { batchedSubscribe } from 'redux-batched-subscribe';
import reduxThunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';
import { App } from './components/App.js';
import * as serviceWorker from './serviceWorker.js';
import reducers from './reducers/index.js';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(save(['auth, store, order, transaction, cart']), reduxThunk, reduxMulti)
)(createStore);

const createStoreWithBatching = batchedSubscribe((fn) => fn())(createStoreWithMiddleware);

const store = createStoreWithBatching(reducers, load());

// localStorage.clear();
// sessionStorage.clear();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('#root')
);

if (window.location.host.includes('localhost')) {
  serviceWorker.unregister();
} else {
  serviceWorker.register();
}
