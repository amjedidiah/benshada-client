/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

// Component imports
import FormField from '../../../form/formField.js';

// Asset imports
import { cardValidate as validate, ifMaster } from '../../../../assets/js/validate.js';
import '../../../../assets/css/form.css';

class CardForm extends Component {
  INIT = {
    animationClass: 'animate__zoomIn',
    valueCVV: '',
    valueExpiry: '',
    valueNumber: ''
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    card: PropTypes.object,
    onSubmit: PropTypes.func,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  onSubmit = ({
    cvv, expiry, name, number
  }) => this.props.onSubmit({
    cvv,
    expiry,
    name,
    number: number.replace(/\s/g, ''),
    type: ({ true: 'master' }[ifMaster(number.replace(/\s/g, ''))] || 'visa')
  });

  handleChangeCVV = (event) => {
    const { value, maxLength } = event.target;
    const valueCVV = value.slice(0, maxLength);

    this.setState({
      valueCVV
    });
  };

  handleChangeExpiry = (event) => {
    const { value, maxLength } = event.target;
    const val = value
      .split('')
      .filter((i) => i !== '/' && Number(i) < 10 && Number(i) > -1)
      .join('');
    const valueExpiry = val.length > 2
      ? `${val.substr(0, 2)}/${val.substr(2, val.length - 2)}`.slice(0, maxLength)
      : val;

    this.setState({
      valueExpiry
    });
  };

  handleChangeNumber = (event) => {
    const { value, maxLength } = event.target;
    const val = value
      .split(' ').join('').split('')
      .filter((i) => Number(i) < 10 && Number(i) > -1)
      .join('');
    const valueNumber = val.length > 4
      ? `${val.substr(0, 4)} ${val.substr(4, 4)} ${val.substr(8, 4)} ${val.substr(12, 4)}`.slice(0, maxLength)
      : val;

    this.setState({
      valueNumber
    });
  };

  render() {
    const { animationClass } = this.state;

    return (
      <>
        <h2 className="mb-0">{this.props.action ? 'New Card' : 'Edit Card'}</h2>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={`animate__animated ${animationClass} m-0`}
          autoComplete="off"
          id="cardForm"
        >
          <div className="form-row">
            <Field
              action="card"
              name="name"
              type="text"
              component={FormField}
              label="Name on Card"
              className="col-12"
              placeholder="e.g: John Doe"
            />
          </div>

          <div className="form-row">
            <Field
              action="card"
              name="number"
              type="text"
              component={FormField}
              label="Card Number"
              className="col-12"
              placeholder="XXXX XXXX XXXX XXXX"
              onChange={this.handleChangeNumber}
              maxLength={19}
              val={this.state.valueNumber}
            />
          </div>

          <div className="form-row">
            <Field
              action="card"
              name="expiry"
              type="text"
              component={FormField}
              label="Expiry Date"
              icon={faCalendar}
              className="col-12 col-md-6"
              placeholder="XX/XXXX"
              onChange={this.handleChangeExpiry}
              maxLength={7}
              val={this.state.valueExpiry}
            />
            <Field
              action="card"
              name="cvv"
              type="text"
              component={FormField}
              label="CVV"
              icon={faKey}
              className="col-12 col-md-6"
              placeholder="XXX"
              onChange={this.handleChangeCVV}
              maxLength={3}
              val={this.state.valueCVV}
            />
          </div>

          <div className="button-group">
            <button className="btn btn-primary" type="submit">
              {this.props.buttonValue}
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Done
            </button>
          </div>
        </form>
      </>
    );
  }
}

const warn = () => ({});

export default reduxForm({
  form: 'cardForm',
  validate,
  warn
})(CardForm);
