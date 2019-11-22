import { FORM_LOAD, FORM_DONE, FORM_ERROR } from "./types";

export const formLoad = () => {
  return {
    type: FORM_LOAD
  };
};
export const formDone = () => {
  return {
    type: FORM_DONE
  };
};
export const formError = payload => {
  return {
    type: FORM_ERROR,
    payload
  };
};
