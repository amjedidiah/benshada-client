/* eslint-disable no-underscore-dangle */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
import { userUpdate } from '../../../../../redux/actions/users.js';
import { cardsOneSelected, cardDelete } from '../../../../../redux/actions/cards.js';

class ButtonCardOwner extends React.Component {
  INIT = {
    buttonValue: 'Update Card'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    card: PropTypes.object,
    cardDelete: PropTypes.func,
    cardsOneSelected: PropTypes.func,
    selectedCard: PropTypes.object,
    user: PropTypes.object,
    userUpdate: PropTypes.func
  };

  cardSubmit = (cardData, user) => {
    this.setState({
      buttonCard: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    const email = user && user.email;
    const cards = (user && user.cards) || [];

    return this.props
      .userUpdate(email, {
        cards: cards.map((card) => (card.number === cardData.number ? cardData : card))
      })
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => {
        this.setState(this.INIT);
        $('.modal-backdrop').remove();
      });
  };

  render = () => {
    const { card, user, selectedCard } = this.props;
    const number = selectedCard && selectedCard.number;

    return (
      <>
        <span className="pointer ml-2" data-toggle="modal" data-target="#cardDelete">
          <FontAwesomeIcon icon={faTrash} onClick={() => this.props.cardsOneSelected(card)} />
        </span>

        <div
          className="modal fade text-secondary"
          id="cardDelete"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Card</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete card with number {number}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props
                    .cardDelete(user, number)
                    .then((response) => toast.success(
                      (response
                            && response.value
                            && response.value.data
                            && response.value.data.message)
                            || (response && response.statusText)
                            || 'Success'
                    ))
                    .catch((err) => toast.error(
                      (err && err.response && err.response.data && err.response.data.message)
                            || (err
                              && err.response
                              && err.response.data
                              && err.response.data.message
                              && err.response.data.message.name)
                            || (err && err.response && err.response.statusText)
                            || 'Network error'
                    ))
                    .finally(() => {
                      this.setState(this.INIT);
                      $('.modal-backdrop').remove();
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = ({ card }) => ({ selectedCard: card && card.selected });

export default connect(mapStateToProps, {
  userUpdate,
  cardsOneSelected,
  cardDelete
})(ButtonCardOwner);
