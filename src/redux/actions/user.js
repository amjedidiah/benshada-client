import api from '../../api/api.js';
import {
  USER_ONE, USERS_ALL, USER_UPDATE, USER_DELETE
} from './types/userTypes.js';

export const userOne = (email) => ({
  type: USER_ONE,
  payload: api.get(`/users/${email}`)
});

export const usersAll = () => ({
  type: USERS_ALL,
  payload: api.get('/users')
});

export const userUpdate = (email, userData) => (dispatch) => {
  const response = dispatch({
    type: USER_UPDATE,
    payload: api.put(`/users/${email}`, userData)
  });

  return response.then(() => dispatch(userOne(email)));
};

export const userDelete = (email) => (dispatch) => {
  const response = dispatch({
    type: USER_DELETE,
    payload: api.delete(`/users/${email}`)
  });

  return response.then(() => dispatch(usersAll()));
};
