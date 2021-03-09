import firebase from "firebase";
import { LOADING, ALL_SHIFT_DATA, ALL_SHIFT_ERROR } from "../../constants";

export const ViewAllShift = ({ shiftDate }) => {
  console.log("from backend:", shiftDate);
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const db = firebase.firestore().collection("shift");
    const shift = [];

    db.where("date", "==", `${shiftDate}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            shift.push({
              shiftId: doc.id,
              shiftDate: doc.data().date,
              timeFrom: doc.data().timeFrom,
              timeTo: doc.data().timeTo,
              accessLevel: doc.data().WorkGroupLevel,
              selectedUsersList: doc.data().selectedUsersList,
            });
          });
          dispatch({
            type: ALL_SHIFT_DATA,
            payload: shift,
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
        } else {
          dispatch({
            type: LOADING,
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
          type: ALL_SHIFT_ERROR,
          payload: true,
        });
        console.log("ALL SHIFT error", err);
      });
  };
};
