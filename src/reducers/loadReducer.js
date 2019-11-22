import { FORM_LOAD, FORM_DONE, FORM_ERROR } from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  bgColor: "rgba(239, 147, 46, 0.6)",
  spinnerColor: "#fff",
  message: null,
  show: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_LOAD:
      return { ...state, loading: true, show: false };
    case FORM_DONE:
      return { ...state, loading: false, message: null, show: false };
    case FORM_ERROR:
      return { ...state, loading: false, message: action.payload, show: true };
    default:
      return state;
  }
};
