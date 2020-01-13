import React, { Component } from "react";
import BenshadaForm from "../../BenshadaForm/BenshadaForm";
import { connect } from "react-redux";
import {
  userUpdateProfile,
  storeUpdateInfo,
  storeUpdateBank
} from "../../../actions/user";
import { stateSelect } from "../../../assets/location";
import { ifSeller } from "../../../actions/auth";

import MultiSelect from "../MultiSelect/MultiSelect";
import fedex from "../assets/img/fedex_logo.png";
import dhl from "../assets/img/dhl_logo.png";
import Product from "../../Product/Product";
import DashNav from "../DashNav";
import DashBody from "../DashBody";

const renderTabList = (array, id) =>
  array.map((item, i) => (
    <li className="nav-item" key={i}>
      <a
        className={`nav-link text-uppercase font-weight-bold ${
          i === 0 ? "active" : ""
        }`}
        id={`${id}-${item}-tab`}
        data-toggle="tab"
        href={`#${id}-${item}`}
        role="tab"
        aria-controls={`${id}-${item}`}
        aria-selected={i === 0}
      >
        {item}
      </a>
    </li>
  ));

class TabBody extends Component {
  render() {
    return (
      <div
        className={`tab-pane fade ${this.props.active} py-3`}
        id={this.props.name}
        role="tabpanel"
        aria-labelledby={`${this.props.name}-tab`}
      >
        {this.props.children}
      </div>
    );
  }
}

class ProfileTabBodyContainer extends Component {
  renderFollowers = (cat, type) =>
    !ifSeller(type) ? (
      <>
        <p className="mt-3">
          <span className="text-primary">Following</span>:{" "}
          <span className="mr-md-3"> 0</span>
        </p>
      </>
    ) : cat !== "store" ? (
      <p className="mt-3">
        <span className="text-primary">Following</span>:{" "}
        <span className="mr-md-3"> 0</span>
      </p>
    ) : (
      <p className="mt-3">
        <span className="text-primary">Followers</span>:{" "}
        <span className="mr-md-3"> 0</span>
      </p>
    );

  render() {
    let { user, type, store } = this.props,
      name = type !== "store" ? user && user.name : store && store.name,
      info = type !== "store" ? user && user.email : store && store.description;

    return (
      <div className="px-4 mb-4 text-center text-lg-left">
        <div
          className="float-lg-left text-left rounded-circle position-relative"
          style={{
            width: "100px",
            height: "100px",
            overflow: "hidden",
            margin: "0 auto"
          }}
        >
          <img
            src={""}
            alt=""
            className="rounded-circle position-absolute"
            width="100"
            height="100"
          />
          <div
            className="position-absolute w-100 text-center"
            style={{ bottom: 0 }}
          >
            <i className={`fas fa-${type} fa-6x text-primary`}></i>
          </div>
        </div>
        <div className="pt-2 ml-2 float-lg-left">
          <p className="mb-0">
            <strong>{name}</strong> <br />
            {info}
          </p>
          {/* {this.renderFollowers(type, user && user.type)} */}
        </div>

        <div className=" clear"></div>
      </div>
    );
  }
}

