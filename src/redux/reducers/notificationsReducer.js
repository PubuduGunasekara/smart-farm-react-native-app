import { NOTOFICATIONS } from "../constants";

export const notificationsReducer = (
  state = { userNotifications: [] },
  action
) => {
  switch (action.type) {
    case NOTOFICATIONS:
      return {
        ...state,
        userNotifications: action.payload,
      };

    default:
      return state;
  }
};
