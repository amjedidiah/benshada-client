import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark px-3 pt-3 container-fluid">
      <div className="row p-4 text-light">
        <div className="col-12 col-lg-4 mb-5 p-3 mb-lg-0">
          <h5>About Us</h5>
          <p>
            At Benshada Place, we enable African fashion houses and businesses
            extend their market reach across borders; enabling buyers to source
            their products with ease, convenience and speed.
          </p>
        </div>
        <div className="col-12 col-lg-4 mb-5 p-3 mb-lg-0">
          <h5>Contact Us</h5>
          <p className="mb-5 mb-md-3">
            <a className="text-primary" href="mailto:benshada@gmail.com">
              <i className="fas fa-envelope mr-3" />
              benshada@gmail.com
            </a>
          </p>

          <h5>Subscribe to Our Newsletter</h5>
          <form className="form-inline flex-grow-1">
            <div className="input-group border border-primary rounded">
              <input
                className="form-control border-0 rounded-0"
                type="email"
                placeholder="example@gmail.com"
                aria-label="email"
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-primary text-white border-0 rounded-0"
                  id="basic-addon2"
                >
                  OK
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-lg-4 mb-5 p-3 mb-lg-0">
          <h5>Follow Us</h5>
          <p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="pr-3"
              href="https://wa.me/2349072340517/"
            >
              <i className="fab fa-whatsapp text-primary" />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="pr-3"
              href="https://www.facebook.com/Benshadaplace/"
            >
              <i className="fab fa-facebook text-primary" />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="pr-3"
              href="https://www.twitter.com/Benshadaplace"
            >
              <i className="fab fa-twitter text-primary" />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="pr-3"
              href="https://www.instagram.com/Benshadaplace/"
            >
              <i className="fab fa-instagram text-primary" />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="pr-3"
              href="https://www.pinterest.com/Benshada/"
            >
              <i className="fab fa-pinterest text-primary" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
