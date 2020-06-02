import api from '../../api/api.js';
import { LOGIN, LOGOUT, SIGNUP } from './types/authTypes.js';

export const authSignup = (payload) => ({
  type: SIGNUP,
  payload: api.post('/users/login', payload)
});

export const authLogin = (payload) => ({
  type: LOGIN,
  payload: api.post('/users/login', payload)
});

export const authLogout = () => ({
  type: LOGOUT
});
