import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingScreen from 'react-loading-screen';

import Home from './components/home/Home.js';
import FormToast from './components/formToast/formToast.js';

class App extends Component {
  static propTypes = { loader: PropTypes.object }

  render() {
    const { loader } = this.props;
    return (
      <div className="h-100">
        <Router>
          <Route path="/" component={Home} exact />
        </Router>
        <LoadingScreen
        loading={(loader && loader.loading) || false}
        bgColor={(loader && loader.bgColor) || 'white'}
        spinnerColor={loader && loader.spinnerColor}>
          {''}
        </LoadingScreen>

        <FormToast
        message={loader && loader.message}
        show={loader && loader.show} />
      </div>
    );
  }
}

const mapStateToProps = ({ loader }) => ({ loader });

export default connect(mapStateToProps)(App);
