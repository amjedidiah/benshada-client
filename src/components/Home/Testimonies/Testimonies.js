import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Testimonies extends Component {
  static propTypes = {
    title: PropTypes.string,
    customers: PropTypes.array
  }

  renderTestimonies = (customers) => customers.map((customer, i) => (
      <div className="card shadow-sm my-3" key={i}>
        <div className="card-header text-left bg-white">
          <img src={customer.src} alt="customer" width="50" height="50" className="rounded-circle mr-2" />
          <span className="text-capitalize">{customer.name}</span>
        </div>
        <div className="card-body">
          <p>{customer.testimony}</p>
        </div>
      </div>
  ));

  render() {
    const { title, customers } = this.props;

    return (
      <div className="container my-5">
        <h4 className="text-center text-capitalize">{title}</h4>
        <div className="card-columns testimonies" id="cardTestimony">
          {this.renderTestimonies(customers)}
        </div>
      </div>
    );
  }
}
