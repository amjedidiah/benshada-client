import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faStoreAlt } from '@fortawesome/free-solid-svg-icons';

export default class Src extends Component {
  render() {
    const { image, name, size, type, xtraClass } = this.props;

    return (image && image.length === 0) || image === undefined ? (
      <div className={`text-center ${xtraClass}`}>
        <FontAwesomeIcon icon={type === 'store' ? faStoreAlt : faBox} className={`fa-${size}x text-light`} />
      </div>
    ) : (
      <img className="card-img img-responsive" src={image[0]} alt={name} />
    );
  }
}
