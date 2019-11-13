import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import authReducer from "./authReducer";
import loadReducer from "./loadReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  load: loadReducer
});
