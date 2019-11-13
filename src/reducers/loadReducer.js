import { LOAD_FORM, DONE_FORM } from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  bgColor: "rgba(239, 147, 46, 0.6)",
  spinnerColor: "#fff"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FORM:
      return { ...state, loading: true };
    case DONE_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
};
