import React, { Component } from "react";

import "./Gender.css";
import {
  faMars,
  faVenus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default class Gender extends Component {
  render() {
    return (
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
            <FontAwesomeIcon
              className=" fa-3x text-primary"
              icon={faVenusMars}
            />
            <p>Unisex</p>
          </Link>
        </div>
      </div>
    );
  }
}
