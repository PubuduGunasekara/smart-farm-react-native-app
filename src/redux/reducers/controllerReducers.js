import {
  FOOD_ON_OFF_STATUS,
  FOOD_ERROR,
  FOOD_MOTOR_DIRECTION,
  FOOD_MOTOR_SPEED,
  CLEANING_ON_OFF_STATUS,
  CLEANING_ERROR,
  CLEANING_MOTOR_DIRECTION,
  CLEANING_MOTOR_SPEED,
  FOOD_CAP_STATUS,
  GATE_OPEN_CLOSE_STATUS,
  GATE_ERROR,
  WATER_OPEN_CLOSE_STATUS,
  WATER_ERROR,
} from "../constants";

export const controllerReducer = (
  state = {
    cleanin_controller_on: false,
    motor_speed_status: "1",
    food_controller_on_off_status: false,
    food_cap_status: false,
    gate_open_close_status: false,
    water_open_close_status: false,
  },
  action
) => {
  switch (action.type) {
    case CLEANING_ON_OFF_STATUS:
      return {
        ...state,
        cleanin_controller_on_off_status: action.payload,
      };
    case CLEANING_MOTOR_DIRECTION:
      return {
        ...state,
        motor_direction_status: action.payload,
      };
    case CLEANING_MOTOR_SPEED:
      return {
        ...state,
        motor_speed_status: action.payload,
      };
    case CLEANING_ERROR:
      return {
        state,
        cleaning_error: action.payload,
      };

    case FOOD_ON_OFF_STATUS:
      return {
        ...state,
        food_controller_on_off_status: action.payload,
      };
    case FOOD_MOTOR_DIRECTION:
      return {
        ...state,
        motor_direction_status: action.payload,
      };
    case FOOD_MOTOR_SPEED:
      return {
        ...state,
        motor_speed_status: action.payload,
      };
    case FOOD_CAP_STATUS:
      return {
        ...state,
        food_cap_status: action.payload,
      };
    case FOOD_ERROR:
      return {
        state,
        food_error: action.payload,
      };

    case GATE_OPEN_CLOSE_STATUS:
      return {
        ...state,
        gate_open_close_status: action.payload,
      };
    case GATE_ERROR:
      return {
        ...state,
        gate_error: action.payload,
      };

    case WATER_OPEN_CLOSE_STATUS:
      return {
        ...state,
        water_open_close_status: action.payload,
      };
    case WATER_ERROR:
      return {
        ...state,
        water_error: action.payload,
      };
    default:
      return state;
  }
};
