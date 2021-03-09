import firebase from "firebase";
import { LOADING, SHIFT_DATE_CHECKER, SHIFT_EXIST } from "../../constants";

export const CheckShiftDate = ({ shiftDate }) => {
  return (dispatch) => {
    const user = [];
    console.log("shiftDate", shiftDate);
    dispatch({
      type: LOADING,
      payload: true,
    });

    const db = firebase.firestore().collection("shiftDateCheker");
    db.where("shiftDate", "==", `${shiftDate}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            if (doc.data().userId === firebase.auth().currentUser.uid) {
              user.push({
                shiftId: doc.data().shiftId,
                shiftDate: doc.data().shiftDate,
              });
            }
          });

          dispatch({
            type: SHIFT_DATE_CHECKER,
            payload: user,
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
        } else {
          dispatch({
            type: SHIFT_DATE_CHECKER,
            payload: user,
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
          console.log("No records found");
        }
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("shift error from list shifts", err);
      });
  };
};

export const CheckShiftExist = ({ shiftDate, WorkGroupLevel }) => {
  return (dispatch) => {
    var flag = false;
    console.log("shiftDate", shiftDate);
    dispatch({
      type: LOADING,
      payload: true,
    });

    const db = firebase.firestore().collection("shift");
    db.where("date", "==", `${shiftDate}`)
      .where("WorkGroupLevel", "==", `${WorkGroupLevel}`)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot) {
          documentSnapshot.forEach((doc) => {
            if (doc.data().WorkGroupLevel === WorkGroupLevel) {
              flag = true;
            } else {
              flag = false;
            }
          });
          console.log("its true", flag);
          dispatch({
            type: SHIFT_EXIST,
            payload: flag,
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
        } else {
          console.log("its false");
          dispatch({
            type: SHIFT_EXIST,
            payload: false,
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
          console.log("No records found");
        }
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("shift error from list shifts", err);
      });
  };
};

export const CheckShiftExist_setFalse = () => {
  return (dispatch) => {
    console.log("false");
    dispatch({
      type: SHIFT_EXIST,
      payload: false,
    });
  };
};