class ProductsTabBodyContainer extends Component {
  render() {
    return (
      <div className="px-4 mb-4 text-center text-lg-left">
        <Product
          title={""}
          products={[
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 0
            },
            {
              src: "",
              name: "nike shoes",
              price: "1500",
              category: "shoe",
              ratings: 10,
              discount: 10
            }
          ]}
        />

        <div className=" clear"></div>

        <div
          className="modal fade"
          id="infoModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="infoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title font-weight-light"
                  id="infoModalLabel"
                >
                  Product Info
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
                <div className="card-columns">
                  <div className="card shadow-sm text-left">
                    <p>Uploaded: </p>
                    <p>Remaining: </p>
                    <p>Ordered: </p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="reviewModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="reviewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title font-weight-light"
                  id="reviewModalLabel"
                >
                  Reviews
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
                <div className="card-columns">
                  <div className="card shadow-sm text-left">
                    <div className="card-header bg-white d-flex">
                      <img
                        src="../"
                        alt="Review"
                        className="img-fluid rounded-circle border border-light"
                        width="40"
                        height="40"
                      />
                      <p className="flex-grow-1 mx-3 pt-3">Reviewer</p>
                      <p className="pt-3">
                        <i className="fas fa-star text-primary mr-2"></i>{" "}
                        <span>4</span>
                      </p>
                    </div>
                    <div className="card-body">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni laudantium, molestiae necessitatibus dolorem alias
                        labore nostrum voluptatem reprehenderit vel cum vitae ab
                        repudiandae mollitia minima, ad, at temporibus modi
                        ducimus?
                      </p>
                      <small className="float-right">5th December 2019</small>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class OrdersTabBodyContainer extends Component {
  renderOrders() {
    return (
      <div className="card mb-4 pb-3 product rounded shadow-sm border-0">
        <div className="card-body p-0">
          <div className="d-flex orders">
            <div className="card-img-holder border border-light shadow-sm">
              <img src={fedex} className="img-fluid" alt="order" />
            </div>
            <div className="card-img-holder border border-light shadow-sm">
              <img src={fedex} className="img-fluid" alt="order" />
            </div>
            <div className="card-img-holder border border-light shadow-sm">
              <img src={fedex} className="img-fluid" alt="order" />
            </div>
            <div className="card-img-holder border border-light shadow-sm">
              <img src={fedex} className="img-fluid" alt="order" />
            </div>
          </div>
          <div>
            <div className="px-3">
              <p className="float-left mr-3 rounded-0 text-left pointer">
                <i className="fas fa-times text-primary ml-2"></i>
              </p>
              <h4 className="flex-grow-1 font-weight-bold text-right">
                <p className="mb-0">
                  &#x20A6; <span>1200</span>
                </p>
              </h4>
              <div className="clear"></div>
            </div>
            <div className="my-4 px-3 text-center">
              <p className="lead text-truncate text-capitalize my-0">
                1234567890
              </p>
              <small className="text-uppercase font-weight-bold my-0">
                buyer name
              </small>

              <p className="py-1 px-2 rounded-0 text-white bg-success ml-auto mr-auto">
                paid
              </p>
            </div>
            <button
              className="btn btn-primary mx-3"
              data-toggle="modal"
              data-target="#orderModal"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="px-4 mb-4 text-center">
        <div className="card-columns products">{this.renderOrders()}</div>

        <div className="clear"></div>

        <div
          className="modal fade"
          id="orderModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="orderModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title font-weight-light"
                  id="orderModalLabel"
                >
                  Order
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
                <div className="container bg-white p-4 mb-4 text-center d-md-flex shadow-sm">
                  <img
                    src="./img/login/login.jpg"
                    className="float-sm-left rounded mr-4 cart-img mb-3"
                    alt=""
                  />
                  <div className="flex-grow-1 text-left">
                    <h4>La Cote Body Fitting Men T-Shirt</h4>
                    <div className="my-4">
                      <p className="float-sm-left">Quantity: 1</p>
                      <p className="lead font-weight-bold float-sm-right">
                        <span>
                          ₦ 12230<span></span>
                        </span>
                      </p>
                      <div className="clear"></div>
                    </div>
                    <div className="my-4">
                      <p className="float-sm-left">
                        Color
                        <span className="bg-primary px-3 py-2 mr-2 rounded"></span>
                      </p>
                      <div className="clear"></div>
                    </div>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Profile extends Component {
  renderStoreInfoTab(user, store) {
    let name = store && store.name,
      description = store && store.description,
      policies = store && store.policies,
      bank = store && store.bank,
      bankName = bank && bank.name,
      bankNumber = bank && bank.number,
      bankType = bank && bank.type,
      bankSelect = [
        "Access Bank",
        "Fidelity Bank",
        "First City Monument Bank",
        "First Bank of Nigeria",
        "Guaranty Trust Bank",
        "Union Bank of Nigeria",
        "United Bank for Africa",
        "Zenith Bank",
        "Citibank Nigeria",
        "Ecobank Nigeria",
        "Heritage Banking Company",
        "Keystone Bank",
        "Polaris Bank",
        "Stanbic IBTC Bank",
        "Standard Chartered",
        "Sterling Bank",
        "Titan Trust Bank",
        "Unity Bank",
        "Wema Bank",
        "Globus Bank",
        "SunTrust Bank Nigeria",
        "Providus Bank"
      ],
      profileStoreFields = [
        {
          desc: "name",
          placeholder: "Shop Name",
          varClass: "input",
          type: "text",
          options: [],
          icon: 0,
          value: name
        },
        {
          desc: "description",
          placeholder: "Description",
          varClass: "textarea",
          type: "text",
          options: [],
          icon: 0,
          value: description
        },
        {
          desc: "policies",
          placeholder: "Store Policies",
          varClass: "textarea",
          type: "text",
          options: [],
          icon: 0,
          value: policies
        }
      ],
      profileStoreButtons = [
        { value: "Update Store Profile", className: "btn-primary" }
      ],
      profileBankFields = [
        {
          desc: "bankName",
          placeholder: "Account Name",
          varClass: "input",
          type: "text",
          options: [],
          row: 1,
          icon: 0,
          value: bankName
        },
        {
          desc: "number",
          placeholder: "Account Number",
          varClass: "input",
          type: "number",
          options: [],
          row: 2,
          icon: 0,
          value: bankNumber
        },
        {
          desc: "bankType",
          placeholder: "Bank Name",
          varClass: "select",
          type: "text",
          options: bankSelect,
          row: 1,
          icon: 0,
          value: bankType
        }
      ],
      profileBankButtons = [
        { value: "Update Bank Details", className: "btn-primary" }
      ],
      { storeUpdateInfo, storeUpdateBank } = this.props;

    return ifSeller(user.type) ? (
      <TabBody active="" name="profile-store">
        <ProfileTabBodyContainer user={user} type="store" store={store} />
        <BenshadaForm
          form={`form-profile-update-store`}
          onSubmitForm={storeUpdateInfo}
          className="form"
          fields={profileStoreFields}
          buttons={profileStoreButtons}
        />

        <MultiSelect
          title="categories"
          availableOptions={[
            { name: "ankara" },
            { name: "adire" },
            { name: "agbada" },
            { name: "bags" }
          ]}
          selectedOptions={[
            { name: "ankara" },
            { name: "adire" },
            { name: "agbada" }
          ]}
        />

        <MultiSelect
          title="delivery_options"
          availableOptions={[
            { name: "fedex", src: fedex },
            { name: "dhl", src: dhl }
          ]}
          selectedOptions={[
            { name: "fedex", src: fedex },
            { name: "dhl", src: dhl }
          ]}
        />

        <h4 className="mt-5 pt-5">Bank Details</h4>
        <BenshadaForm
          form={`form-profile-update-bank`}
          onSubmitForm={storeUpdateBank}
          className="form"
          fields={profileBankFields}
          buttons={profileBankButtons}
        />
      </TabBody>
    ) : (
      ""
    );
  }

  render() {
    let { user, store, userUpdateProfile } = this.props,
      profileFields = [
        {
          desc: "name",
          placeholder: "Full Name",
          varClass: "input",
          type: "text",
          options: [],
          icon: 0,
          value: user && user.name
        },
        {
          desc: "phone",
          placeholder: "Mobile Number",
          varClass: "input",
          type: "tel",
          options: [],
          icon: 0,
          value: user && user.phone
        },
        {
          desc: "street",
          placeholder: "Street",
          varClass: "textarea",
          type: "text",
          options: [],
          icon: 0,
          value: user && user.street
        },
        {
          desc: "state",
          placeholder: "State",
          varClass: "select",
          type: "text",
          options: stateSelect,
          row: 1,
          icon: 0,
          value: user && user.state
        },
        {
          desc: "country",
          placeholder: "Country",
          varClass: "select",
          type: "text",
          options: ["Nigeria", "Ghana"],
          row: 2,
          icon: 0,
          value: user && user.country
        },
        {
          desc: "bio",
          placeholder: "Bio",
          varClass: "textarea",
          type: "text",
          options: [],
          icon: 0,
          value: user && user.bio
        }
      ],
      profileButtons = [
        { value: "Update Personal Profile", className: "btn-primary" }
      ],
      tablist = !ifSeller(user && user.type)
        ? ["personal"]
        : ["personal", "store"];

    return (
      <div className="p-5 mt-5">
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "profile")}
        </ul>
        <div className="tab-content" id="profileTabContent">
          <TabBody active="show active" name="profile-personal">
            <ProfileTabBodyContainer user={user} store={store} type="user" />
            <BenshadaForm
              form={`form-profile-update-personal`}
              onSubmitForm={userUpdateProfile}
              className="form"
              fields={profileFields}
              buttons={profileButtons}
            />
          </TabBody>
          {this.renderStoreInfoTab(user, store)}
        </div>
      </div>
    );
  }
}

class Products extends Component {
  renderTabBody(tablist) {
    return tablist.map((item, i) => {
      let active = i === 0 ? "show active" : "";
      return (
        <TabBody active={active} name={`products-${item}`} key={i}>
          <ProductsTabBodyContainer time={item} />
        </TabBody>
      );
    });
  }

  render() {
    let tablist = ["today", "this_week", "this_month", "this_year", "all_time"];
    return (
      <div className="p-5 mt-5">
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "products")}
        </ul>
        <div className="tab-content" id="productsTabContent">
          {this.renderTabBody(tablist)}
        </div>
      </div>
    );
  }
}

class Orders extends Component {
  renderTabBody(tablist) {
    return tablist.map((item, i) => {
      let active = i === 0 ? "show active" : "";
      return (
        <TabBody active={active} name={`orders-${item}`} key={i}>
          <OrdersTabBodyContainer time={item} />
        </TabBody>
      );
    });
  }

