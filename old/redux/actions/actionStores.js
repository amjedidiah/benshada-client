/* eslint-disable no-underscore-dangle */
import 'babel-polyfill';
import api from '../apis/api.js';
import { SHOP } from './actionTypes.js';
import { actionErrorAdd } from './actionLoad.js';
import '../prototypes.js';

const shopActionSuccess = (type, shops) => ({ type, shops });

export const shopAdd = (formValues, userToken) => (dispatch) => api
  .post('/shops', formValues, {
    headers: { Authorization: `Bearer ${userToken}` }
  })
  .then(() => dispatch(shopActionSuccess(SHOP.SHOP_ADD)))
  .catch((err) => dispatch(actionErrorAdd(err)));

export const shopGetAll = () => (dispatch) => api
  .get('/shops')
  .then(({ data }) => dispatch(shopActionSuccess(SHOP.SHOP_GET_ALL, data)))
  .catch((err) => dispatch(actionErrorAdd(err)));

export const shopFilterByOwner = (owner) => (dispatch) => api
  .get('/shops')
  .then(({ data }) => {
    const shops = data;
    const active = shops.data.filter(({ user }) => user._id === owner)[0];

    dispatch(shopActionSuccess(SHOP.SHOP_FILTER_BY_OWNER, active));
  })
  .catch((err) => dispatch(actionErrorAdd(err)));

export const shopCreate = (formValues, userToken) => (dispatch, getState) => dispatch(
  shopFilterByOwner(formValues.user)
).then(() => {
  const owner = formValues.user;

  return getState().shops.active._id === owner
    ? dispatch(actionErrorAdd('You already have a shop'))
    : dispatch(shopAdd(formValues, userToken));
}).catch((err) => dispatch(actionErrorAdd(err)));
