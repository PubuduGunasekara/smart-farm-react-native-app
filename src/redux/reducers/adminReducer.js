import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_REGISTER_ERROR,
  USER_REGISTER_SUCCESS,
  GET_USER_REQUEST,
  USER_REQUEST_REVIEW_EMPTY,
  APPROVE_SUCCESS,
  ERROR_USER_REQUEST,
  DELETE_SUCCESS,
  VIEW_ALL_USER,
  View_USERS_EMPTY,
  INCIDENT_LIST,
  INCIDENT_ADMIN_LIST,
} from "../constants";

export const adminReducer = (
  state = {
    requestEmpty: false,
    approveSuccess: false,
    useRequestError: false,
    deleteSuccess: false,
    userEmpty: false,
    user: "",
    incidentList: "",
    usersList: [],
  },

  action
) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        usersList: action.payload,
      };
    case APPROVE_SUCCESS:
      return {
        ...state,
        approveSuccess: action.payload,
      };
    case ERROR_USER_REQUEST:
      return {
        ...state,
        useRequestError: action.payload,
      };
    case USER_REQUEST_REVIEW_EMPTY:
      return {
        ...state,
        requestEmpty: action.payload,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: action.payload,
      };
    case VIEW_ALL_USER:
      return {
        ...state,
        viewUserList: action.payload,
      };

    case View_USERS_EMPTY:
      return {
        ...state,
        userEmpty: action.payload,
      };

    case INCIDENT_ADMIN_LIST:
      return { ...state, incidentList: action.payload };
    default:
      return state;
  }
};
