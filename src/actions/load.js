import { LOAD_FORM, DONE_FORM } from "./types";

export const loadForm = () => {
  return {
    type: LOAD_FORM
  };
};
export const doneForm = () => {
  return {
    type: DONE_FORM
  };
};
