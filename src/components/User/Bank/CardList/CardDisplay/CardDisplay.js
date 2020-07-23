// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import Price from '../../../../ProductList/ProductDisplay/Price.js';

// Asset imports
import { cardNum } from '../../../../../assets/js/prototypes.js';
import master from '../../../../../assets/img/master.png';
import visa from '../../../../../assets/img/visa.png';
import benshada from '../../../../../assets/img/benshada.png';
import ButtonCardOwner from './ButtonCardOwner.js';

export default class CardDisplay extends Component {
  static propTypes = {
    card: PropTypes.object,
    user: PropTypes.object
  };

  render = () => {
    const { card, user } = this.props;
    const {
      _id, number, expiry, name, type
    } = card;
    const availableBalance = card && card.availableBalance;

    return (
      <div className="card mb-4 rounded shadow-sm border-0" key={`card${_id}`}>
        <div className="card-body d-flex p-0">
          <div className="arc"></div>
          <div className="gold"></div>
          <div className="balance">
            {type === 'benshada' ? (
              <Price price={availableBalance} />
            ) : (
              <ButtonCardOwner card={card} user={user} />
            )}
          </div>
          <div className="blank rounded-pill"></div>
          <div className="number text-uppercase text-truncate">{cardNum(number)}</div>
          <div className="date">
            <small>VALID THROUGH</small>
            <p>{expiry}</p>
          </div>
          <div className="name text-truncate">{name}</div>
          <div className="type">
            <img
              alt={type}
              src={
                {
                  visa,
                  master,
                  benshada
                }[type]
              }
            />
          </div>
        </div>
      </div>
    );
  };
}
