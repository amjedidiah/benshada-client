import React from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux"
import {updateUser} from "../../../actions/auth"
import {loadForm, doneForm} from "../../../actions/load"

class UserAB extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.pRef = React.createRef();
  }

  onChange = async ({target}) => {
    await this.setState({[target.getAttribute("id")]:  target.value})
  }

  onSubmit = formValues => {
    this.props.loadForm();
    this.props.updateUser(formValues)
    .then(response => {
      this.props.doneForm();
      if (this.pRef.current) {
        this.pRef.current.innerHTML = response.response
          ? response.response.data.message
          : response;
      }
    })
    .catch(error => {
      this.props.doneForm();
      if (this.pRef.current) {
        this.pRef.current.innerHTML = error;
      }
    })
  }
  
  state = {}


  render() {
    let {name, email} = this.props.user, fname = this.props.user.name.split(" ")[0]
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
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
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <i className="far fa-user mr-3"></i>Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-analytics-report-tab"
                  data-toggle="pill"
                  href="#pills-analytics-report"
                  role="tab"
                  aria-controls="pills-analytics-report"
                  aria-selected="false"
                >
                  <i className="far fa-calendar mr-3"></i>Analytics Report
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-revenue-tab"
                  data-toggle="pill"
                  href="#pills-revenue"
                  role="tab"
                  aria-controls="pills-revenue"
                  aria-selected="false"
                >
                  <i className="fas fa-funnel-dollar mr-3"></i>Revenue
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-orders-tab"
                  data-toggle="pill"
                  href="#pills-orders"
                  role="tab"
                  aria-controls="pills-orders"
                  aria-selected="false"
                >
                  <i className="fas fa-shopping-bag mr-3"></i>Orders
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-shop-settings-tab"
                  data-toggle="pill"
                  href="#pills-shop-settings"
                  role="tab"
                  aria-controls="pills-shop-settings"
                  aria-selected="false"
                >
                  <i className="fas fa-cog mr-3"></i>Shop Settings
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-sales-options-tab"
                  data-toggle="pill"
                  href="#pills-sales-options"
                  role="tab"
                  aria-controls="pills-sales-options"
                  aria-selected="false"
                >
                  <i className="fas fa-ellipsis-v mr-3"></i>Sales Options
                </a>
              </li>
            </ul>
          </div>
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
                <div className="img-holder rounded-circle d-inline border-light">
                  {/* <img
                    src="./img/login/login.jpg"
                    className="border border-danger rounded-circle"
                    width="50"
                    height="50"
                    alt=""
                  /> */}
                </div>
                <span className="mt-2 ml-1 d-none d-md-inline">
                  {this.props.user.name}
                </span>
              </div>
              <div className="clear"></div>
            </div>
                <div className="tab-pane p-5 mt-5 fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <div className="px-4 mb-4 text-center text-lg-left">
                        <div className="float-lg-left text-left rounded-circle position-relative" style={{width: "100px",height: "100px",overflow: "hidden",margin: "0 auto"}}>
                            <img src="./img/login/login.jpg" className="rounded-circle position-absolute" width="100" height="100" alt="" />
                            <div className="position-absolute w-100 text-center" style={{bottom: 0}}>
                                <div className="position-relative bg-transparent text-white p-1" style={{top: "32px"}}>Edit</div>
                                <form className="position-relative form"><input type="file" className="px-1" name="image" style={{opacity:0}} /></form>
                            </div>
                        </div>
                        <div className="pt-2 ml-2 float-lg-left">
                            <p className="mb-0"><strong>{name}</strong> <br/> {email}</p>
                            <p className="mt-3">
                                <span className="text-primary">Followers</span>: <span className="mr-md-3"> 2000</span>
                                <span className="text-primary d-block d-md-inline">Following</span>: 200
                            </p>
                        </div>
                        <div className=" clear">
                        </div>
                    </div>
                    <form className="form" onSubmit={async e => {
                      e.preventDefault();
                      await [...e.target.querySelectorAll(".form-control")].forEach(input => {
                        this.setState({
                          [input.getAttribute("id")]: input.value
                        })
                      })
                      this.onSubmit(this.state)
                      }
                    }>
                        <div className="form-row mt-5 justify-content-between">
                            <div className="col-11 col-md-5">
                                <div className="form-group">
                                    <label className="text-primary" htmlFor="name">Name</label>
                                    <input onChange={this.onChange} type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="name" id="name" disabled placeholder={`e.g: ${name}`} value={name} />
                                </div>
                            </div>
                            <div className="col-11 col-md-5">
                                <div className="form-group">
                                    <label className="text-primary" htmlFor="address">Contact Address</label>
                                    <textarea onChange={this.onChange} id="address" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" placeholder="e.g: 123 Bolton Avenue Abuja Nigeria" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-5">
                            <label className="text-primary" htmlFor="bio">Bio</label>
                            <textarea onChange={this.onChange} id="bio" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" placeholder="e.g: I am a local business man" required></textarea>
                        </div>
                        <div className="form-row mt-5 justify-content-between">
                            <div className="col-11 col-md-5">
                                <div className="form-group">
                                    <label className="text-primary" htmlFor="phone">Mobile Number</label>
                                    <input onChange={this.onChange} type="tel" id="phone" name="tel" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" placeholder="e.g: +2348165736665" required />
                                </div>
                            </div>
                            <div className="col-11 col-md-5">
                                <div className="form-group">
                                    <label className="text-primary" htmlFor="email">Email Address</label>
                                    <input onChange={this.onChange} type="email" id="email" name="email" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" placeholder={`e.g: ${email}`} value={email} required />
                                </div>
                            </div>
                        </div>
        <div
          className="alert text-danger alert-dismissible fade show p-0 mt-3"
          role="alert"
        >

          <small ref={this.pRef}></small>
        </div>
                        <button className="btn btn-primary rounded-pill " type="submit">Update Profile</button>
                    </form>
                </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, {updateUser, loadForm, doneForm})(UserAB);
