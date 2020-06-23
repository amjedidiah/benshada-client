// Module Imports
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Component Imports
import Home from './components/Home/Home.js';

// Asset imports
import './assets/css/app.css';
import Login from './components/Auth/Login/Login.js';
import Logout from './components/Auth/Logout/Logout.js';
import Register from './components/Auth/Register/Register.js';
import User from './components/User/User.js';
import Onboarding from './components/Onboarding/Onboarding.js';

// Start Vomponent
const App = () => (
  <>
    <div id="app" className="h-100">
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/onboarding" component={Onboarding} exact />
        <Route path="/user" component={User} exact />
      </Router>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);
// End Component

// Export component as React-functional-Component
export default App;
