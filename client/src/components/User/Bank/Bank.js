/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import CardList from './CardList/CardList.js';

export default class Bank extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render = () => {
    const { user } = this.props;
    const {
      _id, name, availableBalance
    } = user;

    const benshadaCards = [
      {
        expiry: 'XX/XXXX',
        name,
        number: _id,
        type: 'benshada',
        availableBalance
      }
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 py-3">
            <h4 className="flex-grow-1">Benshada Card</h4>
            <div className="row" id="benshadaCard">
              <CardList user={{ ...this.props.user, cards: benshadaCards }} />
            </div>

            <h4 className="flex-grow-1">Other Cards</h4>
            <div className="row">
              <CardList user={this.props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  };
}
