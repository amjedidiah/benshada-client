import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductsBanner extends Component {
  render() {
    const { headers } = this.props;
    return (
      <nav aria-label="breadcrumb" className="bg-warning container-fluid pt-2">
        <ol className="breadcrumb bg-warning py-3 container">
          <li className="breadcrumb-item">
            <Link to="/"> Home </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products/"> All Products </Link>
          </li>
          {headers === undefined
            ? ''
            : headers.map(({ name, value }, i) => (
                <li key={`ProductBanner${i}`} className="text-capitalize breadcrumb-item">
                  <Link to={`/products/${name === '' ? '' : `?${name}`}${name === '' ? '' : `=${value}`}`}>
                    {value}
                  </Link>
                </li>
              ))}
        </ol>
      </nav>
    );
  }
}
