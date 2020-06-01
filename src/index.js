import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import Necessary JS
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'popper.js/dist/popper.min';

import * as serviceWorker from './serviceWorker.js';

// Import redux store
import store from './redux/store.js';

import App from './app.js';


// localStorage.clear();
// sessionStorage.clear();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

if (!window.location.host.includes('localhost')) {
  serviceWorker.register();
}
