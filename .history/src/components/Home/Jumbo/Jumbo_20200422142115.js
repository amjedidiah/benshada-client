import React, { Component } from "react";
import { Link } from "react-router-dom";

import banner1 from "./img/benshadawebbanners01.jpg";
import banner2 from "./img/benshadawebbanners02.jpg";
import banner3 from "./img/benshadawebbanners03.jpg";
import banner4 from "./img/benshadawebbanners04.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoePrints,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";
import { faRedhat } from "@fortawesome/free-brands-svg-icons";

export default class Jumbo extends Component {
  renderCats = () =>
    [
      { name: "bags", icon: faShoppingBag },
      { name: "shoes", icon: faShoePrints },
      { name: "clothes", icon: faTshirt },
      { name: "accessories", icon: faRedhat },
    ].map(({ name, icon }, i) => (
      <div
        className="row text-center align-items-center flex-fill py-2"
        key={i}
      >
        <div className="col">
          <Link to={`/products/category/${name}`}>
            <FontAwesomeIcon className="fa-3x text-primary" icon={icon} />
            <p className="font-weight-bold text-uppercase text-secondary">
              {name}
            </p>
          </Link>
        </div>
      </div>
    ));

  renderBanners = () =>
    [{src: banner1, href: "bags" }, {src: banner2, href: "shoes" },{src: banner3, href: "clothes" },{src: banner4, href: "accessories" }].map(({src, href}, i) => (
      <div className={`carousel-item ${i === 0 ? "active" : ""}`}>
        <Link to="/products">
          <img alt="" src={banner} className="img-fluid w-100" />
        </Link>
      </div>
    ));

  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-light py-5">
        <div className="container-fluid bg-white shadow-sm">
          <div className="row">
            <div className="d-none col-lg-2 d-lg-flex flex-column">
              {this.renderCats()}
            </div>

            <div className="col-12 col-lg mb-0">
              <div className="row">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide w-100"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="3"
                    ></li>
                  </ol>
                  <div className="carousel-inner">{this.renderBanners()}</div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
