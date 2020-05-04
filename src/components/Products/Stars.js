import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default class Stars extends Component {
  render() {
    const { count } = this.props;
    let response = ["", "", "", "", ""],
      i = 0;

    while (i < count) {
      response[i] = i;

      i++;
    }
    return response.map((i, key) =>
      i === "" ? (
        <FontAwesomeIcon
          className="text-ash mr-1"
          icon={faStar}
          key={`star${key}`}
        />
      ) : (
        <FontAwesomeIcon
          className="text-primary mr-1"
          icon={faStar}
          key={`star${key}`}
        />
      )
    );
  }
}
