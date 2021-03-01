import { LOADING } from "../constants";

export const loadinReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
