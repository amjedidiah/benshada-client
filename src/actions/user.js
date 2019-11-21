import api from "../apis/api";
import { PRODUCT_UPLOAD } from "./types";
import history from "../history";

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
