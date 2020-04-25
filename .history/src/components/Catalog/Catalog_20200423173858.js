import React, { Component } from "react";
import HrFrComp from "../HrFrComp/HrFrComp";

import "./Catalog.css";
import { Redirect } from "react-router-dom";
import All from "../All/All";

export default class Catalog extends Component {
  searchString = decodeURI(this.props.location.search.split("=")[1]);

  render() {
    const { searchString } = this;

    return searchString === "undefined" || searchString === "" ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <HrFrComp>
        <All
          type="product"
          searchString={searchString}
          title="Related Products"
        />
        <All type="store" searchString={searchString} title="Related Stores" />
      </HrFrComp>
    );
  }
}
