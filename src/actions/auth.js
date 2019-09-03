import api from "../apis/api";
import { LOGIN, REGISTER, LOGOUT, ROLE, UPDATE_USER } from "./types";
import history from "../history";

export const validateLogin = formValues => {
  api
    .post(`/users/login`, formValues)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
    .finally(console.log("end"));
};

export const login = formValues => async (dispatch, getState) => {
  try {
    const response = await api.post(`/users/login`, formValues);

    dispatch({
      type: LOGIN,
      payload: response.data
    });
  } catch (error) {
    return error;
  }
};

export const logout = () => async dispatch => {
  await dispatch({
    type: LOGOUT
  });

  history.push("/");
};

export const register = formValues => async dispatch => {
  try {
    const response = await api.post(`/users/signup`, formValues);

    dispatch({
      type: REGISTER,
      payload: response.data
    });
  } catch (error) {
    return error;
  }
};

export const selectRole = type => async (dispatch, getState) => {
  let { user } = getState().auth;
  await api.put(
    `/users/${user.email}`,
    { isDeleted: false, type },
    {
      headers: { Authorization: "Bearer " + user.token }
    }
  );

  user = { ...user, type };

  dispatch({
    type: ROLE,
    payload: user
  });
};

export const updateUser = formValues => async (dispatch, getState) => {
  let {user} = getState().auth;

  try {
    const response = await api.put(`/users/${user.email}`, formValues, {
      headers: { Authorization: "Bearer " + user.token }
    });

    user = { ...user, ...formValues }

    dispatch({
      type: UPDATE_USER,
      payload: user
    });
    return response.data.message
  } catch (error) {
    return error;
  }
};
