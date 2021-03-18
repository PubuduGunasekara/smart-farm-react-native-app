import firebase from "firebase";
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  LOADING,
} from "../constants";

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value },
  };
};

export const employeeFetch = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    //user login
    const db = firebase.firestore();

    //stre current user
    db.collection("user")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        //console.log("User exists: ", documentSnapshot.exists);

        if (documentSnapshot.exists) {
          //console.log("User data: ", documentSnapshot.data());
          dispatch({
            type: LOADING,
            payload: false,
          });

          dispatch({
            type: EMPLOYEE_FETCH_SUCCESS,
            payload: documentSnapshot.data(),
          });
        }
      });

    // firebase
    //   .database()
    //   .ref(`/users/${currentUser.uid}`)
    //   .on("value", (snapshot) => {
    //     dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
    //   });
  };
};

export const employeeSave = ({ firstName, lastName, email }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    //user login
    const db = firebase.firestore();

    //stre current user
    db.collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update({ firstName, lastName, email })
      .then(() => {
        employeeSaveSuccess(dispatch);
      });

    //   .then((documentSnapshot) => {
    //     //console.log("User exists: ", documentSnapshot.exists);

    //     if (documentSnapshot.exists) {
    //       //console.log("User data: ", documentSnapshot.data());
    //       dispatch({
    //         type: LOADING,
    //         payload: false,
    //       });

    //       dispatch({
    //         type: EMPLOYEE_SAVE_SUCCESS,
    //         payload: documentSnapshot.data(),
    //       });
    //     }
    //   });

    // firebase
    //   .database()
    //   .ref(`/users/${currentUser.uid}`)
    //   .set({ firstname, lastname, email })
    //   .then(() => {
    //     employeeSaveSuccess(disptach);
    //   });
  };
};

export const employeeSaveSuccess = (dispatch) => {
  dispatch({
    type: EMPLOYEE_SAVE_SUCCESS,
  });
};

// export const employeeDelete = ({uid}) => {
//   const {currentUser} = firebase.auth();

//   return () => {
//     firebase
//       .database()
//       .ref(`/users/${currentUser.uid}/employees/${uid}`)
//       .remove()
//       .then(() => {
//         Actions.pop();
//       });
//   };
// };

// export const getEmployee = ({ firstname, lastname, email, uid }) => {
//   return (dispatch) => {
//     firebase
//       .database()
//       .ref(`users/ ${uid}`)
//       .on("value", (snapshot) => {
//         dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
//       });
//   };
// };
