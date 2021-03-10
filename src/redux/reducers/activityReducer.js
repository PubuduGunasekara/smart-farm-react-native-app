import { ACTIVITY_ERROR, MY_ACTIVITIES, ALL_ACTIVITIES } from "../constants";

export const activityReducer = (
  state = { myActivities: [], allActivities: [] },
  action
) => {
  switch (action.type) {
    case ACTIVITY_ERROR:
      return {
        ...state,
        activityError: action.payload,
      };
    case MY_ACTIVITIES:
      return {
        ...state,
        myActivities: action.payload,
      };
    case ALL_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };

    default:
      return state;
  }
};
