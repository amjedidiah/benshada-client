import React, { Component } from "react";
import { connect } from "react-redux";
import BenshadaForm from "../BenshadaForm/BenshadaForm";

import { productUpload } from "../../actions/user";
import {
  Profile,
  Products,
  Orders,
  Revenue,
  Analytics,
  Notifications,
  Settings
} from "./assets/bodyComponents";
import { Link } from "react-router-dom";
import { ifSeller } from "../../actions/auth";

const Components = {
  Profile,
  Products,
  Orders,
  Revenue,
  Analytics,
  Notifications,
  Settings
};

class DashBody extends Component {
  productUploadRenderer(user) {
    let productFields = [
        {
          desc: "name",
          placeholder: "Name",
          varClass: "input",
          type: "text",
          options: [],
          row: 1,
          icon: 0
        },
        {
          desc: "description",
          placeholder: "Description",
          varClass: "textarea",
          type: "text",
          options: [],
          row: 1,
          icon: 0
        },
        {
          desc: "price",
          placeholder: "Price",
          varClass: "input",
          type: "number",
          options: [],
          row: 1,
          icon: 1
        },
        {
          desc: "quantity",
          placeholder: "Quantity",
          varClass: "input",
          type: "number",
          options: [],
          row: 1,
          icon: 0
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
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title font-weight-light"
                  id="exampleModalLabel"
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
          data-target="#exampleModal"
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
        { user, store } = this.props;
      return (
        <div
          className={`tab-pane p-5 mt-5 fade ${
            Title === "Profile" ? "show active" : ""
          }`}
          id={`pills-${Title}`}
          role="tabpanel"
          aria-labelledby={`pills-${Title}-tab`}
          key={Title}
        >
          <TagName user={user} store={store} />
        </div>
      );
    });
  }

  render() {
    let name = this.props.user && this.props.user.name.split(" ")[0];

    return (
      <>
        <div
          className="col-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 tab-content p-0"
          id="pills-tabContent"
        >
          <div
            className="p-3 position-fixed bg-white shadow-sm d-flex d-md-block"
            id="dashboardHeader"
          >
            <button
              className="btn btn-white float-left border-0 d-md-none border border-primary"
              id="dashboardMenuToggle"
            >
              <span>
                <i className="fas fa-stream"></i>
              </span>
            </button>
            <div className="flex-grow-1 d-md-none pt-2 text-center">
              <Link
                className="no-link lead text-primary font-weight-bolder"
                to="/"
              >
                benshada
              </Link>
            </div>
            <div className="user float-right">
              <div className="img-holder rounded-circle d-inline py-1 px-2 d-none">
                {/* <img
                  src={""}
                  alt=""
                  className="rounded-circle"
                  width="50"
                  height="50"
                /> */}
              </div>
              <span className="mt-2 ml-3 d-none d-md-inline">
                Hello, {name}
              </span>
            </div>
            <div className="clear"></div>
          </div>
          {this.renderBodyComponents(this.props.list)}
        </div>
        {this.productUploadRenderer(this.props.user)}
      </>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { productUpload })(DashBody);
