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
    const {
      image, name, size, type, xtraClass
    } = this.props;

    return (image && image.length === 0) || image === undefined ? (
      <div className={`text-center ${xtraClass}`}>
        <FontAwesomeIcon icon={type === 'store' ? faStoreAlt : faBox} className={`fa-${size}x text-light`} />
      </div>
    ) : (
      <img className="card-img img-responsive" src={image[0]} alt={name} />
    );
  }
}
