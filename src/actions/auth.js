import api from '../apis/api.js';
// import axios from "axios";

import {
  LOGIN, REGISTER, LOGOUT, ROLE_SELECT, ACTION_LOAD_AVOIDED
} from './types.js';

import {
  actionLoad, actionNotify, errorReport, timeOut, enqueueDynamicArray
} from './load.js';
import history from '../history.js';
// eslint-disable-next-line import/no-cycle
import { userFetch, storeCreate } from './user.js';

export const ifSeller = (type) => (!!(type === 'a' || type === 'b'));

export const login = (formValues) => (dispatch, getState) => {
  dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

  const req = api.post('/users/login', formValues, timeOut);

  return req
    .then((res) => dispatch([
      {
        type: LOGIN,
        payload: [res.data.data.email, res.data.data.token]
      },
      actionNotify(res.data.message)
    ]))
    .then(() => dispatch(userFetch()))
    .catch((error) => dispatch(errorReport(error)));
};

export const logout = () => (dispatch) => enqueueDynamicArray([
  dispatch(actionLoad()),
  dispatch({
    type: LOGOUT
  }),
  dispatch(actionNotify('Logout successful')),
  history.push('/')
]);

export const register = (formValues) => async (dispatch, getState) => {
  dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

  const loginReq = api.post('/users/login', formValues, timeOut);

  return loginReq
    .then(() => dispatch(actionNotify('A user already exists with this email.')))
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        const { email, password } = formValues;

        const req = api.post('/users/signup', formValues, timeOut);

        return req
          .then((res) => dispatch([
            {
              type: REGISTER
            },
            actionNotify(res.data.message)
          ]))
          .then(() => dispatch(login({ email, password })))
          .catch((err) => dispatch(errorReport(err)));
      }
      return dispatch(errorReport(error));
    });
};

export const roleSelect = (type) => (dispatch, getState) => {
  const { token, email } = getState().auth;

  dispatch(getState().load.loading === false ? actionLoad() : { type: ACTION_LOAD_AVOIDED });

  const res = api.put(
    `/users/${email}`,
    { isDeleted: false, type },
    {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 30000
    }
  );

  return res
    .then((response) => dispatch([
      {
        type: ROLE_SELECT
      },
      actionNotify(response.data.message)
    ]))
    .then(() => dispatch(userFetch()))
    .then(() => setTimeout(() => dispatch(storeCreate()), 3000))
    .catch((error) => dispatch(errorReport(error)));
};
