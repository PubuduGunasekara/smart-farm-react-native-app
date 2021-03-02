import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { loadinReducer } from "./loadingReducer";
import { controllerReducer } from "./controllerReducers";
import { shiftReducer } from "./shiftReducer";

const Reducers = combineReducers({
  userReducer,
  adminReducer,
  loadinReducer,
  controllerReducer,
  shiftReducer,
});

export default Reducers;
