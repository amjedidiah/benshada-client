import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthRedirect from '../Auth/AuthRedirect.js';

class User extends Component {
  render = () => <><AuthRedirect type="user" /> User</>;
}

const mapStateToProps = ({ user }) => ({ user: user.selected });

export default connect(mapStateToProps)(User);
