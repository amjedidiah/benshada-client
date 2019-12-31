import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import authReducer from "./authReducer";
import loadReducer from "./loadReducer";
import storeReducer from "./storeReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  auth: authReducer,
  store: storeReducer,
  order: orderReducer,
  form: reduxFormReducer,
  load: loadReducer
});
