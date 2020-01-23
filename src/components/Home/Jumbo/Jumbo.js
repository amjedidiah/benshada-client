import React, { Component } from "react";
import { Link } from "react-router-dom";

import banner1 from "./img/benshadawebbanners01.jpg";
import banner2 from "./img/benshadawebbanners02.jpg";
import banner3 from "./img/benshadawebbanners03.jpg";
import banner4 from "./img/benshadawebbanners04.jpg";

export default class Jumbo extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid px-0 pb-0 pt-5 mx-0 mb-0 mt-2 bg-white bg-md-light">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="d-none col-lg-2 d-lg-flex flex-column bg-light">
              <div className="row text-center align-items-center flex-fill">
                <div className="col">
                  <Link to="/products/category/bags">
                    <i className="fas fa-shopping-bag fa-3x text-primary"></i>
                    <p className="font-weight-bold text-uppercase text-secondary">
                      Bags
                    </p>
                  </Link>
                </div>
              </div>
              <div className="row text-center align-items-center flex-fill">
                <div className="col">
                  <Link to="/products/category/shoes">
                    <i className="fas fa-shoe-prints fa-3x text-primary"></i>
                    <p className="font-weight-bold text-uppercase text-secondary">
                      Shoes
                    </p>
                  </Link>
                </div>
              </div>
              <div className="row text-center align-items-center flex-fill">
                <div className="col">
                  <Link to="/products/category/clothes">
                    <i className="fas fa-tshirt fa-3x text-primary"></i>
                    <p className="font-weight-bold text-uppercase text-secondary">
                      Clothes
                    </p>
                  </Link>
                </div>
              </div>
              <div className="row text-center align-items-center flex-fill">
                <div className="col">
                  <Link to="/products/category/accessories">
                    <i className="fab fa-redhat fa-3x text-primary"></i>
                    <p className="font-weight-bold text-uppercase text-secondary">
                      Accessories
                    </p>
                  </Link>
                </div>
              </div>
            </div> */}
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
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <Link to="/products">
                        <img alt="" src={banner1} className="img-fluid w-100" />
                      </Link>
                    </div>
                    <div className="carousel-item">
                      <Link to="/products">
                        <img alt="" src={banner2} className="img-fluid w-100" />
                      </Link>
                    </div>
                    <div className="carousel-item">
                      <Link to="/products">
                        <img alt="" src={banner3} className="img-fluid w-100" />
                      </Link>
                    </div>
                    <div className="carousel-item">
                      <Link to="/products">
                        <img alt="" src={banner4} className="img-fluid w-100" />
                      </Link>
                    </div>
                  </div>
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
