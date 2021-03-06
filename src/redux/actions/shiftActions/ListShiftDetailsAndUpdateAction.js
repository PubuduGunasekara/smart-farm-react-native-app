import firebase from "firebase";
import {
  LOADING,
  SHIFT_DETAILS_FOR_MODIFY,
  SHIFT_ERROR,
  USER_LIST_FOR_SHIFT_UPDATE,
  SHIFT_MODIFY_UPDATE_STATUS,
} from "../../constants";

export const ListShiftDetails = ({ shiftId, shiftDate }) => {
  return (dispatch) => {
    console.log("shiftId, accessLevel, shiftDate", shiftId, shiftDate);
    dispatch({
      type: LOADING,
      payload: true,
    });

    const db = firebase.firestore();
    db.collection("shift")
      .doc(shiftId)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          dispatch({
            type: SHIFT_DETAILS_FOR_MODIFY,
            payload: querySnapshot.data(),
          });
          console.log("selected shifts list", querySnapshot.data());
          dispatch({
            type: LOADING,
            payload: false,
          });
          dispatch({
            type: SHIFT_ERROR,
            payload: false,
          });
        } else {
          dispatch({
            type: LOADING,
            payload: false,
          });
          dispatch({
            type: SHIFT_ERROR,
            payload: false,
          });
          console.log("No records found");
        }
      })
      .catch((err) => {
        dispatch({
          type: SHIFT_ERROR,
          payload: "SOMETHING WENT WRONG!",
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("shift error from list shifts", err);
      });
  };
};

export const ListUsersForModify = ({ accessLevel }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const users = [];
    const db = firebase.firestore();

    db.collection("user")
      .where("accessLevel", "==", `${accessLevel}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            users.push({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              accessLevel: doc.data().accessLevel,
              id: doc.id,
              shiftDate: doc.data().shiftDate,
            });
          });

          dispatch({
            type: USER_LIST_FOR_SHIFT_UPDATE,
            payload: users,
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: SHIFT_ERROR,
          payload: "SOMETHING WENT WRONG!",
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("shift error ", err);
      });
  };
};

export const UpdateModifiedShift = ({
  shiftId,
  selectedUsersList,
  requestId,
}) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const db = firebase.firestore();

    db.collection("shift")
      .doc(shiftId)
      .update({ selectedUsersList })
      .then(() => {
        dispatch({
          type: SHIFT_MODIFY_UPDATE_STATUS,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: SHIFT_ERROR,
          payload: "SOMETHING WENT WRONG!",
        });
        dispatch({
          type: SHIFT_MODIFY_UPDATE_STATUS,
          payload: false,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("shift error ", err);
      });
  };
};

export const success_false = () => {
  return (dispatch) => {
    dispatch({
      type: SHIFT_MODIFY_UPDATE_STATUS,
      payload: false,
    });
  };
};
