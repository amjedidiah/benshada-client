import React, { Component } from 'react';
import AuthRedirect from '../Auth/AuthRedirect.js';

export default class Payment extends Component {
  render = () => <><AuthRedirect type="payment" /><div>Payment</div></>;
}
