import api from "../apis/api";
import { PRODUCT_UPLOAD } from "./types";
import { USER_UPDATE } from "./types";
import { actionLoad, actionNotify } from "./load";
import history from "../history";

export const userUpdateStore = formValues => async (dispatch, getState) => {
  let { user } = getState().auth,
    { store } = user;

  try {
    await dispatch(actionLoad());
    const res = await api.put(`/shops/${store._id}`, formValues, {
      headers: { Authorization: "Bearer " + user.token }
    });

    user.store = { ...store, ...formValues };

    await dispatch([
      {
        type: USER_UPDATE,
        payload: user
      },
      actionNotify(res.data.message)
    ]);
    
    history.push("/user");
  } catch (error) {
    dispatch(actionNotify(error.response.data.message || error.message));
  }
};

export const userUpdateProfile = formValues => async (dispatch, getState) => {
  let { user } = getState().auth;

  try {
    await dispatch(actionLoad());
    const res = await api.put(`/users/${user.email}`, formValues, {
      headers: { Authorization: "Bearer " + user.token }
    });

    user = { ...user, ...formValues };

    dispatch([
      {
        type: USER_UPDATE,
        payload: user
      },
      userUpdateStore({
        name: `${user.name}'s Store`,
        description: `This is ${user.name}'s Store`
      }),
      actionNotify(res.data.message)
    ]);
  } catch (error) {
    dispatch(actionNotify(error.response.data.message || error.message));
  }
};

export const productUpload = formValues => async (dispatch, getState) => {
  let user = getState().auth.user,
    price = (country => {
      switch (country) {
        case "Nigeria":
          return formValues.price * 0.0028;
        case "Ghana":
          return formValues.price * 0.18;
        default:
          return formValues.price;
      }
    })(user.country),
    product = { ...formValues, price, shop: user._id };
  console.log(user._id, "me");

  try {
    const response = await api.post(`/products`, product, {
      headers: { Authorization: "Bearer " + user.token }
    });
  } catch (error) {
    return error;
  }
};
