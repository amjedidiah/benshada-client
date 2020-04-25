import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default class HrFrComp extends Component {
  render() {
    return (
      <div className="bg-light">
        <Header />
        <div style={{ minHeight: "69vh", padding: "5%" }}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
