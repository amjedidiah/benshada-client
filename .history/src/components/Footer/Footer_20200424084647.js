import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faPinterest,
  faInstagram,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="bg-white pt-1 shadow-sm">
          <div className="container">
            <div className="row my-5">
              <div className="col-12 col-sm-4 mb-4 mb-md-0 pl-0">
                <h5 className="mb-3">Contact Info</h5>
                <a href="tel:+2349072340517">
                  <p className="mb-1">(+234) 907 - 234 - 0517</p>
                </a>
                <a href="mailto:benshada@gmail.com">
                  <p className="mb-1">benshada@gmail.com</p>
                </a>
                <p className="mb-1">
                  68 Sanya Street Aguda Surulere Lagos Nigeria
                </p>
              </div>
              <div className="col-12 col-sm-4 mb-4 mb-md-0">
                <h5 className="mb-3">Quick Links</h5>
                <Link to="/stores">
                  <p className="mb-1">Stores</p>
                </Link>
              </div>
              <div className="col-12 col-sm-4 mb-4 mb-sm-0 px-0">
                <h5 className="mb-3">Information</h5>
                <Link to="/about">
                  <p className="mb-1">About Us</p>
                </Link>
                {/* <Link
                  to={{
                    pathname: "/",
                    hash: "#how-it-works"
                  }}
                >
                  <p className="mb-1">How It Works</p>
                </Link> */}
              </div>
              {/* <div className="col-12 col-sm-6 col-md-3">
                <h5 className="text-primary mb-3">Newsletter Subscribe</h5>
                <form action="" className="form-inline">
                  <div className="input-group flex-grow-1">
                    <input
                      className="form-control border-top-0 border-right-0 border-left-0 rounded-0"
                      type="search"
                      placeholder="Email address"
                      aria-label="Search"
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-primary border-0"
                        id="basic-addon2"
                      >
                        <FontAwesomeIcon
                          className="text-white pointer"
                          icon={faSearch}
                        />
                      </span>
                    </div>
                  </div>
                </form>
              </div> */}
            </div>
          </div>

          <div className="container-fluid border border-left-0 border-right-0 border-bottom-0 border-top-light">
            <div className="row mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <p className="text-center text-md-left">
                      <span className="font-weight-bolder d-none d-md-inline">
                        Connect with us
                      </span>
                      <a href="https://web.facebook.com/Benshadaplace">
                        <FontAwesomeIcon
                          className="mx-2 ml-4"
                          icon={faFacebookF}
                        />
                      </a>
                      <a href="https://www.twitter.com/Benshadaplace">
                        <FontAwesomeIcon className="mx-2" icon={faTwitter} />
                      </a>
                      <a href="https://www.pinterest.com/Benshada">
                        <FontAwesomeIcon className="mx-2" icon={faPinterest} />
                      </a>
                      <a href="https://www.instagram.com/Benshadaplace">
                        <FontAwesomeIcon className="mx-2" icon={faInstagram} />
                      </a>
                      <a href="https://wa.me/2349072340517">
                        <FontAwesomeIcon className="mx-2" icon={faWhatsapp} />
                      </a>
                    </p>
                  </div>
                  <div className="col-12 col-md-6">
                    <p className="text-center text-md-right">
                      Copyright &copy; <Link to="/">Benshada Place</Link>. All
                      rights reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
