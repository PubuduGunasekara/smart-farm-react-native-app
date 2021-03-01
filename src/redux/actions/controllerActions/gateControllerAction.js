import firebase from "firebase";
import { LOADING, GATE_OPEN_CLOSE_STATUS, GATE_ERROR } from "../../constants";

export const GateControllerActionOOPENCLOSE = ({ openStatus }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .database()
      .ref("gateController/openStatus/")
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
            type: GATE_OPEN_CLOSE_STATUS,
            payload: true,
          });
        } else {
          dispatch({
            type: GATE_OPEN_CLOSE_STATUS,
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
          type: GATE_OPEN_CLOSE_STATUS,
          payload: false,
        });
        dispatch({
          type: GATE_ERROR,
          payload: "GATE ERROR ERROR!",
        });
        console.log("GATE_ERROR ERROR!", error);
      });
  };
};
