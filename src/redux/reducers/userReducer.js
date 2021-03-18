import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_REGISTER_ERROR,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FALSE,
} from "../constants";

export const userReducer = (
  state = { user: null, user_not_exist: false },
  action
) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        state,
        loginError: action.payload,
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: action.payload,
      };

    case USER_LOGIN_FALSE:
      return {
        ...state,
        user_not_exist: action.payload,
      };
    default:
      return state;
  }
};
