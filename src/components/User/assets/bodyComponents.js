import React, { Component } from "react";
import BenshadaForm from "../../BenshadaForm/BenshadaForm";
import { connect } from "react-redux";
import {
  userUpdateProfile,
  storeUpdateInfo,
  storeUpdateBank,
  orderCancel
} from "../../../actions/user";
import { filterContent } from "../../../actions/load";
import { stateSelect } from "../../../assets/location";
import { ifSeller } from "../../../actions/auth";

import MultiSelect from "../MultiSelect/MultiSelect";
import fedex from "../assets/img/fedex_logo.png";
import dhl from "../assets/img/dhl_logo.png";
import Product from "../../Product/Product";
import DashNav from "../DashNav";
import DashBody from "../DashBody";
import BarChart from "../../charts/BarChart";
import MultiLineChart from "../../charts/MultiLineChart";
import LineChart from "../../charts/LineChart";
import PieChart from "../../charts/PieChart";

import ContainerDimensions from "react-container-dimensions";

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
        <Product title={""} products={this.props.store.products} />

        <div className=" clear"></div>
      </div>
    );
  }
}

class OrdersTabBodyContainer extends Component {
  renderDiscountedPrice = (price, discount) =>
    discount > 0 ? (
      <>
        <small className="mb-0 font-weight-normal">
          <strike>
            &#x20A6; <span>{price}</span>
          </strike>
        </small>
        <p className="mb-0">
          &#x20A6; <span>{price * (1 - discount / 100)}</span>
        </p>
      </>
    ) : (
      <p className="mb-0">
        &#x20A6; <span>{price}</span>
      </p>
    );

