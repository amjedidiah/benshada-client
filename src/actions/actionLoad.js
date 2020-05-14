import { ERROR } from "./actionTypes";

export const actionErrorAdd = (error) => ({
  type: ERROR.ERROR_ADD,
  error:
    (error && error.response && error.response.message) ||
    (error && error.message),
});
