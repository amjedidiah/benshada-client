import React, { Component } from 'react';
import HrFrComp from '../HrFrComp/HrFrComp';

import './Catalog.css';
import { Redirect } from 'react-router-dom';
import All from '../All/All';

export default class Catalog extends Component {
  queryString = decodeURI(this.props.location.search.split('=')[1]);

  render() {
    const { queryString } = this;

    return queryString === 'undefined' || queryString === '' ? (
      <Redirect to={{ pathname: '/' }} />
    ) : (
      <HrFrComp>
        <All type="product" queryString={queryString} title="Related Products" />
        <All type="store" queryString={queryString} title="Related Stores" />
      </HrFrComp>
    );
  }
}
