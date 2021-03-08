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
  SHIFT_DATE_CHECKER,
  USER_LIST_DATE_CHECK,
  LIST_DATE_CHECK_IDS,
  USER_LIST_LOADING_SUCCESS,
  USER_LIST_DATE_CHECK_LOADING_SUCCESS,
  // USER_ID_LIST_ACCESS_LEVEL,
} from "../constants";

export const shiftReducer = (
  state = {
    userList: null,
    userIdList: null,
    loadingShift: false,
    shiftRequestMessagesDelete: [],
    userListForShiftUpdate: [],
    userListDateCheckLoadingSuccessStatus: false,
    userListLoadingSuccessStatus: false,
  },
  action
) => {
  switch (action.type) {
    //check shift date status
    case SHIFT_DATE_CHECKER:
      return {
        ...state,
        shiftDateStatus: action.payload,
      };

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

    case USER_LIST_DATE_CHECK:
      return {
        ...state,
        userListDateCheck: action.payload,
      };

    case LIST_DATE_CHECK_IDS:
      return {
        ...state,
        listDateCheckIds: action.payload,
      };

    case USER_LIST_LOADING_SUCCESS:
      return {
        ...state,
        userListLoadingSuccessStatus: action.payload,
      };

    case USER_LIST_DATE_CHECK_LOADING_SUCCESS:
      return {
        ...state,
        userListDateCheckLoadingSuccessStatus: action.payload,
      };

    default:
      return state;
  }
};
