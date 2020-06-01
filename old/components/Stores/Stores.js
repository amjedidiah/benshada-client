import React, { Component } from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HrFrComp from '../HrFrComp/HrFrComp.js';
import All from '../All/All.js';
import { fetchStores, fetchOrder } from '../../redux/old/actions/misc.js.js';
import Loading from '../Misc/Loading/Loading.js';
import NotFound from '../Misc/NotFound/NotFound.js';

// import Product from "../Products/Product";
// import { connect } from "react-redux";

class Stores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: null,
      queryString: null,
      nameQueryString: null,
      orders: null
    };
  }

  static propTypes = {
    location: PropTypes.object
  }

  static getDerivedStateFromProps =
  (props, state) => (qs.parse(props.location.search).id !== state.queryString
  || qs.parse(props.location.search).name !== state.nameQueryString
    ? { store: null, queryString: null, nameQueryString: null }
    : null);

    renderHelper = (store, queryString, nameQueryString) => {
      if ((queryString === undefined || queryString === '')
      && (nameQueryString === undefined || nameQueryString === '')) {
        return (
        <All type="store" queryString="" title="All Stores" />
        );
      }

      if (store === null) return <Loading />;

      if (store.length === 0) return <NotFound type="store" />;

      return (
        <>
          <div className="container p-4 my-4 bg-white shadow-sm">
            <div className="row">
              <div className="col-2">
                <img src="./img/dhl_logo.png" alt="" className="img-fluid" />
              </div>
              <div className="col">
                <hgroup>
                  {/* <h4 className="float-right mt-1">
                    <a href="#">Clothing and Shoes</a>
                  </h4> */}
                  <Link to={`/stores?name=${store[0] && store[0].name}`}>
                    <h2 className="mb-0">{store[0] && store[0].name}</h2>
                  </Link>
                  <div className="clear"></div>
                </hgroup>
                <p className="pb-0">{store[0] && store[0].description}</p>
                <div className="row mb-3">
                  {/* <div className="col">
                    <i className="fas fa-map-marker-alt text-primary"></i> No 24
                    Fresh Lane Lagos Nigeria
                  </div>
                  <div className="col">
                    <i className="fas fa-phone text-primary"></i>
                    <a href="tel:+2348165972229"> +234 816 597 2229</a>
                  </div> */}
                  <div className="col">
                    <i className="fas fa-calendar text-primary"></i> Date opened:{' '}
                    <span>{new Date(store[0] && store[0].createdAt).toDateString()}</span>
                  </div>
                </div>
                {/* <div className="row text-primary">
                  <div className="col">
                    <i className="fas fa-share-alt mr-4"></i>
                    <i className="fab fa-twitter mr-4"></i>
                    <i className="fab fa-facebook-f mr-4"></i>
                    <button className="btn btn-primary float-right">
                      Follow
                    </button>
                    <button className="btn btn-primary float-right mr-3">
                      Message
                    </button>
                    <div className="clear"></div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="container p-4 my-4 bg-white shadow-sm">
            <div className="row">
              <div className="col">
                <img
                  src="./img/jumbotron/benshadawebbanners01.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div> */}
          <div className="container p-4 my-4 bg-white shadow-sm">
            <div className="row">
              <div className="col">
                <h4>Store Stats</h4>
                <div className="card-columns no-restrict">
                  {/* <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Followers</p>
                      <h1 className="display-4 text-primary text-center">4k</h1>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Following</p>
                      <h1 className="display-4 text-primary text-center">
                        1,561
                      </h1>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Visits</p>
                      <h1 className="display-4 text-primary text-center">13</h1>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Months Active</p>
                      <h1 className="display-4 text-primary text-center">
                        4
                      </h1>
                    </div>
                  </div> */}
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Sales</p>
                      <h1 className="display-4 text-primary text-center">
                        {this.state.orders.filter(({ status }) => status === 'paid').length}
                      </h1>
                    </div>
                  </div>
                  {/* <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Ratings</p>
                      <h1 className="text-primary text-center">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </h1>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <All
            type="product"
            className="p-4 my-4 bg-white shadow-sm"
            store={store[0] && store[0].name}
            title="All Products"
            productName=""
          />

          <All
            type="product"
            className="p-4 my-4 bg-white shadow-sm"
            store={store[0] && store[0].name}
            title="Discounted Products"
            productName=""
            productDiscount=""
          />
        </>
      );
    }

    render() {
      const { store, queryString, nameQueryString } = this.state;


      return (
      <HrFrComp>
        {this.renderHelper(store, queryString, nameQueryString)}
      </HrFrComp>
      );
    }

  helperFunc = async () => {
    const queryString = qs.parse(this.props.location.search).id;
    const nameQueryString = qs.parse(this.props.location.search).name;
    const req = await fetchStores();
    const res = await fetchOrder();
    const store = req.data.data
      .filter(({ _id, name }) => _id === queryString || name === nameQueryString);
    const productIDs = (store[0] && store[0].products).map(({ _id }) => _id);
    const orders = res.data.data
      .map((order) => order.products.map((product) => ({ ...product, order })))
      .reduce((a, item) => a.concat(item), [])
      .map(({ _id, order }) => (productIDs.indexOf(_id) !== -1 ? order : ''))
      .filter((item) => item !== '');

    this.setState({
      store, queryString, nameQueryString, orders
    });
  };

  componentDidUpdate = () => {
    if (qs.parse(this.props.location.search).id === this.state.queryString) return false;

    return qs.parse(this.props.location.search).name !== this.state.nameQueryString
      ? this.helperFunc()
      : '';
  }

  componentDidMount = () => this.helperFunc();
}

export default Stores;
