import { CREATE_USER_SUCCESS, CREATE_USER_ERROR } from "../constants";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return { ...state, CreateUserSuccess: action.payload };

    case CREATE_USER_ERROR:
      return {
        ...state,
        createUserError: action.payload,
      };

    default:
      return state;
  }
};
