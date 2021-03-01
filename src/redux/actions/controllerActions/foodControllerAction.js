import firebase from "firebase";
import {
  LOADING,
  FOOD_ON_OFF_STATUS,
  FOOD_ERROR,
  FOOD_MOTOR_DIRECTION,
  FOOD_MOTOR_SPEED,
  FOOD_CAP_STATUS,
} from "../../constants";

export const FoodControllerActionONOFF = ({ motorStopStartStatus }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref("FoodController/motorStopStartStatus/")
      .set({
        motorStopStartStatus,
      })
      .then((data) => {
        //success callback
        dispatch({
          type: LOADING,
          payload: false,
        });
        if (motorStopStartStatus === "1") {
          dispatch({
            type: FOOD_ON_OFF_STATUS,
            payload: true,
          });
        } else {
          dispatch({
            type: FOOD_ON_OFF_STATUS,
            payload: false,
          });
        }
      })
      .catch((error) => {
        //error callback
        dispatch({
          type: LOADING,
          payload: false,
        });

        dispatch({
          type: FOOD_ON_OFF_STATUS,
          payload: false,
        });
        dispatch({
          type: FOOD_ERROR,
          payload: "FOOD CONTROLLER ERROR!",
        });
        console.log("FOOD CONTROLLER ERROR!", error);
      });
  };
};

export const FoodControllerActionFORWARD_BACKWARD = ({ motorDirection }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref("FoodController/motorDirection/")
      .set({
        motorDirection,
      })
      .then((data) => {
        //success callback
        dispatch({
          type: LOADING,
          payload: false,
        });

        if (motorDirection === "1") {
          dispatch({
            type: FOOD_MOTOR_DIRECTION,
            payload: true,
          });
        } else {
          dispatch({
            type: FOOD_MOTOR_DIRECTION,
            payload: false,
          });
        }
      })
      .catch((error) => {
        //error callback
        dispatch({
          type: LOADING,
          payload: false,
        });

        dispatch({
          type: FOOD_MOTOR_DIRECTION,
          payload: false,
        });
        dispatch({
          type: FOOD_ERROR,
          payload: "FOOD CONTROLLER ERROR!",
        });

        console.log("FOOD CONTROLLER ERROR! ", error);
      });
  };
};

export const FoodControllerActionSpeedLevel = ({ motorSpeed }) => {
  return (dispatch) => {
    // dispatch({
    //   type: LOADING,
    //   payload: true,
    // });
    firebase
      .database()
      .ref("FoodController/motorSpeed/")
      .set({
        motorSpeed,
      })
      .then((data) => {
        //success callback
        // dispatch({
        //   type: LOADING,
        //   payload: false,
        // });
        dispatch({
          type: FOOD_MOTOR_SPEED,
          payload: motorSpeed,
        });
      })
      .catch((error) => {
        //error callback
        // dispatch({
        //   type: LOADING,
        //   payload: false,
        // });

        dispatch({
          type: FOOD_MOTOR_SPEED,
          payload: null,
        });
        dispatch({
          type: FOOD_ERROR,
          payload: "FOOD CONTROLLER ERROR!",
        });

        console.log("FOOD CONTROLLER ERROR! ", error);
      });
  };
};

export const FoodControllerActionCapOnOff = ({ openCloseStatus }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref("foodCap/openCloseStatus/")
      .set({
        openCloseStatus,
      })
      .then((data) => {
        //success callback
        dispatch({
          type: LOADING,
          payload: false,
        });
        if (openCloseStatus === "1") {
          dispatch({
            type: FOOD_CAP_STATUS,
            payload: true,
          });
        } else {
          dispatch({
            type: FOOD_CAP_STATUS,
            payload: false,
          });
        }
      })
      .catch((error) => {
        //error callback
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: FOOD_CAP_STATUS,
          payload: false,
        });
        dispatch({
          type: FOOD_ERROR,
          payload: "FOOD CONTROLLER ERROR!",
        });
        console.log("FOOD CONTROLLER ERROR! ", error);
      });
  };
};
