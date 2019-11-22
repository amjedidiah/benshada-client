import api from "../apis/api";
import axios from "axios" 
import { LOGIN, REGISTER, LOGOUT, ROLE, USER_UPDATE } from "./types";
import history from "../history";

export const login = formValues => dispatch =>
  api
    .post(`/users/login`, formValues)
    .then(res =>
      dispatch({
        type: LOGIN,
        payload: res.data
      })
    )
    .catch(error => error.response.data.message || error.message);

export const logout = () => async dispatch => {
  try {
    await dispatch({
      type: LOGOUT
    });

    history.push("/");
  } catch (e) {
    return e.message;
  }
};

export const register = formValues => dispatch =>
  api
    .post(`/users/signup`, formValues)
    .then(res =>
      dispatch({
        type: REGISTER,
        payload: res.data
      })
    )
    .catch(error => error.response.data.message || error.message);

export const selectRole = type => async (dispatch, getState) => {
  let { user } = getState().auth;

  const updateType = (user, type) =>
    api.put(
      `/users/${user.email}`,
      { isDeleted: false, type },
      {
        headers: { Authorization: "Bearer " + user.token }
      }
    );

  const createStore = (user, type) => {
    return type !== "c"
      ? api.post(
          `/shops`,
          {
            name: `${user.name} Store`,
            description: `This is a store by ${user.name}`,
            user: user._id
          },
          {
            headers: { Authorization: "Bearer " + user.token }
          }
        )
      : "";
  };

  axios
    .all([updateType(user, type), createStore(user, type)])
    .then(
      axios.spread((acct, storeRes) => {
        user.type = type;

        user.store = type !== "c" ? storeRes.data.data : undefined;

        dispatch({
          type: ROLE,
          payload: user
        });
      })
    )
    .catch(error => error.response.data.message || error.message);
};

// export const selectRole = type => async (dispatch, getState) => {
//   let { user } = getState().auth;

//   await api.put(
//     `/users/${user.email}`,
//     { isDeleted: false, type },
//     {
//       headers: { Authorization: "Bearer " + user.token }
//     }
//   );

//   user = { ...user, type };

//   if (type !== "c") {
//     let store = {
//       name: `store${user._id}`,
//       description: "I am a new Benshada store",
//       user: user._id
//     };

//     let storeResp = await api.post(`/shops`, store, {
//       headers: { Authorization: "Bearer " + user.token }
//     });

//     user.store = storeResp.data.data;
//   }

//   dispatch({
//     type: ROLE,
//     payload: user
//   });
// };

export const userUpdateProfile = formValues => (dispatch, getState) => {
  let { user } = getState().auth;

  api
    .put(`/users/${user.email}`, formValues, {
      headers: { Authorization: "Bearer " + user.token }
    })
    .then(res => {
      user = { ...user, ...formValues };

      dispatch({
        type: USER_UPDATE,
        payload: user
      });
    })
    .catch(error => error.response.data.message || error.message);
};
