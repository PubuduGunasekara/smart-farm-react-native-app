import {
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_UPDATE,
} from "../constants";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  user: null,
  accessLevel: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_FETCH_SUCCESS:
      // console.log(action);
      return action.payload;
    case EMPLOYEE_CREATE:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case EMPLOYEE_UPDATE:
      //action.payload: {prop:'name', value:'jane'} //key interprelation
      return { ...state, [action.payload.prop]: action.payload.value };

    case EMPLOYEE_SAVE_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
