import {
  SHIFT_REQUEST_ERROR,
  SHIFT_REQUEST_MESSAGE,
  LOADING,
  DELETE_SUCCESS_SHIFT_MESSAGE,
} from "../../constants";
import firebase from "firebase";

export const RequestShiftChangeAction = ({
  currentUser,
  shiftId,
  timeFrom,
  timeTo,
  shiftDate,
  reason,
}) => {
  return (dispatch) => {
    console.log("shift id", shiftId, reason);
    dispatch({
      type: LOADING,
      payload: true,
    });
    var currentUserid = firebase.auth().currentUser.uid;
    var firstName = currentUser.firstName;
    var lastName = currentUser.lastName;
    var accessLevel = currentUser.accessLevel;

    var day = shiftDate.getDate(); //change theese values
    var month = shiftDate.getMonth() + 1;
    var year = shiftDate.getFullYear();

    var shiftDateForModify = day + "-" + month + "-" + year;

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const db = firebase.firestore();
    const data = {
      shiftId,
      currentUserid,
      firstName,
      lastName,
      accessLevel,
      timeFrom,
      timeTo,
      shiftDate: shiftDateForModify,
      reason,
      createdAt: timestamp,
    };

    console.log(data);

    db.collection("shiftRequestMessages")
      .add(data)
      .then((data) => {
        dispatch({
          type: SHIFT_REQUEST_MESSAGE,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: SHIFT_REQUEST_ERROR,
          payload: error,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("SHIFT REQUEST ERROR: ", error);
      });
  };
};

export const deleteShiftMessage = ({ id }) => {
  return (dispatch) => {
    const db = firebase.firestore();
    //delete temp record
    db.collection("shiftRequestMessages")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_SUCCESS_SHIFT_MESSAGE,
          payload: true,
        });
        console.log("User deleted!");
      });
  };
};

export const Delete_false = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SUCCESS_SHIFT_MESSAGE,
      payload: false,
    });
  };
};

export const success_false = () => {
  return (dispatch) => {
    dispatch({
      type: SHIFT_REQUEST_MESSAGE,
      payload: false,
    });
    dispatch({
      type: SHIFT_REQUEST_ERROR,
      payload: false,
    });
  };
};
