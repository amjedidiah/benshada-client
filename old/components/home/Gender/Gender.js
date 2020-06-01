import React, { Component } from './node_modules/react';

import './Gender.css';
import { faMars, faVenus, faVenusMars } from './node_modules/@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from './node_modules/@fortawesome/react-fontawesome';
import { Link } from './node_modules/react-router-dom';

export default class Gender extends Component {
  render =() => (
      <div className="container">
        <div className="row justify-content-between text-center bg-white bg-lg-light">
          <Link to="/products/?gender=male" className="col p-3">
            <FontAwesomeIcon className=" fa-3x text-primary" icon={faMars} />
            <p>Male</p>
          </Link>

          <Link to="/products/?gender=female" className="col p-3">
            <FontAwesomeIcon className=" fa-3x text-primary" icon={faVenus} />
            <p>Female</p>
          </Link>
          <Link to="/products/?gender=unisex" className="col p-3">
            <FontAwesomeIcon className=" fa-3x text-primary" icon={faVenusMars} />
            <p>Unisex</p>
          </Link>
        </div>
      </div>
  )
}
