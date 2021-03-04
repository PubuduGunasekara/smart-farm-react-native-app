import firebase from "firebase";
import {
  LOADING,
  USER_LIST_SUCCESS,
  USER_LIST_ACCESS_LEVEL,
  SHIFT_ERROR,
  LOADING_MAIN,
} from "../../constants";

export const ListUsers = ({ level }) => {
  return (dispatch) => {
    console.log("access level ", level);
    dispatch({
      type: LOADING,
      payload: true,
    });

    const db = firebase.firestore().collection("user");
    const users = [];

    db.where("accessLevel", "==", `${level}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            users.push({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              accessLevel: doc.data().accessLevel,
              id: doc.id,
            });

            console.log("users: ", users);
            dispatch({
              type: USER_LIST_ACCESS_LEVEL,
              payload: users,
            });

            dispatch({
              type: LOADING,
              payload: false,
            });
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

export const shiftAllocate = ({
  date,
  timeFrom,
  timeTo,
  selectedUsersList,
  WorkGroupLevel,
}) => {
  return (dispatch) => {
    console.log(
      "from backend",
      date,
      timeFrom.toTimeString(),
      timeTo.toTimeString(),
      selectedUsersList,
      WorkGroupLevel
    );

    dispatch({
      type: LOADING_MAIN,
      payload: true,
    });

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const db = firebase.firestore();

    const data = {
      date,
      timeFrom,
      timeTo,
      WorkGroupLevel,
      selectedUsersList,
      createdAt: timestamp,
    };

    db.collection("shift")
      .add(data)
      .then((data) => {
        selectedUsersList.map((item) => {
          db.collection("user").doc(item.id).update({
            shiftDate: date,
          });
        });

        console.log("success: ", data);
        dispatch({
          type: USER_LIST_SUCCESS,
          payload: true,
        });
        dispatch({
          type: LOADING_MAIN,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING_MAIN,
          payload: false,
        });
        dispatch({
          type: SHIFT_ERROR,
          payload: "SOMETHING WENT WRONG!",
        });
        dispatch({
          type: USER_LIST_SUCCESS,
          payload: false,
        });
        console.log("shift upload error: ", err);
      });
  };
};

export const success_false = () => {
  return (dispatch) => {
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: false,
    });
  };
};
