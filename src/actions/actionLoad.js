import { ERROR } from './actionTypes.js';

export const actionErrorAdd = (error) => ({
  type: ERROR.ERROR_ADD,
  error: (error && error.response && error.response.message) || (error && error.message)
});

export const actionErrRemove = () => {};
