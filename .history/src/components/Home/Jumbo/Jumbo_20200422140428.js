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
      { name: "Accessories", icon: faRedhat },
    ].map(({ name, icon }, i) => (
      <div
        className="row text-center align-items-center flex-fill py-3"
        key={i}
      >
        <div className="col">
          <Link to="/products/category/shoes">
            <FontAwesomeIcon className="fa-3x text-primary" icon={icon} />
            <p className="font-weight-bold text-uppercase text-secondary">
              {name}
            </p>
          </Link>
        </div>
      </div>
    ));

  renderBannerLinks = () => {
    let i = 0;

    while (i <= 3) {
      return (
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to={`$i`}
          className="active"
        ></li>
      );
    }

    i++;
  };

  renderBanners = () =>
    [banner1, banner2, banner3, banner4].map((banner, i) => (
      <div className={`carousel-item ${i === 0 ? "active" : ""}`}>
        <Link to="/products">
          <img alt="" src={banner} className="img-fluid w-100" />
        </Link>
      </div>
    ));

  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container bg-white">
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
                    {this.renderBannerLinks()}
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

            <div className="col-lg-2 h-100">
              <div class="row align-items-center h-100">
                <div class="col-12 border border-danger">
                  <img class="card-img-top" src="holder.js/100x180/" alt="" />
                  <div class="card-body">
                    <h4 class="card-title">Title</h4>
                    <p class="card-text">Text</p>
                  </div>
                </div>
                <div class="col-12 border border-danger">
                  <img class="card-img-top" src="holder.js/100x180/" alt="" />
                  <div class="card-body">
                    <h4 class="card-title">Title</h4>
                    <p class="card-text">Text</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
