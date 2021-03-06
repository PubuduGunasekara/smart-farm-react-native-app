import {
  USER_LIST_SUCCESS,
  USER_LIST_ACCESS_LEVEL,
  SHIFT_ERROR,
  LOADING_MAIN,
  MY_SHIFT_DATA,
  EMPTY_RECORD,
  MY_SHIFT_ERROR,
  SHIFT_REQUEST_ERROR,
  SHIFT_REQUEST_MESSAGE,
  REQUEST_MESSAGES_FOR_ADMIN,
  DELETE_SUCCESS_SHIFT_MESSAGE,
  REQUEST_MESSAGES_SUCCESS,
  SHIFT_DETAILS_FOR_MODIFY,
  USER_LIST_FOR_SHIFT_UPDATE,
  SHIFT_MODIFY_UPDATE_STATUS,
  // USER_ID_LIST_ACCESS_LEVEL,
} from "../constants";

export const shiftReducer = (
  state = {
    userList: null,
    userIdList: null,
    loadingShift: false,
    shiftRequestMessagesDelete: [],
    userListForShiftUpdate: [],
  },
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

    case MY_SHIFT_DATA:
      return {
        ...state,
        myShiftData: action.payload,
      };
    case EMPTY_RECORD:
      return {
        ...state,
        myShiftEmpty: action.payload,
      };
    case MY_SHIFT_ERROR:
      return {
        ...state,
        myShiftError: action.payload,
      };

    case SHIFT_REQUEST_ERROR:
      return {
        ...state,
        shiftRequestError: action.payload,
      };
    case SHIFT_REQUEST_MESSAGE:
      return {
        ...state,
        shiftRequestMessage: action.payload,
      };

    case REQUEST_MESSAGES_FOR_ADMIN:
      return {
        ...state,
        shiftRequestMessagesForAdmin: action.payload,
      };

    case DELETE_SUCCESS_SHIFT_MESSAGE:
      return {
        ...state,
        shiftRequestMessagesDelete: action.payload,
      };

    case REQUEST_MESSAGES_SUCCESS:
      return {
        ...state,
        shiftRequestMessagesSuccess: action.payload,
      };

    case SHIFT_DETAILS_FOR_MODIFY:
      return {
        ...state,
        shiftDetailsForEdit: action.payload,
      };

    case USER_LIST_FOR_SHIFT_UPDATE:
      return {
        ...state,
        userListForShiftUpdate: action.payload,
      };

    case SHIFT_MODIFY_UPDATE_STATUS:
      return {
        ...state,
        shiftModifyUpdate: action.payload,
      };

    default:
      return state;
  }
};
