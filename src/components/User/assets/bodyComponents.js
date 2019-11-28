import React, { Component } from "react";
import BenshadaForm from "../../BenshadaForm/BenshadaForm";
import { connect } from "react-redux";
import { userUpdateProfile, userUpdateStore } from "../../../actions/user";
import { stateSelect } from "../../../assets/location";

const renderTabList = (array, type) =>
  array.map((item, i) =>
    type === "c" && item === "store" ? (
      ""
    ) : (
      <li className="nav-item" key={i}>
        <a
          className={`nav-link text-uppercase font-weight-bold ${
            i === 0 ? "active" : ""
          }`}
          id={`profile-${item}-tab`}
          data-toggle="tab"
          href={`#profile-${item}`}
          role="tab"
          aria-controls={`profile-${item}`}
          aria-selected={i === 0}
        >
          {item}
        </a>
      </li>
    )
  );

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
    type === "c" ? (
      <>
        <span className="text-primary d-block d-md-inline">Following</span>: 0
      </>
    ) : cat !== "store" ? (
      <>
        <span className="text-primary d-block d-md-inline">Following</span>: 0
      </>
    ) : (
      <p className="mt-3">
        <span className="text-primary">Followers</span>:{" "}
        <span className="mr-md-3"> 0</span>
      </p>
    );

  render() {
    let { user, type } = this.props,
      name =
        type !== "store"
          ? user.name
          : user.store !== undefined
          ? user.store.name
          : "",
      info =
        type !== "store"
          ? user.email
          : user.store !== undefined
          ? user.store.description
          : "";

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
          {this.renderFollowers(type, user.type)}
        </div>

        <div className=" clear"></div>
      </div>
    );
  }
}

class Profile extends Component {
  renderStoreInfoTab(user) {
    let { name, description } = user.store,
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
        }
      ],
      profileStoreButtons = [
        { value: "Update Store Profile", className: "btn-primary" }
      ];
    return user.type === "c" ? (
      ""
    ) : (
      <TabBody active="" name="profile-store">
        <ProfileTabBodyContainer user={user} type="store" />
        <BenshadaForm
          form={`form-profile-update-store`}
          onSubmitForm={this.props.userUpdateStore}
          className="form"
          fields={profileStoreFields}
          buttons={profileStoreButtons}
        />
      </TabBody>
    );
  }

  render() {
    let user = this.props.user,
      { name, email, state, country, street, bio, phone, type, store } = user,
      profileFields = [
        {
          desc: "name",
          placeholder: "Full Name",
          varClass: "input",
          type: "text",
          options: [],
          icon: 0,
          value: name
        },
        {
          desc: "phone",
          placeholder: "Mobile Number",
          varClass: "input",
          type: "tel",
          options: [],
          row: 1,
          icon: 0,
          value: phone
        },
        {
          desc: "email",
          placeholder: "Email Address",
          varClass: "input",
          type: "email",
          options: [],
          row: 2,
          icon: 0,
          value: email
        },
        {
          desc: "street",
          placeholder: "Street",
          varClass: "textarea",
          type: "text",
          options: [],
          icon: 0,
          value: street
        },
        {
          desc: "state",
          placeholder: "State",
          varClass: "select",
          type: "text",
          options: stateSelect,
          row: 1,
          icon: 0,
          value: state
        },
        {
          desc: "country",
          placeholder: "Country",
          varClass: "select",
          type: "text",
          options: ["Nigeria", "Ghana"],
          row: 2,
          icon: 0,
          value: country
        },
        {
          desc: "bio",
          placeholder: "Bio",
          varClass: "textarea",
          type: "text",
          options: [],
          icon: 0,
          value: bio
        }
      ],
      profileButtons = [
        { value: "Update Personal Profile", className: "btn-primary" }
      ],
      tablist = user === "c" ? ["personal"] : ["personal", "store"];

    return (
      <>
        <ul className="nav nav-test nav-tabs" id="myTab" role="tablist">
          {renderTabList(tablist, user.type)}
        </ul>
        <div className="tab-content" id="profileTabContent">
          <TabBody active="show active" name="profile-personal">
            <ProfileTabBodyContainer user={user} type="user" />
            <BenshadaForm
              form={`form-profile-update-personal`}
              onSubmitForm={this.props.userUpdateProfile}
              className="form"
              fields={profileFields}
              buttons={profileButtons}
            />
          </TabBody>
          {this.renderStoreInfoTab(user)}
        </div>
      </>
    );
  }
}

class Product extends Component {
  render() {
    return <div className="p-5 m-5 ">Product</div>;
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

Profile = connect(null, { userUpdateProfile, userUpdateStore })(Profile);

export {
  Profile,
  Product,
  Orders,
  Revenue,
  Analytics,
  Notifications,
  Settings
};
