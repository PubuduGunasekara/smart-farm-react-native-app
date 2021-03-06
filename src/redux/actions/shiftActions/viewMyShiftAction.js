import firebase from "firebase";
import {
  LOADING,
  MY_SHIFT_DATA,
  EMPTY_RECORD,
  MY_SHIFT_ERROR,
} from "../../constants";

export const viewMyShift = ({ accessLevel, shiftDate }) => {
  console.log("from backend:", accessLevel, shiftDate);
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const db = firebase.firestore().collection("shift");
    var shift = [];
    var date = "";
    var timeTo = "";
    var timeFrom = "";
    var id = "";
    var shiftId = "";

    db.where("date", "==", `${shiftDate}`)
      .where("WorkGroupLevel", "==", `${accessLevel}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            shift = doc.data().selectedUsersList;
          });
          shift.map((item) => {
            if (item.id === firebase.auth().currentUser.uid) {
              date = item.shiftDate;
              timeFrom = item.timeFrom;
              timeTo = item.timeTo;
              id = item.id;
              shiftId = item.shiftId;
            }
          });

          if (date !== "" && timeFrom !== "" && timeTo !== "") {
            const data = {
              date,
              timeFrom,
              timeTo,
              id,
              shiftId,
            };
            console.log("show object: ", data);
            dispatch({
              type: MY_SHIFT_DATA,
              payload: data,
            });
            dispatch({
              type: MY_SHIFT_ERROR,
              payload: false,
            });
            dispatch({
              type: LOADING,
              payload: false,
            });
          } else {
            dispatch({
              type: EMPTY_RECORD,
              payload: "No Shift found for this date",
            });
            dispatch({
              type: MY_SHIFT_DATA,
              payload: "",
            });
            dispatch({
              type: MY_SHIFT_ERROR,
              payload: false,
            });
            dispatch({
              type: LOADING,
              payload: false,
            });
          }
        } else {
          dispatch({
            type: EMPTY_RECORD,
            payload: "No Shift found for this date",
          });
          dispatch({
            type: MY_SHIFT_DATA,
            payload: "",
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
          dispatch({
            type: MY_SHIFT_ERROR,
            payload: false,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });

        dispatch({
          type: MY_SHIFT_ERROR,
          payload: true,
        });
        console.log("error", err);
      });
  };
};
