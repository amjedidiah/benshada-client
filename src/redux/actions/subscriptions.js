import api from '../../api/api.js';
import {
  SUBSCRIPTIONS_ALL,
  SUBSCRIPTION_ADD,
  SUBSCRIPTION_REMOVE
} from './types/subscriptionTypes.js';

export const subscriptionsAll = () => (dispatch, getState) => {
  const { token } = getState().auth;
  let headers = {};

  if (!token) {
    headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmlkdGVlQGdtYWlsLmNvbSIsImlkIjoiNWVjM2FjOTAwYWJlMTVjMmI2MmNiYzI4IiwiZXhwIjoxNTk3MzUxNzQyLCJpYXQiOjE1OTIxNjc3NDJ9.Y-Fg4HKIZWa6dZVVqMn0nxavyjnNfjvYxIQ2SDCTjbs'
    };
  }

  return {
    type: SUBSCRIPTIONS_ALL,
    payload: api.get('/subscriptions', {
      headers
    })
  };
};

export const subscriptionAdd = (userData) => (dispatch) => {
  const response = dispatch({
    type: SUBSCRIPTION_ADD,
    payload: api.post('/subscriptions', userData)
  });

  return response.then(() => dispatch(subscriptionsAll()));
};

export const subscriptionRemove = (userData) => (dispatch) => {
  const response = dispatch({
    type: SUBSCRIPTION_REMOVE,
    payload: api.delete(`/subscriptions/${userData.email}`, userData)
  });

  return response.then(() => dispatch(subscriptionsAll()));
};
