import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import HrFrComp from '../HrFrComp/HrFrComp.js';
import './Catalog.css';
import All from '../All/All.js';
import { split } from '../../prototypes.js';

export default class Catalog extends Component {
  static propTypes = {
    location: PropTypes.string
  }

  queryString = decodeURI(
    split(
      this.props.location.search, '='
    )[1]
  );

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
