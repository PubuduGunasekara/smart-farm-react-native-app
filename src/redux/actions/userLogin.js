import { USER_LOGIN, USER_LOGIN_ERROR, LOADING } from "../constants";
import firebase from "firebase";

export const userLogin = ({ email, password }) => {
  return (dispatch) => {
    var userDetails = {};
    dispatch({
      type: LOADING,
      payload: true,
    });
    //user login
    const db = firebase.firestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        if (results) {
          dispatch({
            type: USER_LOGIN_ERROR,
            payload: null,
          });
          //stre current user
          db.collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((documentSnapshot) => {
              //console.log("User exists: ", documentSnapshot.exists);

              if (documentSnapshot.exists) {
                userDetails = {
                  userId: documentSnapshot.id,
                  accessLevel: documentSnapshot.data().accessLevel,
                  email: documentSnapshot.data().email,
                  password: documentSnapshot.data().password,
                  firstName: documentSnapshot.data().firstName,
                  lastName: documentSnapshot.data().lastName,
                  shiftDate: documentSnapshot.data().shiftDate,
                  shiftStatus: documentSnapshot.data().shiftStatus,
                };
                //console.log("User data: ", documentSnapshot.data());
                dispatch({
                  type: LOADING,
                  payload: false,
                });
                dispatch({
                  type: USER_LOGIN_ERROR,
                  payload: null,
                });
                dispatch({
                  type: USER_LOGIN,
                  payload: userDetails,
                });
              }
            })
            .catch((error) => {
              console.error("login error", error);
              dispatch({
                type: LOADING,
                payload: false,
              });
              dispatch({
                type: USER_LOGIN_ERROR,
                payload: error,
              });
            });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: error,
        });

        // if (error.code === "auth/email-already-in-use") {
        //   dispatch({
        //     type: USER_LOGIN_ERROR,
        //     payload: "That email address is already in use!",
        //   });
        //   console.log("That email address is already in use!");
        // }

        // if (error.code === "auth/invalid-email") {
        //   dispatch({
        //     type: USER_LOGIN_ERROR,
        //     payload: "That email address is invalid!",
        //   });
        //   console.log("That email address is invalid!");
        // }
        // if (error.code === "The email address is badly formatted") {
        //   dispatch({
        //     type: USER_LOGIN_ERROR,
        //     payload: "The email address is badly formatted",
        //   });
        //   console.log("The email address is badly formatted");
        // }
        console.error(error);
      });
  };
};

export const checkLoginState = () => {
  const db = firebase.firestore();
  return (dispatch) => {
    var userDetails = {};
    // dispatch({
    //   type: LOADING,
    //   payload: true,
    // });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // dispatch({
        //   type: LOADING,
        //   payload: false,
        // });

        //stre current user
        db.collection("user")
          .doc(user.uid)
          .get()
          .then((documentSnapshot) => {
            //console.log("User exists: ", documentSnapshot.exists);

            if (documentSnapshot.exists) {
              //console.log("User data: ", documentSnapshot.data());
              // dispatch({
              //   type: LOADING,
              //   payload: false,
              // });
              userDetails = {
                userId: documentSnapshot.id,
                accessLevel: documentSnapshot.data().accessLevel,
                email: documentSnapshot.data().email,
                password: documentSnapshot.data().password,
                firstName: documentSnapshot.data().firstName,
                lastName: documentSnapshot.data().lastName,
                shiftDate: documentSnapshot.data().shiftDate,
                shiftStatus: documentSnapshot.data().shiftStatus,
              };

              dispatch({
                type: USER_LOGIN,
                payload: userDetails,
              });
            }
          })
          .catch((error) => {
            console.error("login error ", error);
            // dispatch({
            //   type: LOADING,
            //   payload: false,
            // });
            dispatch({
              type: USER_LOGIN_ERROR,
              payload: error,
            });
          });
      } else {
        // dispatch({
        //   type: LOADING,
        //   payload: false,
        // });
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: false,
        });
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    firebase
      .auth()
      .signOut()
      .then((data) => {
        dispatch({
          type: USER_LOGIN,
          payload: null,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("sign out new user successfull");
      })
      .catch((err) => {
        console.log("sign out error", err);
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  };
};
