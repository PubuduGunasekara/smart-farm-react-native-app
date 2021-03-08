import firebase from "firebase";
import {
  LOADING,
  SHIFT_DETAILS_FOR_MODIFY,
  SHIFT_ERROR,
  USER_LIST_FOR_SHIFT_UPDATE,
  SHIFT_MODIFY_UPDATE_STATUS,
  USER_LIST_DATE_CHECK,
  LIST_DATE_CHECK_IDS,
  USER_LIST_DATE_CHECK_LOADING_SUCCESS,
} from "../../constants";

export const ListShiftDetails = ({ shiftId, shiftDate }) => {
  return (dispatch) => {
    //console.log("shiftId, accessLevel, shiftDate", shiftId, shiftDate);
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
          // console.log("selected shifts list", querySnapshot.data());
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

export const ListUsersFromDateCheck = ({ shiftDate, accessLevel }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const users = [];
    const db = firebase.firestore();
    //console.log("shift date", shiftDate, "accessLevel", accessLevel);

    db.collection("shiftDateCheker")
      .where("shiftDate", "==", `${shiftDate}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            if (doc.data().accessLevel === accessLevel) {
              users.push({
                id: doc.data().userId,
              });
            }
          });
          // console.log("users list date check from backend okkkkk", users);
          dispatch({
            type: USER_LIST_DATE_CHECK,
            payload: users,
          });
          dispatch({
            type: USER_LIST_DATE_CHECK_LOADING_SUCCESS,
            payload: true,
          });
          dispatch({
            type: LOADING,
            payload: false,
          });
        } else {
          dispatch({
            type: USER_LIST_DATE_CHECK_LOADING_SUCCESS,
            payload: false,
          });
          console.log("users list date check from backend empty", users);
        }
      })
      .catch((err) => {
        dispatch({
          type: SHIFT_ERROR,
          payload: "SOMETHING WENT WRONG!",
        });
        dispatch({
          type: USER_LIST_DATE_CHECK_LOADING_SUCCESS,
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

export const ListDateCheckIdsFunc = ({ shiftDate, accessLevel }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const dateCheckIds = [];

    const db = firebase.firestore();

    db.collection("shiftDateCheker")
      .where("shiftDate", "==", `${shiftDate}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            if (doc.data().accessLevel === accessLevel) {
              dateCheckIds.push({
                id: doc.id,
                userId: doc.data().userId,
                firstName: doc.data().firstName,
              });
            }
          });
          // console.log("dateCheckIds", dateCheckIds);
          dispatch({
            type: LIST_DATE_CHECK_IDS,
            payload: dateCheckIds,
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
          console.log("users list date check from backend empty", dateCheckIds);
        }
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
          payload: false,
        });

        console.log("SHIFT REQUEST ERROR admin: ", error);
      });
  };
};

export const addDateCkeckDoc = ({
  accessLevel,
  firstName,
  lastName,
  userId,
  shiftDate,
  shiftId,
}) => {
  return (dispatch) => {
    const data = {
      accessLevel,
      firstName,
      lastName,
      userId,
      shiftDate,
      shiftId,
    };

    const db = firebase.firestore();
    db.collection("shiftDateCheker")
      .add(data)
      .then(() => {
        console.log("shift date check added");
      });
  };
};

export const deleteDateCkeckDoc = ({ DateCheckId }) => {
  return (dispatch) => {
    const db = firebase.firestore();
    //delete temp record
    db.collection("shiftDateCheker")
      .doc(DateCheckId)
      .delete()
      .then(() => {
        // dispatch({
        //   type: DELETE_SUCCESS,
        //   payload: true,
        // });
        console.log("User deleted!");
      });
  };
};

export const UpdateModifiedShift = ({ shiftId, selectedUsersList }) => {
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

export const success_false_user_list_loading_date_success = () => {
  return (dispatch) => {
    dispatch({
      type: USER_LIST_DATE_CHECK_LOADING_SUCCESS,
      payload: false,
    });
  };
};
