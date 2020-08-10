import api from '../api/api.js';
import {
  TRANSACTIONS_ALL,
  TRANSACTION_UPDATE,
  TRANSACTION_DELETE,
  TRANSACTIONS_ONE,
  TRANSACTIONS_ONE_SELECTED,
  TRANSACTION_ADD
} from './types/transactionTypes.js';

export const transactionsAll = () => ({ type: TRANSACTIONS_ALL, payload: api.get('/transactions/') });

export const transactionAdd = (data) => (dispatch) => {
  const response = dispatch({
    type: TRANSACTION_ADD,
    payload: api.post('/transactions', data)
  });

  return response.then(() => dispatch(transactionsAll()));
};

export const transactionsOne = (id) => ({
  type: TRANSACTIONS_ONE,
  payload: api.get(`/transactions/${id}`)
});

export const transactionUpdate = (id, transactionData) => (dispatch) => {
  const response = dispatch({
    type: TRANSACTION_UPDATE,
    payload: api.put(`/transactions/${id}`, transactionData)
  });

  return response.then(() => dispatch([transactionsOne(id), transactionsAll()]));
};

export const transactionDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: TRANSACTION_DELETE,
    payload: api.delete(`/transactions/${id}`)
  });

  return response.then(() => dispatch(transactionsAll()));
};

export const transactionsOneSelected = (payload) => ({
  type: TRANSACTIONS_ONE_SELECTED,
  payload
});
