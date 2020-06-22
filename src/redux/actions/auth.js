import api from '../../api/api.js';
import { LOGIN, LOGOUT, SIGNUP } from './types/authTypes.js';
import { userOne } from './user.js';

export const authSignup = (payload) => ({
  type: SIGNUP,
  payload: api.post('/users/login', payload)
});

export const authLogin = (payload) => (dispatch) => {
  const response = dispatch({
    type: LOGIN,
    payload: api.post('/users/login', payload)
  });

  return response.then(() => dispatch(userOne(payload.email)));
};

export const authLogout = () => ({
  type: LOGOUT
});
