import firebase from "firebase";
import {
  LOADING,
  CLEANING_ON_OFF_STATUS,
  CLEANING_ERROR,
  CLEANING_MOTOR_DIRECTION,
  CLEANING_MOTOR_SPEED,
} from "../../constants";

export const CleaningControllerActionONOFF = ({ motorStopStartStatus }) => {
  return (dispatch) => {
    console.log("action status ", motorStopStartStatus);
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref("CleaningController/motorStopStartStatus/")
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
            type: CLEANING_ON_OFF_STATUS,
            payload: true,
          });
        } else {
          dispatch({
            type: CLEANING_ON_OFF_STATUS,
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
          type: CLEANING_ON_OFF_STATUS,
          payload: false,
        });
        dispatch({
          type: CLEANING_ERROR,
          payload: "CLEANING CONTROLLER ERROR!",
        });

        console.log("error ", error);
      });
  };
};

export const CleaningControllerActionFORWARD_BACKWARD = ({
  motorDirection,
}) => {
  return (dispatch) => {
    console.log("motorDirection: ", motorDirection);
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref("CleaningController/motorDirection/")
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
            type: CLEANING_MOTOR_DIRECTION,
            payload: true,
          });
        } else {
          dispatch({
            type: CLEANING_MOTOR_DIRECTION,
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
          type: CLEANING_MOTOR_DIRECTION,
          payload: false,
        });
        dispatch({
          type: CLEANING_ERROR,
          payload: "CLEANING CONTROLLER ERROR!",
        });

        console.log("error ", error);
      });
  };
};

export const CleaningControllerActionSpeedLevel = ({ motorSpeed }) => {
  return (dispatch) => {
    console.log("motorSpeed: ", motorSpeed);
    // dispatch({
    //   type: LOADING,
    //   payload: true,
    // });
    firebase
      .database()
      .ref("CleaningController/motorSpeed/")
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
          type: CLEANING_MOTOR_SPEED,
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
          type: CLEANING_MOTOR_SPEED,
          payload: null,
        });
        dispatch({
          type: CLEANING_ERROR,
          payload: "CLEANING CONTROLLER ERROR!",
        });

        console.log("error ", error);
      });
  };
};
