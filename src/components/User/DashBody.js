import React, { Component } from "react";
import { connect } from "react-redux";
import BenshadaForm from "../BenshadaForm/BenshadaForm";

import { productUpload } from "../../actions/user";
import {
  Profile,
  Products,
  Orders,
  Analytics,
  // Notifications,
  Messages
} from "./assets/bodyComponents";
import { Link } from "react-router-dom";
import { ifSeller } from "../../actions/auth";

const Components = {
  Profile,
  Products,
  Orders,
  Analytics,
  // Notifications,
  Messages
};

class DashBody extends Component {
  productUploadRenderer(user) {
    let productFields = [
        {
          desc: "name",
          label: "Name",
          placeholder: "Product Name",
          varClass: "input",
          type: "text",
          options: [],
          row: 1,
          icon: 0
        },
        {
          desc: "description",
          label: "Description",
          placeholder: "Product Description",
          varClass: "textarea",
          type: "text",
          options: [],
          row: 2,
          icon: 0
        },
        {
          desc: "price",
          label: "Price",
          varClass: "input",
          type: "number",
          options: [],
          row: 1,
          icon: 1,
          help: "Price is in dollars"
        },
        {
          desc: "discountPercentage",
          label: "Discount",
          varClass: "input",
          type: "number",
          options: [],
          row: 2,
          icon: 0,
          help: "Discount in percentage"
        }
      ],
      productButtons = [{ value: "Upload Product", className: "btn-primary" }],
      type = user && user.type;

    return !ifSeller(type) ? (
      ""
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
                <h5
                  className="modal-title font-weight-light"
                  id="productModalLabel"
                >
                  Upload Product
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <BenshadaForm
                  form={`form-product-add`}
                  onSubmitForm={this.props.productUpload}
                  className="form"
                  fields={productFields}
                  buttons={productButtons}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="btn btn-primary d-fixed rounded-circle shadow-sm "
          id="questionMark"
          data-toggle="modal"
          data-target="#productModal"
        >
          <i className="fas fa-plus"></i>
        </div>
      </>
    );
  }

  renderBodyComponents(list) {
    return list.map((listItem, i) => {
      let { Title } = listItem,
        TagName = Components[Title],
        { user, store, orders } = this.props;
      return (
        <div
          className={`h-100 p-0 tab-pane fade ${i === 0 ? "show active" : ""}`}
          id={`pills-${Title}`}
          role="tabpanel"
          aria-labelledby={`pills-${Title}-tab`}
          key={Title}
        >
          {user !== undefined ? (
            <TagName user={user} store={store} orders={orders} />
          ) : (
            <Messages />
          )}
        </div>
      );
    });
  }

  renderHeader(user, name) {
    return user !== undefined ? (
      <div
        className="p-3 position-fixed bg-white shadow-sm d-flex d-md-block"
        id="dashboardHeader"
      >
        <button
          className="btn btn-white float-left border-0 d-md-none"
          id="dashboardMenuToggle"
        >
          <span>
            <i className="fas fa-stream"></i>
          </span>
        </button>
        <div className="flex-grow-1 d-md-none pt-2 text-center">
          <Link className="no-link lead text-primary font-weight-bolder" to="/">
            benshada
          </Link>
        </div>
        <div className="user float-right">
          <div className="img-holder float-left">
            {/* <img
          src={""}
          alt=""
          className="rounded-circle"
          width="50"
          height="50"
        /> */}
          </div>
          <p
            className="pt-5 ml-3 d-none d-md-inline position-relative"
            style={{ top: "10px" }}
          >
            Hello, {name}
          </p>
        </div>
        <div className="clear"></div>
      </div>
    ) : (
      ""
    );
  }

  render() {
    let { user, list } = this.props,
      name = user && user.name,
      divClass =
        user === undefined ? "col-9 offset-3 col-sm-10 offset-sm-2" : "col-12";

    name = name !== undefined ? name.split(" ")[0] : "";

    return (
      <>
        <div
          className={`${divClass} p-0 col-md-9 offset-md-3 col-lg-10 offset-lg-2 position-relative tab-content`}
          id="pills-tabContent"
        >
          {this.renderHeader(user, name)}
          {this.renderBodyComponents(list)}
        </div>
        {this.productUploadRenderer(user)}
      </>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { productUpload })(DashBody);
