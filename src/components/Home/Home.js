import React from 'react';
import { connect } from 'react-redux';


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


  render = () => <>home</>
}


export default connect()(Home);
