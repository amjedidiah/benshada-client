import api from '../../api/api.js';
import { LOGIN, LOGOUT, SIGNUP } from './types/authTypes.js';
import { userOne } from './users.js';

export const authLogin = (payload) => (dispatch) => {
  const response = dispatch({
    type: LOGIN,
    payload: api.post('/users/login', payload)
  });

  return response.then(() => dispatch(userOne(payload.email)));
};

export const authSignup = (payload) => (dispatch) => {
  const response = dispatch({
    type: SIGNUP,
    payload: api.post('/users/signup', payload)
  });

  return response
    .then(() => dispatch(authLogin({ email: payload.email, password: payload.password })));
};

export const authLogout = () => ({
  type: LOGOUT
});
