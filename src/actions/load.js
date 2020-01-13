import { ACTION_LOAD, ACTION_NOTIFY, ACTION_DONE } from "./types";

export const errorReport = error =>
  actionNotify(
    (error.response &&
      error.response.data.message &&
      error.response.data.message.name) ||
      error.message
  );

export const actionLoad = () => ({
  type: ACTION_LOAD
});

export const actionNotify = payload => ({
  type: ACTION_NOTIFY,
  payload
});

export const actionDone = () => ({
  type: ACTION_DONE
});
