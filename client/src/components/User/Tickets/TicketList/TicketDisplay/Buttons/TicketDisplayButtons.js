/* eslint-disable no-underscore-dangle */
// Module imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Action imports
import { ticketsOneSelected } from '../../../../../../redux/actions/tickets.js';

class TicketDisplayButtons extends React.Component {
  static propTypes = {
    expand: PropTypes.func,
    ticket: PropTypes.object,
    ticketsOneSelected: PropTypes.func,
    user: PropTypes.object
  };

  render = () => (
    <>
      <div className="d-lg-none">
        <FontAwesomeIcon className="action" icon={faEye} onClick={() => this.props.expand()} />
        <span className="action" data-toggle="modal" data-target="#ticketEditModal">
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => this.props.ticketsOneSelected(this.props.ticket)}
          />
        </span>
        <span className="action" data-toggle="modal" data-target="#ticketDeleteModal">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => this.props.ticketsOneSelected(this.props.ticket)}
          />
        </span>
      </div>
      <div className="d-none d-lg-flex">
        <button className="btn btn-link text-uppercase action" onClick={() => this.props.expand()}>view</button>
        <button
          className="btn btn-primary text-uppercase action"
          data-toggle="modal"
          data-target="#ticketEditModal"
          onClick={() => this.props.ticketsOneSelected(this.props.ticket)}
        >
          edit
        </button>
        <button
          className="btn btn-danger text-uppercase action"
          onClick={() => this.props.ticketsOneSelected(this.props.ticket)}
          data-toggle="modal"
          data-target="#ticketDeleteModal"
        >
          delete
        </button>
      </div>
    </>
  );
}

export default connect(null, { ticketsOneSelected })(TicketDisplayButtons);
