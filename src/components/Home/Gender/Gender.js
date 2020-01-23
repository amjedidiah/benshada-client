import React, { Component } from "react";

import male from "./img/male.png";
import female from "./img/female.png";
import unisex from "./img/unisex.png";
import "./Gender.css";

export default class Gender extends Component {
  render() {
    return (
      <div className="bg-white">
        {/* <div className="container">
          <div className="card-columns gender text-center text-lg-left">
            <div className="card bg-white border-0">
              <div className="card-body pb-0 d-lg-flex">
                <div className="flex-grow-1">
                  <hgroup className="text-uppercase text-secondary">
                    <h3 className="font-weight-bolder d-none d-lg-block">
                      male
                    </h3>
                    <p className="lead d-none d-lg-block">Collection</p>

                    <p className="font-weight-bold text-uppercase text-secondary d-lg-none">
                      Male
                    </p>
                  </hgroup>
                </div>
                <div className="flex-grow-1 d-block d-lg-flex">
                  <i className="fas fa-mars fa-3x text-primary d-lg-none"></i>
                  <img
                    src={male}
                    alt=""
                    className="img-fluid d-none d-lg-block"
                  />
                </div>
              </div>
            </div>

            <div className="card bg-white mb-0 border-0">
              <div className="card-body pb-0 d-lg-flex">
                <div className="flex-grow-1 align-self-end">
                  <hgroup className="text-uppercase text-secondary">
                    <h3 className="font-weight-bolder d-none d-lg-block">
                      female
                    </h3>
                    <p className="lead d-none d-lg-block">Collection</p>

                    <p className="font-weight-bold text-uppercase text-secondary d-lg-none">
                      Female
                    </p>
                  </hgroup>
                </div>
                <div className="flex-grow-1 d-block d-lg-flex">
                  <i className="fas fa-venus fa-3x text-primary d-lg-none"></i>
                  <img
                    src={female}
                    alt=""
                    className="img-fluid d-none d-lg-block"
                  />
                </div>
              </div>
            </div>

            <div className="card bg-white mb-0 border-0">
              <div className="card-body pb-0 d-lg-flex">
                <div className="flex-grow-1 d-block d-lg-flex">
                  <i className="fas fa-venus-mars fa-3x text-primary d-lg-none"></i>
                  <img
                    src={unisex}
                    alt=""
                    className="img-fluid d-none d-lg-block"
                  />
                </div>
                <div className="flex-grow-1 align-self-start">
                  <hgroup className="text-uppercase text-secondary">
                    <h3 className="font-weight-bolder d-none d-lg-block">
                      unisex
                    </h3>
                    <p className="lead d-none d-lg-block">Collection</p>

                    <p className="font-weight-bold text-uppercase text-secondary d-lg-none">
                      unisex
                    </p>
                  </hgroup>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
