import firebase from "firebase";
import { LOADING, WATER_OPEN_CLOSE_STATUS, WATER_ERROR } from "../../constants";

export const WaterControllerActionOPENCLOSE = ({ openStatus }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref("waterTap/openStatus/")
      .set({
        openStatus,
      })
      .then((data) => {
        //success callback
        dispatch({
          type: LOADING,
          payload: false,
        });
        if (openStatus === "1") {
          dispatch({
            type: WATER_OPEN_CLOSE_STATUS,
            payload: true,
          });
        } else {
          dispatch({
            type: WATER_OPEN_CLOSE_STATUS,
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
          type: WATER_OPEN_CLOSE_STATUS,
          payload: false,
        });
        dispatch({
          type: WATER_ERROR,
          payload: "WATER ERROR ERROR!",
        });
        console.log("WATER ERROR!", error);
      });
  };
};
