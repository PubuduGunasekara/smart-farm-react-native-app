import { USER_SAVE_SUCCESS, USER_SAVE_ERROR, USER_UPDATE } from "../constants";

const INITIAL_STATE = {
  user_save: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case USER_UPDATE:
    //   //action.payload: {prop:'name', value:'jane'} //key interprelation
    //   return { ...state, [action.payload.prop]: action.payload.value };

    case USER_SAVE_SUCCESS:
      return { user_save: action.payload };

    default:
      return state;
  }
};
