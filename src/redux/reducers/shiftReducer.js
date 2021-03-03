import {
  USER_LIST_SUCCESS,
  USER_LIST_ACCESS_LEVEL,
  SHIFT_ERROR,
  LOADING_MAIN,
  // USER_ID_LIST_ACCESS_LEVEL,
} from "../constants";

export const shiftReducer = (
  state = { userList: null, userIdList: null, loadingShift: false },
  action
) => {
  switch (action.type) {
    case USER_LIST_ACCESS_LEVEL:
      return {
        ...state,
        userList: action.payload,
      };
    // case USER_ID_LIST_ACCESS_LEVEL:
    //   return {
    //     ...state,
    //     userIdList: action.payload,
    //   };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        userListSuccess: action.payload,
      };
    case SHIFT_ERROR:
      return {
        ...state,
        userListError: action.payload,
      };
    case LOADING_MAIN:
      return {
        ...state,
        loadingShift: action.payload,
      };
    default:
      return state;
  }
};
