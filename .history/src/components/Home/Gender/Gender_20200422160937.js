import React, { Component } from "react";

import male from "./img/male.png";
import female from "./img/female.png";
import unisex from "./img/unisex.png";
import "./Gender.css";
import {
  faMars,
  faVenus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Gender extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center bg-white bg-lg-light">
          <div className="col p-3">
            <FontAwesomeIcon
              className=" fa-3x text-primary d-lg-none"
              icon={faMars}
            />
            <p>Male</p>
          </div>
          <div className="col p-3">
            <FontAwesomeIcon
              className=" fa-3x text-primary d-lg-none"
              icon={faVenus}
            />
            <p>Female</p>
          </div>
          <div className="col p-3">
            <FontAwesomeIcon
              className=" fa-3x text-primary d-lg-none"
              icon={faVenusMars}
            />
            <p>Unisex</p>
          </div>
        </div>
      </div>
    );
  }
}
