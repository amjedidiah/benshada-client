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
          {this.renderFollowers(type, user && user.type)}
        </div>

        <div className=" clear"></div>
      </div>
    );
  }
}

class ProductsTabBodyContainer extends Component {
  renderProducts() {
    return (
      <div className="card mb-4 product rounded shadow-sm border-0">
        <div className="card-body p-0">
          <img
            className="card-img rounded-top p-0"
            src="./img/products/product.jpg"
            alt="product"
          />
          <div className=" text-center px-2 pb-2">
            <p className="float-left py-1 px-2 rounded-0 text-white bg-primary text-left">
              Wished
            </p>
            <div className="clear"></div>

            <p className="lead font-weight-bolder mb-2 text-truncate">
              {this.props.time}
            </p>
            <h3 className="mt-2 mb-4">
              <span>&#x20A6; 12230</span>
            </h3>
            <p className="text-right m-1 text-truncate">Uploaded: </p>
            <p className="text-right m-1 text-truncate">Remaining: </p>
            <p className="text-right m-1 text-truncate">Ordered: </p>
            <div className="mb-4 mt-5">
              <button
                className="btn bg-white text-primary mx-3"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Edit
              </button>
              <button className="btn btn-danger mx-3">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="px-4 mb-4 text-center text-lg-left">
        <div className="card-columns products no-restrict">
          {this.renderProducts()}
        </div>

        <div className=" clear"></div>
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
      <>
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
      </>
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
      <>
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, "products")}
        </ul>
        <div className="tab-content" id="productsTabContent">
          {this.renderTabBody(tablist)}
          {/* {this.renderStoreInfoTab(user)} */}
        </div>
      </>
    );
  }
}

class Orders extends Component {
  render() {
    return <div className="p-5 m-5 ">Orders</div>;
  }
}

class Revenue extends Component {
  render() {
    return <div className="p-5 m-5 ">Revenue</div>;
  }
}

class Analytics extends Component {
  render() {
    return <div className="p-5 m-5 ">Analytics</div>;
  }
}

class Notifications extends Component {
  render() {
    return <div className="p-5 m-5 ">Notifications</div>;
  }
}

class Settings extends Component {
  render() {
    return <div className="p-5 m-5 ">Settings</div>;
  }
}

Profile = connect(null, {
  userUpdateProfile,
  storeUpdateInfo,
  storeUpdateBank
})(Profile);

export {
  Profile,
  Products,
  Orders,
  Revenue,
  Analytics,
  Notifications,
  Settings
};
