import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

export default class HrFr extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.array])
  }

  render() {
    return (
      <div className="bg-light-benshada">
        <Header />
        <div className="" style={{ minHeight: '69vh' }}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
