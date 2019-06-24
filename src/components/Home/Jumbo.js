import React from "react";
import img from "../../img/logo2.png";

const Jumbo = () => {
  return (
    <div className="container shadow-sm bg-white" style={{}}>
      <div className="row border">
        <div className="col-2 d-flex flex-column p-0 text-center">
          <div className="btn-group dropright flex-fill">
            <button
              type="button"
              className="btn btn-primary border-0 rounded-0 font-weight-bolder"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-male mr-2" /> Male
            </button>
            <div className="dropdown-menu">
              <h6 className="dropdown-header">Dropdown header</h6>
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </div>
          </div>
          <div className="btn-group dropright flex-fill">
            <button
              type="button"
              className="btn btn-primary border-0 rounded-0 font-weight-bolder"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-female mr-2" />Female
            </button>
            <div className="dropdown-menu">
              <div className="container">Hello</div>
            </div>
          </div>
        </div>
        <div className="col-10 jumbo-carousel owl-carousel owl-theme">
          <img
            src={img}
            style={{ height: "400px" }}
            className="img-fluid"
            alt="Jumbo image ad"
          />
          <img
            src={img}
            style={{ height: "400px" }}
            className="img-fluid"
            alt="Jumbo image ad"
          />
          <img
            src={img}
            style={{ height: "400px" }}
            className="img-fluid"
            alt="Jumbo image ad"
          />
          <img
            src={img}
            style={{ height: "400px" }}
            className="img-fluid"
            alt="Jumbo image ad"
          />
          <img
            src={img}
            style={{ height: "400px" }}
            className="img-fluid"
            alt="Jumbo image ad"
          />
        </div>
      </div>
    </div>
  );
};

export default Jumbo;
