import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

export default class HrFrComp extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.array])
  }

  render() {
    return (
      <div className="bg-light">
        <Header />
        <div className="py-5" style={{ minHeight: '69vh' }}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
