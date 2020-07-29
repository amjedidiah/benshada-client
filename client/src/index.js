// Module imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import jQuery, BootStrap && popperJS
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'popper.js/dist/popper.min';

// serviceWorker
import * as serviceWorker from './serviceWorker.js';

// Import redux store
import store from './redux/store.js';

// App component
import App from './app.js';

// Should I want to reset local && session storage variables
// localStorage.clear();
// sessionStorage.clear();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// Unregister service worker if on localhost cos it messes things up
if (!window.location.host.includes('localhost')) {
  serviceWorker.register();
}
