import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { loadinReducer } from "./loadingReducer";
import { controllerReducer } from "./controllerReducers";

const Reducers = combineReducers({
  userReducer,
  adminReducer,
  loadinReducer,
  controllerReducer,
});

export default Reducers;
