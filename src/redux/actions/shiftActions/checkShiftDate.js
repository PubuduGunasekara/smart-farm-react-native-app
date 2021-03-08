import firebase from "firebase";
import { LOADING, SHIFT_DATE_CHECKER } from "../../constants";

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
