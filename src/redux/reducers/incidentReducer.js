import { INCIDENT_SUCCESS, INCIDENT_ERROR, INCIDENT_LIST } from "../constants";

const INITIAL_STATE = {
  message: "",
  issuetype: "",
  // incident: "",
  incidentList: "",
  incidentSuccess: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCIDENT_SUCCESS:
      return { ...state, incidentSuccess: action.payload };
    case INCIDENT_LIST:
      return { ...state, incidentList: action.payload };

    case INCIDENT_ERROR:
      return {
        ...state,
        incidentError: action.payload,
      };
    default:
      return state;
  }
};
