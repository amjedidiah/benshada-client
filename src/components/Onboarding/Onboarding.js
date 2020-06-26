/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TypeForm from './TypeForm.js';
import Auth from '../Auth/Auth.js';

import { userUpdate } from '../../redux/actions/users.js';
import { shopAdd } from '../../redux/actions/stores.js';
import StoreForm from '../StoreList/StoreDisplay/StoreForm.js';
import UserForm from './UserForm.js';

class Onboarding extends Component {
  INIT = {
    typeButton: 'Next',
    storeButton: 'Create',
    userButton: 'Done'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    user: PropTypes.object,
    userUpdate: PropTypes.func,
    shopAdd: PropTypes.func
  };

  typeSubmit = (typeData) => {
    this.setState({
      typeButton: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    this.props
      .userUpdate(this.props.user.email, typeData)
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
      .finally(() => this.setState(this.INIT));
  };

  storeSubmit = (storeData) => {
    this.setState({
      storeButton: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    if (storeData.CACNumber) {
      storeData.isRegisteredBusiness = true;
    }

    storeData.user = this.props.user._id;

    this.props
      .shopAdd(storeData)
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
      .finally(() => this.setState(this.INIT));
  };

  userSubmit = (userData) => {
    this.setState({
      userButton: (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    });

    if (userData.categories.length < 1) {
      this.setState(this.INIT);
      return toast.warn('Do select at least one preferred category');
    }

    Object.keys(userData).forEach((key) => {
      if (
        userData[key] === undefined
        || (userData[key] && userData[key].length) < 1
        || key === 'createdAt'
        || key === 'updatedAt'
        || key === '_id'
      ) {
        delete userData[key];
      }
    });

    const user = { ...userData, categories: userData.categories.map(({ value }) => value) };

    return this.props
      .userUpdate(this.props.user.email, user)
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
      .finally(() => this.setState(this.INIT));
  };

  renderHelp = () => {
    const { user } = this.props;

    if (!['UA', 'UB', 'UC'].includes(user && user.type)) {
      return <TypeForm buttonValue={this.state.typeButton} onSubmit={this.typeSubmit} />;
    }

    if (
      ((user && user.type === 'UA') || (user && user.type === 'UB'))
      && ((user && user.shops) || []).filter(
        (shop) => shop !== null && shop !== undefined && shop !== ''
      ).length < 1
    ) {
      return (
        <StoreForm type="create" buttonValue={this.state.storeButton} onSubmit={this.storeSubmit} />
      );
    }

    if (((user && user.categories) || []).filter(
      (cat) => cat !== null && cat !== undefined && cat !== ''
    ).length < 1) {
      return <UserForm buttonValue={this.state.userButton} onSubmit={this.userSubmit} />;
    }

    return false;
  };

  render = () => <Auth type="onboarding">{this.renderHelp()}</Auth>;
}

export default connect(null, { userUpdate, shopAdd })(Onboarding);
