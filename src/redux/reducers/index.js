import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { loadinReducer } from "./loadingReducer";
import { controllerReducer } from "./controllerReducers";
import { shiftReducer } from "./shiftReducer";
import { notificationsReducer } from "./notificationsReducer";
import { activityReducer } from "./activityReducer";
import { communicationReducer } from "./communicationReducer";

const Reducers = combineReducers({
  userReducer,
  adminReducer,
  loadinReducer,
  controllerReducer,
  shiftReducer,
  notificationsReducer,
  activityReducer,
  communicationReducer,
});

export default Reducers;
