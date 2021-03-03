import firebase from "firebase";
import {
  LOADING,
  USER_LIST_SUCCESS,
  USER_LIST_ACCESS_LEVEL,
  SHIFT_ERROR,
  // USER_ID_LIST_ACCESS_LEVEL,
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
    // const userId = [];

    db.where("accessLevel", "==", `${level}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            users.push({
              ...doc.data(),
              id: doc.id,
            });
            // users.push(doc.data());
            // userId.push(doc.id);
          });
        }
      })
      .then((data) => {
        console.log("users: ", users);
        // console.log("users Id: ", userId);
        dispatch({
          type: USER_LIST_ACCESS_LEVEL,
          payload: users,
        });
        // dispatch({
        //   type: USER_ID_LIST_ACCESS_LEVEL,
        //   payload: userId,
        // });
        dispatch({
          type: USER_LIST_SUCCESS,
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
          type: LOADING,
          payload: false,
        });
        console.log("shift error ", err);
      });

    // db.where("accessLevel", "==", `${level}`).onSnapshot((querySnapshot) => {
    //   if (querySnapshot) {
    //     querySnapshot.forEach((doc) => {
    //       users.push(doc.data());
    //     });
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc);
    //     });

    //     dispatch({
    //       type: USER_LIST_ACCESS_LEVEL,
    //       payload: users,
    //     });
    //     console.log(users);
    //     dispatch({
    //       type: USER_LIST_SUCCESS,
    //       payload: true,
    //     });
    //     dispatch({
    //       type: LOADING,
    //       payload: false,
    //     });
    //   } else {
    //     dispatch({
    //       type: USER_LIST_ACCESS_LEVEL,
    //       payload: [],
    //     });

    //     dispatch({
    //       type: USER_LIST_SUCCESS,
    //       payload: false,
    //     });
    //     dispatch({
    //       type: LOADING,
    //       payload: false,
    //     });
    //   }
    // });

    //   .then((data) => {

    //     // dispatch({
    //     //   type: USER_LIST_ACCESS_LEVEL,
    //     //   payload: users,
    //     // });
    //     // console.log(users);
    //     // dispatch({
    //     //   type: USER_LIST_SUCCESS,
    //     //   payload: true,
    //     // });
    //     // dispatch({
    //     //   type: LOADING,
    //     //   payload: false,
    //     // });
    //   })
    //   .catch((err) => {
    //     // dispatch({
    //     //   type: SHIFT_ERROR,
    //     //   payload: "SOMETHING WENT WRONG!",
    //     // });
    //     // dispatch({
    //     //   type: LOADING,
    //     //   payload: false,
    //     // });
    //     console.log("shift error ", err);
    //   });
  };
};
