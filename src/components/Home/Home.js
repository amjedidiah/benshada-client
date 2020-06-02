import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header.js';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      stores1: null,
      stores2: null,
      productsRecent: null,
      productsTopRated: null,
      productsDiscounted: null
    };
  }


  render = () => <><Header /></>
}


export default connect()(Home);