  renderOrders = orders =>
    orders.length < 1 ? (
      <>No orders have been made yet</>
    ) : (
      <div className="card-columns products">
        {orders.map(
          (
            { isDeleted, products, status, _id, user, totalPrice, createdAt },
            i
          ) => {
            products = filterContent(products);
            return (
              <>
                <div className="card mb-4 pb-3 product rounded shadow-sm border-0">
                  <div className="card-body p-0">
                    <div className="d-flex orders">
                      {products.map(({ name, src }) => (
                        <div className="card-img-holder border border-light shadow-sm">
                          <img src={src} className="img-fluid" alt={name} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="px-3">
                        <p className="float-left mr-3 rounded-0 text-left">
                          <small>{createdAt}</small>
                        </p>
                        <h4 className="flex-grow-1 font-weight-bold text-right">
                          <p className="mb-0">
                            &#x20A6; <span>{totalPrice}</span>
                          </p>
                        </h4>
                        <div className="clear"></div>
                      </div>
                      <div className="my-4 px-3 text-center">
                        <p className="lead text-truncate text-capitalize my-0">
                          {_id}
                        </p>
                        <small className="text-uppercase font-weight-bold my-0">
                          {user && user.name}
                        </small>

                        <p className="py-1 px-2 rounded-0 text-white bg-success ml-auto mr-auto">
                          {status}
                        </p>
                      </div>
                      <button
                        className="btn btn-primary mx-3"
                        data-toggle="modal"
                        data-target={`#orderModal${i}`}
                      >
                        View
                      </button>
                      {ifSeller(this.props.user.type) ? (
                        <button
                          className="btn btn-danger mx-3"
                          onClick={this.props.orderCancel(_id)}
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id={`#orderModal${i}`}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby={`#orderModal${i}Label`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title font-weight-light"
                          id={`#orderModal${i}Label`}
                        >
                          Order {_id}
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
                        {products.map(({ name, price, discountPercentage }) => (
                          <div className="container bg-white p-4 mb-4 text-center d-md-flex shadow-sm">
                            {/* <img
                    src={src}
                    className="float-sm-left rounded mr-4 cart-img mb-3"
                    alt={name}
                  /> */}
                            <div className="flex-grow-1 text-left">
                              <h4>{name}</h4>
                              <div className="my-4">
                                {/* <p className="float-sm-left">Quantity: 1</p> */}
                                <p className="lead font-weight-bold float-sm-right">
                                  ₦{" "}
                                  {this.renderDiscountedPrice(
                                    price,
                                    discountPercentage
                                  )}
                                </p>
                                <div className="clear"></div>
                              </div>
                              {/* <div className="my-4">
                      <p className="float-sm-left">
                        Color
                        <span className="bg-primary px-3 py-2 mr-2 rounded"></span>
                      </p>
                      <div className="clear"></div>
                    </div> */}
                            </div>
                            <div className="clear"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        )}
      </div>
    );

  render() {
    return (
      <div className="px-4 mb-4 text-center">
        {this.renderOrders(filterContent(this.props.orders))}

        <div className="clear"></div>
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
          label: "Shop Name",
          placeholder: "e.g Paul Ahmed's Shop",
          varClass: "input",
          type: "text",
          options: [],
          icon: 0,
          value: name
        },
        {
          desc: "description",
          label: "Shop Description",
          varClass: "textarea",
          type: "text",
          options: [],
          icon: 0,
          value: description
        }
        // {
        //   desc: "policies",
        //   label: "Store Policies",
        //   varClass: "textarea",
        //   type: "text",
        //   options: [],
        //   icon: 0,
        //   value: policies
        // }
      ],
      profileStoreButtons = [
        { value: "Update Store Profile", className: "btn-primary" }
      ],
      profileBankFields = [
        {
          desc: "bankName",
          label: "Account Name",
          varClass: "input",
          type: "text",
          options: [],
          row: 1,
          icon: 0,
          value: bankName
        },
        {
          desc: "number",
          label: "Account Number",
          varClass: "input",
          type: "number",
          options: [],
          row: 2,
          icon: 0,
          value: bankNumber
        },
        {
          desc: "bankType",
          label: "Bank Name",
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
          initialValues={store}
        />

        {/* <MultiSelect
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
        /> */}
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
          label: "Full Name",
          placeholder: "Paul Ahmed",
          varClass: "input",
          type: "text",
          options: [],
          icon: 0,
          value: user && user.name
        },
        // {
        //   desc: "phone",
        //   label: "Mobile Number",
        //   placeholder: "+234 816 597 2229",
        //   varClass: "input",
        //   type: "tel",
        //   options: [],
        //   icon: 0,
        //   value: user && user.phone
        // },
        // {
        //   desc: "street",
        //   label: "Street",
        //   placeholder: "91 Ojuelegba Road Surulere",
        //   varClass: "textarea",
        //   type: "text",
        //   options: [],
        //   icon: 0,
        //   value: user && user.street
        // },
        {
          desc: "state",
          label: "State",
          varClass: "select",
          type: "text",
          options: stateSelect,
          row: 1,
          icon: 0,
          value: user && user.state
        }
        // {
        //   desc: "country",
        //   label: "Country",
        //   varClass: "select",
        //   type: "text",
        //   options: ["Nigeria", "Ghana"],
        //   row: 2,
        //   icon: 0,
        //   value: user && user.country
        // },
        // {
        //   desc: "bio",
        //   label: "Bio",
        //   varClass: "textarea",
        //   type: "text",
        //   options: [],
        //   icon: 0,
        //   value: user && user.bio
        // }
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
              initialValues={user}
            />
          </TabBody>
          {this.renderStoreInfoTab(user, store)}
        </div>
      </div>
    );
  }
}

class Products extends Component {
  renderTabBody(tablist, store) {
    return tablist.map((item, i) => {
      let active = i === 0 ? "show active" : "";
      return (
        <TabBody active={active} name={`products-${item}`} key={i}>
          <ProductsTabBodyContainer time={item} store={store} />
        </TabBody>
      );
    });
  }

  render() {
    let tablist = ["today", "this_week", "this_month", "this_year", "all_time"];
    return (
      <div className="p-5 mt-5">
        {/* <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "products")}
        </ul> */}
        <div className="tab-content" id="productsTabContent">
          {this.renderTabBody(tablist, this.props.store)}
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
          <OrdersTabBodyContainer
            user={this.props.user}
            time={item}
            orders={this.props.orders}
          />
        </TabBody>
      );
    });
  }

  render() {
    let tablist = ["today", "this_week", "this_month", "this_year", "all_time"];
    return (
      <div className="p-5 mt-5">
        {/* <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "orders")}
        </ul> */}
        <div className="tab-content" id="ordersTabContent">
          {this.renderTabBody(tablist)}
        </div>
      </div>
    );
  }
}

class Analytics extends Component {
  renderTabListBody = (list, content) =>
    list.map((item, i) => (
      <TabBody
        active={`show ${i === 0 ? "active" : ""}`}
        name={`analytics-${item}`}
        key={`analytics-${item}`}
      >
        <div className="card-columns">{content[i]}</div>
      </TabBody>
    ));

  averageProductPrice = products =>
    products
      .map(
        ({ price, discountPercentage }) =>
          price * (1 - discountPercentage / 100)
      )
      .reduce((total, num) => total + num, 0) / products.length;

  ordersCount = orders => orders.length;

  totalOrderRevenue = orders => {
    orders = orders.filter(order => order.status === "paid");

    return orders.length < 1
      ? 0
      : orders
          .map(({ totalPrice }) => totalPrice)
          .reduce((total, num) => total + num);
  };

  totalCustomers = orders => {
    orders = orders.filter(order => order.status === "paid");

    return orders.map(({ user }) => user._id).unique().length;
  };

  productRevenue = orders => {
    orders = orders.filter(order => order.status === "paid");

    let productArray = orders.products.map(({ name }) => name);
    return orders.products.map(({ name, price, discountPercentage }) => ({
      name,
      revenue:
        productArray.filter(item => item === name).length *
        price *
        (1 - discountPercentage / 100)
    }));
  };

  timeRevenue = orders =>
    orders
      .filter(order => order.status === "paid")
      .map(({ updatedAt, totalPrice }) => ({
        updatedAt,
        totalPrice
      }));

  render() {
    let tablist = ["revenue", "customer"],
      { user, orders, store } = this.props,
      data = [
        {
          name: "Bob",
          gender: "Male",
          age: 33,
          activities: [
            { date: "2018-10-2", count: 56 },
            { date: "2018-10-3", count: 55 },
            { date: "2018-10-4", count: 70 },
            { date: "2018-10-5", count: 35 },
            { date: "2018-10-6", count: 61 },
            { date: "2018-10-7", count: 71 },
            { date: "2018-10-8", count: 57 },
            { date: "2018-10-9", count: 14 },
            { date: "2018-10-10", count: 72 },
            { date: "2018-10-11", count: 75 },
            { date: "2018-10-12", count: 35 },
            { date: "2018-10-13", count: 27 },
            { date: "2018-10-14", count: 57 },
            { date: "2018-10-15", count: 77 }
          ]
        },
        {
          name: "Robin",
          gender: "Male",
          age: 12,
          activities: [
            { date: "2018-10-2", count: 31 },
            { date: "2018-10-3", count: 76 },
            { date: "2018-10-4", count: 48 },
            { date: "2018-10-5", count: 63 },
            { date: "2018-10-6", count: 42 },
            { date: "2018-10-7", count: 76 },
            { date: "2018-10-8", count: 30 },
            { date: "2018-10-9", count: 51 },
            { date: "2018-10-10", count: 42 },
            { date: "2018-10-11", count: 37 },
            { date: "2018-10-12", count: 26 },
            { date: "2018-10-13", count: 48 },
            { date: "2018-10-14", count: 95 },
            { date: "2018-10-15", count: 11 }
          ]
        },
        {
          name: "Anne",
          gender: "Female",
          age: 41,
          activities: [
            { date: "2018-10-2", count: 31 },
            { date: "2018-10-3", count: 76 },
            { date: "2018-10-4", count: 48 },
            { date: "2018-10-5", count: 36 },
            { date: "2018-10-6", count: 42 },
            { date: "2018-10-7", count: 72 },
            { date: "2018-10-8", count: 33 },
            { date: "2018-10-9", count: 55 },
            { date: "2018-10-10", count: 42 },
            { date: "2018-10-11", count: 27 },
            { date: "2018-10-12", count: 46 },
            { date: "2018-10-13", count: 58 },
            { date: "2018-10-14", count: 45 },
            { date: "2018-10-15", count: 12 }
          ]
        },
        {
          name: "Mark",
          gender: "Male",
          age: 16,
          activities: [
            { date: "2018-10-2", count: 66 },
            { date: "2018-10-3", count: 10 },
            { date: "2018-10-4", count: 54 },
            { date: "2018-10-5", count: 75 },
            { date: "2018-10-6", count: 55 },
            { date: "2018-10-7", count: 84 },
            { date: "2018-10-8", count: 24 },
            { date: "2018-10-9", count: 92 },
            { date: "2018-10-10", count: 84 },
            { date: "2018-10-11", count: 3 },
            { date: "2018-10-12", count: 78 },
            { date: "2018-10-13", count: 14 },
            { date: "2018-10-14", count: 30 },
            { date: "2018-10-15", count: 81 }
          ]
        },
        {
          name: "Joe",
          gender: "Male",
          age: 59,
          activities: [
            { date: "2018-10-2", count: 17 },
            { date: "2018-10-3", count: 22 },
            { date: "2018-10-4", count: 23 },
            { date: "2018-10-5", count: 1 },
            { date: "2018-10-6", count: 54 },
            { date: "2018-10-7", count: 58 },
            { date: "2018-10-8", count: 84 },
            { date: "2018-10-9", count: 24 },
            { date: "2018-10-10", count: 32 },
            { date: "2018-10-11", count: 16 },
            { date: "2018-10-12", count: 5 },
            { date: "2018-10-13", count: 22 },
            { date: "2018-10-14", count: 33 },
            { date: "2018-10-15", count: 29 }
          ]
        },
        {
          name: "Eve",
          gender: "Female",
          age: 38,
          activities: [
            { date: "2018-10-2", count: 3 },
            { date: "2018-10-3", count: 16 },
            { date: "2018-10-4", count: 12 },
            { date: "2018-10-5", count: 6 },
            { date: "2018-10-6", count: 97 },
            { date: "2018-10-7", count: 81 },
            { date: "2018-10-8", count: 22 },
            { date: "2018-10-9", count: 55 },
            { date: "2018-10-10", count: 99 },
            { date: "2018-10-11", count: 13 },
            { date: "2018-10-12", count: 76 },
            { date: "2018-10-13", count: 24 },
            { date: "2018-10-14", count: 39 },
            { date: "2018-10-15", count: 87 }
          ]
        },
        {
          name: "Karen",
          gender: "Female",
          age: 21,
          activities: [
            { date: "2018-10-2", count: 74 },
            { date: "2018-10-3", count: 99 },
            { date: "2018-10-4", count: 60 },
            { date: "2018-10-5", count: 2 },
            { date: "2018-10-6", count: 90 },
            { date: "2018-10-7", count: 63 },
            { date: "2018-10-8", count: 36 },
            { date: "2018-10-9", count: 88 },
            { date: "2018-10-10", count: 23 },
            { date: "2018-10-11", count: 34 },
            { date: "2018-10-12", count: 56 },
            { date: "2018-10-13", count: 87 },
            { date: "2018-10-14", count: 18 },
            { date: "2018-10-15", count: 38 }
          ]
        },
        {
          name: "Kirsty",
          gender: "Unknown",
          age: 25,
          activities: [
            { date: "2018-10-2", count: 5 },
            { date: "2018-10-3", count: 99 },
            { date: "2018-10-4", count: 9 },
            { date: "2018-10-5", count: 65 },
            { date: "2018-10-6", count: 41 },
            { date: "2018-10-7", count: 99 },
            { date: "2018-10-8", count: 42 },
            { date: "2018-10-9", count: 21 },
            { date: "2018-10-10", count: 89 },
            { date: "2018-10-11", count: 76 },
            { date: "2018-10-12", count: 83 },
            { date: "2018-10-13", count: 19 },
            { date: "2018-10-14", count: 63 },
            { date: "2018-10-15", count: 80 }
          ]
        },
        {
          name: "Chris",
          gender: "Female",
          age: 30,
          activities: [
            { date: "2018-10-2", count: 77 },
            { date: "2018-10-3", count: 28 },
            { date: "2018-10-4", count: 97 },
            { date: "2018-10-5", count: 40 },
            { date: "2018-10-6", count: 45 },
            { date: "2018-10-7", count: 21 },
            { date: "2018-10-8", count: 49 },
            { date: "2018-10-9", count: 24 },
            { date: "2018-10-10", count: 54 },
            { date: "2018-10-11", count: 99 },
            { date: "2018-10-12", count: 69 },
            { date: "2018-10-13", count: 9 },
            { date: "2018-10-14", count: 69 },
            { date: "2018-10-15", count: 70 }
          ]
        },
        {
          name: "Lisa",
          gender: "Female",
          age: 47,
          activities: [
            { date: "2018-10-2", count: 95 },
            { date: "2018-10-3", count: 66 },
            { date: "2018-10-4", count: 83 },
            { date: "2018-10-5", count: 36 },
            { date: "2018-10-6", count: 82 },
            { date: "2018-10-7", count: 51 },
            { date: "2018-10-8", count: 75 },
            { date: "2018-10-9", count: 76 },
            { date: "2018-10-10", count: 8 },
            { date: "2018-10-11", count: 58 },
            { date: "2018-10-12", count: 4 },
            { date: "2018-10-13", count: 94 },
            { date: "2018-10-14", count: 49 },
            { date: "2018-10-15", count: 61 }
          ]
        },
        {
          name: "Tom",
          gender: "Male",
          age: 15,
          activities: [
            { date: "2018-10-2", count: 21 },
            { date: "2018-10-3", count: 88 },
            { date: "2018-10-4", count: 61 },
            { date: "2018-10-5", count: 9 },
            { date: "2018-10-6", count: 80 },
            { date: "2018-10-7", count: 37 },
            { date: "2018-10-8", count: 82 },
            { date: "2018-10-9", count: 67 },
            { date: "2018-10-10", count: 93 },
            { date: "2018-10-11", count: 19 },
            { date: "2018-10-12", count: 90 },
            { date: "2018-10-13", count: 10 },
            { date: "2018-10-14", count: 23 },
            { date: "2018-10-15", count: 13 }
          ]
        },
        {
          name: "Stacy",
          gender: "Unknown",
          age: 20,
          activities: [
            { date: "2018-10-2", count: 56 },
            { date: "2018-10-3", count: 98 },
            { date: "2018-10-4", count: 95 },
            { date: "2018-10-5", count: 62 },
            { date: "2018-10-6", count: 84 },
            { date: "2018-10-7", count: 51 },
            { date: "2018-10-8", count: 71 },
            { date: "2018-10-9", count: 73 },
            { date: "2018-10-10", count: 33 },
            { date: "2018-10-11", count: 5 },
            { date: "2018-10-12", count: 50 },
            { date: "2018-10-13", count: 12 },
            { date: "2018-10-14", count: 77 },
            { date: "2018-10-15", count: 68 }
          ]
        },
        {
          name: "Charles",
          gender: "Male",
          age: 13,
          activities: [
            { date: "2018-10-2", count: 98 },
            { date: "2018-10-3", count: 10 },
            { date: "2018-10-4", count: 93 },
            { date: "2018-10-5", count: 19 },
            { date: "2018-10-6", count: 70 },
            { date: "2018-10-7", count: 26 },
            { date: "2018-10-8", count: 6 },
            { date: "2018-10-9", count: 82 },
            { date: "2018-10-10", count: 98 },
            { date: "2018-10-11", count: 43 },
            { date: "2018-10-12", count: 95 },
            { date: "2018-10-13", count: 50 },
            { date: "2018-10-14", count: 60 },
            { date: "2018-10-15", count: 93 }
          ]
        },
        {
          name: "Mary",
          gender: "Female",
          age: 29,
          activities: [
            { date: "2018-10-2", count: 53 },
            { date: "2018-10-3", count: 20 },
            { date: "2018-10-4", count: 82 },
            { date: "2018-10-5", count: 76 },
            { date: "2018-10-6", count: 9 },
            { date: "2018-10-7", count: 3 },
            { date: "2018-10-8", count: 76 },
            { date: "2018-10-9", count: 23 },
            { date: "2018-10-10", count: 80 },
            { date: "2018-10-11", count: 84 },
            { date: "2018-10-12", count: 88 },
            { date: "2018-10-13", count: 53 },
            { date: "2018-10-14", count: 58 },
            { date: "2018-10-15", count: 66 }
          ]
        }
      ],
      orderRevenue = this.totalOrderRevenue(filterContent(orders)),
      customers = this.totalCustomers(filterContent(orders)),
      paidOrders = filterContent(orders).filter(
        order => order.status === "paid"
      ),
      customerOrders = paidOrders.map(({ user, totalPrice }) => ({
        name: user.name,
        totalPrice
      })),
      uniqueCustomerNames = paidOrders.map(({ user }) => user.name).unique(),
      content = [
        <>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">total revenue</p>
              <h1 className="display-4 text-primary text-center">
                &#x20A6; {orderRevenue}
              </h1>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">total orders</p>
              <h1 className="display-4 text-primary text-center">
                {this.ordersCount(filterContent(orders))}
              </h1>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">average product price</p>
              <h1 className="display-4 text-primary text-center">
                &#x20A6;{" "}
                {this.averageProductPrice(filterContent(store.products))}
              </h1>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: "75vh" }}>
              <p className="card-title text-uppercase">revenue over time</p>
              <ContainerDimensions>
                {({ height, width }) =>
                  filterContent(orders).length < 1 ? (
                    <>No products purchased yet</>
                  ) : (
                    <LineChart
                      data={this.timeRevenue(filterContent(orders))}
                      width={width * 0.95}
                      height={height * 0.8}
                    />
                  )
                }
              </ContainerDimensions>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: "75vh" }}>
              <p className="card-title text-uppercase">revenue per product</p>
              <ContainerDimensions>
                {({ height, width }) =>
                  filterContent(orders).length < 1 ? (
                    <>No products purchased yet</>
                  ) : (
                    <BarChart
                      data={this.productRevenue(filterContent(orders))}
                      width={width * 0.95}
                      height={height * 0.8}
                    />
                  )
                }
              </ContainerDimensions>
            </div>
          </div>
        </>,
        <>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">total customers</p>
              <h1 className="display-4 text-primary text-center">{customers}</h1>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-title text-uppercase">average customer spend</p>
              <h1 className="display-4 text-primary text-center">
                {" "}
                &#x20A6; {customers === 0 ? 0 : orderRevenue / customers}
              </h1>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: "75vh" }}>
              <p className="card-title text-uppercase">revenue per customer</p>
              <ContainerDimensions>
                {({ height, width }) =>
                  paidOrders.length < 1 ? (
                    <>No products purcahsed yet</>
                  ) : (
                    <PieChart
                      data={[customerOrders, uniqueCustomerNames]}
                      width={width * 0.95}
                      height={height * 0.8}
                    />
                  )
                }
              </ContainerDimensions>
            </div>
          </div>

          {/* <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: "75vh" }}>
              <p className="card-title text-uppercase">
                new vs. returning customers
              </p>
              <ContainerDimensions>
                {({ height, width }) => (
                  <MultiLineChart
                    datas={[data[0], data[1]]}
                    width={width * 0.95}
                    height={height * 0.8}
                  />
                )}
              </ContainerDimensions>
            </div>
          </div> */}
        </>
      ];

    return (
      <div className="p-5 mt-5">
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "analytics")}
        </ul>
        <div className="tab-content" id="analyticsTabContent">
          {this.renderTabListBody(tablist, content)}
        </div>
      </div>
    );
  }
}

