import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faStoreAlt } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

export default class Src extends Component {
  static propTypes = {
    image: PropTypes.array,
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    xtraClass: PropTypes.string
  }

  render() {
    return (this.props.image && this.props.image.length === 0) || this.props.image === undefined ? (
      <div className={`text-center ${this.props.xtraClass}`}>
        <FontAwesomeIcon icon={this.props.type === 'store' ? faStoreAlt : faBox} className={`fa-${this.props.size}x text-light`} />
      </div>
    ) : (
      <img className="card-img img-responsive" src={this.props.image[0]} alt={this.props.name} />
    );
  }
}
