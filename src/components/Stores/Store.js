import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../Misc/Loading/Loading.js';
import NotFound from '../Misc/NotFound/NotFound.js';
import Src from '../Src/Src.js';

export default class Store extends Component {
  static propTypes = {
    stores: PropTypes.array,
    title: PropTypes.string
  }

  renderStores = (stores) => {
    if (stores === null) {
      return <Loading />;
    }

    return stores.length < 1 ? (
      <NotFound type="store" />
    ) : (
      <div className="card-columns products my-2">
        {stores.map((store, i) => {
          const { _id } = store;
          return (
          <div className={'card mb-4 product rounded shadow-sm border-0'} key={i}>
            <div className="card-body px-0 pb-4 pt-0">
              <div>
                <Src name={store && store.name} image={store && store.image} size={6} xtraClass="p-3" type="store" />
              </div>
              <div className="px-3">
                <Link to={`/stores/?id=${_id}`} className="text-capitalize">
                  {store.name}
                </Link>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { stores, title } = this.props;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col p-0">
            <h4 className="text-left text-uppercase">{title}</h4>
            {this.renderStores(stores)}
          </div>
        </div>
      </div>
    );
  }
}
