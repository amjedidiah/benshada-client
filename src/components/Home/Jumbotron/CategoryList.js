
// Module Imports
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Category imports
import categories from '../../../assets/js/categories.js';

// Component Start
export default class CategoryList extends Component {
  // categories
  renderCats = () => categories.map(({ name, icon }, i) => (
      <div className="row text-center align-items-center flex-fill py-2" key={i}>
        <div className="col">
          <Link to={`/products/?category=${name}`}>
            <FontAwesomeIcon className="fa-3x text-primary" icon={icon} />
            <p className="font-weight-bold text-uppercase text-secondary">{name}</p>
          </Link>
        </div>
      </div>
  ))

  render = () => (
      <div className="d-none col-lg-2 d-lg-flex flex-column">{this.renderCats()}</div>
  );
}
// Component Ends
