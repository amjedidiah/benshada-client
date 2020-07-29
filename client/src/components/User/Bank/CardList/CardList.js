// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import NotFound from '../../../NotFound/NotFound.js';
import CardDisplay from './CardDisplay/CardDisplay.js';

// Start Component
export default class CardList extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  renderCardList = (user) => {
    const cards = (user && user.cards) || [];

    return (cards.length > 0 ? (
      <>
        <div className="cards bank">
          {cards.map((card, key) => (
            <CardDisplay key={`cardList${key}`} card={card} user={user} />
          ))}
        </div>
      </>
    ) : (
      <NotFound type="card" />
    ));
  }

  render = () => <>{this.renderCardList(this.props.user)}</>;
}
// End Component
