// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// Start Component
export default class GenderDisplay extends Component {
  static propTypes = {
    icon: PropTypes.any,
    name: PropTypes.string
  };

  render = () => {
    const { name, icon } = this.props;

    return (
      <Link to={`/products/?gender=${name}`} className="col p-3">
        <FontAwesomeIcon className=" fa-3x text-primary" icon={icon} />
        <p>{name}</p>
      </Link>
    );
  };
}
// End Component
