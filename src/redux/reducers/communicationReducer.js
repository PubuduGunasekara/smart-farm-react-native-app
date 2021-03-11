import {
  MESSAGE_ADMIN_ERROR,
  ADMIN_MESSAGES,
  USER_MESSAGES,
} from "../constants";

export const communicationReducer = (
  state = { adminMessages: [], userMessages: [] },
  action
) => {
  switch (action.type) {
    case MESSAGE_ADMIN_ERROR:
      return {
        ...state,
        messageAdminError: action.payload,
      };

    case ADMIN_MESSAGES:
      return {
        ...state,
        adminMessages: action.payload,
      };

    case USER_MESSAGES:
      return {
        ...state,
        userMessages: action.payload,
      };

    default:
      return state;
  }
};
