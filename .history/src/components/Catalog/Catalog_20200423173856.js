import React, { Component } from "react";
import HrFrComp from "../HrFrComp/HrFrComp";

import "./Catalog.css";
import { Redirect } from "react-router-dom";
import All from "../All/All";

export default class Catalog extends Component {
  search = decodeURI(this.props.location.search.split("=")[1]);

  render() {
    const { search } = this;

    return search === "undefined" || search === "" ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <HrFrComp>
        <All
          type="product"
          search={search}
          title="Related Products"
        />
        <All type="store" search={search} title="Related Stores" />
      </HrFrComp>
    );
  }
}
