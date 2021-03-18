import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { loadinReducer } from "./loadingReducer";
import { controllerReducer } from "./controllerReducers";
import { shiftReducer } from "./shiftReducer";
import { notificationsReducer } from "./notificationsReducer";
import { activityReducer } from "./activityReducer";
import { communicationReducer } from "./communicationReducer";

import EmployeeReducer from "./EmployeeReducer";
import CreateUserReducer from "./CreateUserReducer";
import EditUserReducer from "./EditUserReducer";
import IncidentReducer from "./incidentReducer";

const Reducers = combineReducers({
  userReducer,
  adminReducer,
  loadinReducer,
  controllerReducer,
  shiftReducer,
  notificationsReducer,
  activityReducer,
  communicationReducer,

  //phase 2
  employee: EmployeeReducer,
  CreateUserReducer: CreateUserReducer,
  editUserReducer: EditUserReducer,
  incidentReducer: IncidentReducer,
});

export default Reducers;
