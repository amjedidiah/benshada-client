import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class DashNav extends React.Component {
  renderIcon(icon) {
    return this.props.className.includes('user-side-main') ? (
      <i className={`${icon} mr-3`}></i>
    ) : (
      <div className="img-holder img-holder-user mr-md-3">
        <img
          src={
            'https://s.alicdn.com/@sc01/kf/ULB8TUAmr1vJXKJkSajhq6A7aFXaY/ON-Optimum-Nutrition-Gold-Standard-100-Whey.jpg'
          }
          alt={''}
          className="img-fluid"
        />
      </div>
    );
  }

  renderList = ({ list }, isMain) =>
    list.map((item, index) => {
      let { icon, Title, message } = item,
        active,
        selected;

      if (index === 0) {
        active = 'active';
        selected = 'selected';
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
            {this.renderIcon(icon)}

            {message !== undefined ? (
              <div>
                <span className="font-weight-bold d-none d-md-inline">{Title}</span>
                <br />
                <small className="message text-truncate d-none d-md-block">{message}</small>
              </div>
            ) : (
              <>
                <span className="font-weight-bold">{Title}</span>
                <br />
              </>
            )}
          </a>
        </li>
      );
    });

  renderLogout() {
    return this.props.className.includes('user-side-main') ? (
      <li className="nav-item text-danger">
        <Link className="nav-link text-capitalize text-danger" to="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-danger" />
          Logout
        </Link>
      </li>
    ) : (
      ''
    );
  }

  render() {
    let isMain = this.props.className.includes('user-side-main'),
      divClass = isMain ? 'col-6' : 'col-3 col-sm-2',
      logo = isMain ? 'benshada' : 'ben',
      pLeft = isMain ? 'pl-4' : 'pl-md-4';

    return (
      <>
        <div
          className={`${divClass} col-md-3 col-lg-2 position-fixed h-100 ${this.props.className} px-0 shadow-sm`}
          id="userSide"
        >
          <p className="text-center p-4">
            <Link to="/" className="no-link lead text-primary font-weight-bolder">
              {logo}
            </Link>
          </p>
          <ul className={`nav nav-pills flex-column my-3 ${pLeft}`} id="userNav" role="tablist">
            {this.renderList(this.props, isMain)}
            {this.renderLogout()}
          </ul>
        </div>
      </>
    );
  }
}

export default DashNav;
