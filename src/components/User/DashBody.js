import React, { Component } from "react";
import { connect } from "react-redux";
// import "./assets/bodyComponents";
import {
  Profile,
  Product,
  Orders,
  Revenue,
  Analytics,
  Notifications,
  Settings
} from "./assets/bodyComponents";

const Components = {
  Profile,
  Product,
  Orders,
  Revenue,
  Analytics,
  Notifications,
  Settings
};

class DashBody extends Component {
  renderBodyComponents(list) {
    return list.map((listItem, i) => {
      let { Title } = listItem,
        TagName = Components[Title];
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
          <TagName user={this.props.user} />
        </div>
      );
    });
  }

  render() {
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
              <a
                className="no-link lead text-primary font-weight-bolder"
                href="./"
              >
                benshada
              </a>
            </div>
            <div className="user float-right">
              <div className="img-holder rounded-circle d-inline border-light">
                <img
                  src={""}
                  alt=""
                  className="rounded-circle"
                  width="50"
                  height="50"
                />
              </div>
              <span className="mt-2 ml-1 d-none d-md-inline">
                {this.props.user.name}
              </span>
            </div>
            <div className="clear"></div>
          </div>
          {this.renderBodyComponents(this.props.list)}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DashBody);
