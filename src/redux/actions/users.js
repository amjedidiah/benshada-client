/* eslint-disable import/no-cycle */
import api from '../api/api.js';
import {
  USER_ONE, USERS_ALL, USER_UPDATE, USER_DELETE, USER_CHANGE_PASSWORD
} from './types/userTypes.js';
import { authLogout } from './auth.js';

export const userOne = (email) => ({
  type: USER_ONE,
  payload: api.get(`/users/${email}`)
});

export const usersAll = () => (dispatch, getState) => {
  let headers = {};

  if (!getState().auth.token) {
    headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmlkdGVlQGdtYWlsLmNvbSIsImlkIjoiNWVjM2FjOTAwYWJlMTVjMmI2MmNiYzI4IiwiZXhwIjoxNTk3MzUxNzQyLCJpYXQiOjE1OTIxNjc3NDJ9.Y-Fg4HKIZWa6dZVVqMn0nxavyjnNfjvYxIQ2SDCTjbs'
    };
  }

  dispatch({
    type: USERS_ALL,
    payload: api.get('/users', {
      headers
    })
  });
};

export const userUpdate = (email, userData) => (dispatch) => {
  const response = dispatch({
    type: USER_UPDATE,
    payload: api.put(`/users/${email}`, userData)
  });

  return response.then(() => dispatch([userOne(email), usersAll()]));
};

export const userChangePassword = (passwordData) => (dispatch) => {
  const response = dispatch({
    type: USER_CHANGE_PASSWORD,
    payload: api.post('/users/change-password', passwordData)
  });

  return response.then(() => dispatch(authLogout()));
};

export const userDelete = (email) => (dispatch) => {
  const response = dispatch({
    type: USER_DELETE,
    payload: api.delete(`/users/${email}`)
  });

  return response.then(() => dispatch(usersAll()));
};
