import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { faPlus, faStream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// import { productUpload } from '../../../actions/user.js';
import Analytics from './Analytics.js';
import Bank from './Bank.js';
import Cart from './Cart.js';
import Notifications from './Notifications.js';
import Orders from './Orders.js';
import Products from './Products.js';
import Profile from './Profile/Profile.js';
import Saved from './Saved.js';
import Store from './Store/Store.js';
import Tickets from './Tickets.js';
import ifSeller from '../../assets/js/ifSeller.js';
import Image from '../Image/Image.js';

const Components = {
  Analytics,
  Bank,
  Cart,
  Notifications,
  Orders,
  Products,
  Profile,
  Saved,
  Store,
  Tickets
};

class UserBody extends Component {
  static propTypes = {
    user: PropTypes.object,
    store: PropTypes.object,
    list: PropTypes.array
  };

  productUploadRenderer = (user) => {
    const type = user && user.type;

    return ifSeller(type) ? (
      ''
    ) : (
      <>
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-weight-light" id="productModalLabel">
                  Upload Product
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{/* new product */}</div>
            </div>
          </div>
        </div>
        <div
          className="btn btn-primary rounded-circle shadow-sm"
          id="addProductButton"
          data-toggle="modal"
          data-target="#productModal"
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </>
    );
  };

  renderBodyComponents = (list) => list.map((listItem, i) => {
    const { Title } = listItem;
    const TagName = Components[Title];

    return (
        <div
          className={`h-100 p-0 tab-pane fade p-5 mt-5 ${i === 0 ? 'show active' : ''}`}
          id={`pills-${Title}`}
          role="tabpanel"
          aria-labelledby={`pills-${Title}-tab`}
          key={`user-section-${Title}`}
        >


            <TagName user={this.props.user} store={this.props.store} />
        </div>
    );
  })

  renderHeader = ({ image }, firstName) => (
    <div className="p-3 position-fixed bg-white shadow-sm d-flex d-md-block" id="dashboardHeader">
      <button className="btn btn-white float-left border-0 d-md-none" id="dashboardMenuToggle">
        <span>
          <FontAwesomeIcon icon={faStream} />
        </span>
      </button>
      <div className="flex-grow-1 d-md-none pt-2 text-center">
        <Link className="no-link lead font-weight-bolder" to="/">
          benshada
        </Link>
      </div>
      <div className="user float-right">
        <div className="img-holder img-holder-user float-left">
          <Image type="user" image={image} />
        </div>
        <p className="pt-5 ml-2 d-none d-md-inline position-relative" style={{ top: '10px' }}>
          Hello, {firstName}
        </p>
      </div>
      <div className="clear"></div>
    </div>
  );

  render() {
    const { user, list } = this.props;
    const name = (user && user.name) || '';
    const firstName = name.includes(' ') ? name.split(' ')[0] : name;

    return (
      <>
        <div
          className="col-12 p-0 col-md-9 offset-md-3 col-lg-10 offset-lg-2 bg-light-benshada position-relative tab-content"
          id="pills-tabContent"
        >
          {this.renderHeader(user, firstName)}
          {this.renderBodyComponents(list)}
        </div>
        {this.productUploadRenderer(user)}
      </>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(UserBody);
