// Module Imports
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Component Imports
import Home from './components/Home/Home.js';

// Asset imports
import './assets/css/app.css';

// Start Vomponent
const App = () => (
      <div id="app" className="h-100">
        <Router>
          <Route path="/" component={Home} exact />
        </Router>
      </div>
);
// End Component


// Export component as React-functional-Component
export default App;
