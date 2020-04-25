import React, { Component } from "react";
import HrFrComp from "../HrFrComp/HrFrComp";

import "./Catalog.css";
import { Redirect } from "react-router-dom";
import All from "../All/All";

export default class Catalog extends Component {
  aearch = decodeURI(this.props.location.search.split("=")[1]);

  render() {
    const { aearch } = this;

    return aearch === "undefined" || aearch === "" ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <HrFrComp>
        <All
          type="product"
          aearch={aearch}
          title="Related Products"
        />
        <All type="store" aearch={aearch} title="Related Stores" />
      </HrFrComp>
    );
  }
}