  render() {
    let tablist = ["today", "this_week", "this_month", "this_year", "all_time"];
    return (
      <div className="p-5 mt-5">
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "orders")}
        </ul>
        <div className="tab-content" id="ordersTabContent">
          {this.renderTabBody(tablist)}
        </div>
      </div>
    );
  }
}

class Revenue extends Component {
  render() {
    return <div className="p-5 mt-5">Revenue</div>;
  }
}

class Messages extends Component {
  render() {
    return (
      <div className="py-5 px-4 px-md-5 mx-0 mt-5 h-100 message-div">
        <div className="p-0">
          <div className="my-3">
            <div className="rounded-circle float-left mr-3 img-holder">
              <img
                src="./img/login/login.jpg"
                className="rounded-circle"
                width="50"
                height="50"
                alt=""
              />
            </div>
            <div className="float-left p-3 bg-white shadow-sm">
              Hello
              <br />I am your assistant
            </div>
            <div className="clear"></div>
          </div>
          <div className="my-3">
            <div className="rounded-circle float-right ml-3 img-holder">
              <img
                src="./img/login/login.jpg"
                className="rounded-circle"
                width="50"
                height="50"
                alt=""
              />
            </div>
            <div className=" float-right p-3 bg-white shadow-sm">
              Hello
              <br />I am your assistant
            </div>
            <div className="clear"></div>
          </div>
          <div
            className="position-absolute pl-5"
            style={{
              bottom: 40,
              width: "100%",
              right: 0,
              border: "1px solid red"
            }}
          >
            Hello
          </div>
        </div>
      </div>
    );
  }
}

class Notifications extends Component {
  render() {
    let list = [
      {
        icon: "far fa-user",
        Title: "Paul",
        message: "I am happy to be at Benshada"
      },
      {
        icon: "fas fa-box",
        Title: "James",
        message: "I am happy to be at Benshada"
      },
      {
        icon: "fas fa-shopping-bag",
        Title: "Yinka",
        message: "I am happy to be at Benshada"
      },
      {
        icon: "fas fa-funnel-dollar",
        Title: "Benjamin",
        message: "I am happy to be at Benshada"
      },
      {
        icon: "far fa-bell",
        Title: "Tayo",
        message: "I am happy to be at Benshada"
      }
    ];
    return (
      <div className="row h-100">
        <DashNav list={list} user={""} className="bg-white" />
        <DashBody list={list} store={"hello"} />
      </div>
    );
  }
}

Profile = connect(null, {
  userUpdateProfile,
  storeUpdateInfo,
  storeUpdateBank
})(Profile);

export { Profile, Products, Orders, Revenue, Notifications, Messages };
