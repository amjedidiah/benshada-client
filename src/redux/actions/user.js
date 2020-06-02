import api from '../../api/api.js';
import { USER_ONE, USERS_ALL } from './types/userTypes.js';

export const userOne = (email) => ({
  type: USER_ONE,
  payload: api.get(`/users/${email}`)
});

export const usersAll = () => ({
  type: USERS_ALL,
  payload: api.get('/users')
});
