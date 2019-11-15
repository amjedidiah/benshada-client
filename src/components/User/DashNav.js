import React from "react";
import { Link } from "react-router-dom";

class DashNav extends React.Component {
  renderList = ({list}) =>
    list.map((item, index) => {
      let { icon, Title } = item,
        active,
        selected;

      if (index === 0) {
        active = "active";
        selected = "selected";
      }

      return (
        <li className="nav-item" key={index}>
          <a
            className={`nav-link text-capitalize ${active}`}
            id={`pills-${Title}-tab`}
            data-toggle="pill"
            href={`#pills-${Title}`}
            role="tab"
            aria-controls={`pills-${Title}`}
            aria-selected={selected}
          >
            <i className={`${icon} mr-3`}></i>
            {Title}
          </a>
        </li>
      );
    });

  render() {
    return (
      <>
        <div
          className="col-6 col-md-3 col-lg-2 position-fixed h-100 bg-light px-0 shadow-sm"
          id="userSide"
        >
          <p className="text-center p-4">
            <Link
              to="/"
              className="no-link lead text-primary font-weight-bolder"
            >
              benshada
            </Link>
          </p>
          <ul
            className="nav nav-pills flex-column my-3 pl-4"
            id="userNav"
            role="tablist"
          >
            {this.renderList(this.props)}
          </ul>
        </div>
      </>
    );
  }
}

export default DashNav;