class Messages extends Component {
  render() {
    let chatFields = [
        {
          desc: "message",
          placeholder: "Type a message",
          varClass: "input",
          className: "mx-4 py-4",
          type: "text",
          options: [],
          icon: 0
        }
      ],
      chatButtons = [];

    return (
      <div className="py-5  mx-0 mt-5 h-100 message-div">
        <div className="p-0 position-relative h-100">
          <div className="my-3 px-4 px-md-5">
            {/* <div className="rounded-circle float-left mr-3 img-holder">
              <img
                src="./img/login/login.jpg"
                className="rounded-circle"
                width="50"
                height="50"
                alt=""
              />
            </div> */}
            <div className="float-left p-3 bg-white shadow-sm">
              Hello
              <br />I am your assistant
            </div>
            <div className="clear"></div>
          </div>
          <div className="my-3 px-4 px-md-5">
            {/* <div className="rounded-circle float-right ml-3 img-holder">
              <img
                src="./img/login/login.jpg"
                className="rounded-circle"
                width="50"
                height="50"
                alt=""
              />
            </div> */}
            <div className=" float-right p-3 bg-white shadow-sm">
              Hello
              <br />I am your assistant
            </div>
            <div className="clear"></div>
          </div>
          <div className="position-absolute chat-form-holder bg-white shadow">
            <div className="position-relative">
              <BenshadaForm
                form={`form-chat`}
                onSubmitForm={() => console.log("form-chat")}
                className="form py-0"
                fields={chatFields}
                buttons={chatButtons}
              />
              <p className="px-4">
                <small>
                  Press enter to send your message.
                  <br />
                  Hold down <em>Shift</em> and press Enter to go to the next
                  line
                </small>
              </p>
            </div>
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
        icon: "fas fa-chart-pie",
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
  storeUpdateBank,
  orderCancel
})(Profile);

export { Profile, Products, Orders, Analytics, Messages };
