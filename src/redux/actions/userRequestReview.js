import {
  LOADING,
  GET_USER_REQUEST,
  USER_REQUEST_REVIEW_EMPTY,
  APPROVE_SUCCESS,
  ERROR_USER_REQUEST,
  DELETE_SUCCESS,
} from "../constants";
import firebase from "firebase";
import { useState } from "react";

export const userRequestReview = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const db = firebase.firestore();

    db.collection("tempUser")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const users = [];

        if (querySnapshot) {
          //console.log("NO USER REQUEST FOUND", querySnapshot);
          querySnapshot.forEach((documentSnapshot) => {
            //console.log("from action", documentSnapshot.data().password);
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          // console.log(users);
          dispatch({
            type: LOADING,
            payload: false,
          });

          dispatch({
            type: GET_USER_REQUEST,
            payload: users,
          });
        } else {
          console.log("NO USER REQUEST FOUND");
          dispatch({
            type: USER_REQUEST_REVIEW_EMPTY,
            payload: "NO USER REQUEST FOUND!",
          });
        }
      })
      .catch((err) => {
        console.log("NO USER REQUEST FOUND");
        dispatch({
          type: USER_REQUEST_REVIEW_EMPTY,
          payload: "NO USER REQUEST FOUND!",
        });
      });
  };
};

export const userApprove = ({
  id,
  firstName,
  lastName,
  email,
  password,
  accessLevel,
  currentLoggedInUser,
}) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    //create new accout (wil automatically sign in)r
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((results) => {
        console.log("new user created successfully");

        //add new account to firestore
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const db = firebase.firestore();

        const data = {
          firstName,
          lastName,
          email,
          password,
          accessLevel,
          createdAt: timestamp,
        };

        db.collection("user")
          .doc(firebase.auth().currentUser.uid)
          .set(data)
          .then((data) => {
            console.log("new user added to firestore success");
            //new account sign out
            firebase
              .auth()
              .signOut()
              .then((data) => {
                console.log("sign out new user successfull");
                //admin re sign in
                firebase
                  .auth()
                  .signInWithEmailAndPassword(
                    currentLoggedInUser.email,
                    currentLoggedInUser.password
                  )
                  .then((user) => {
                    console.log("admin re logged success");

                    //delete temp record
                    db.collection("tempUser")
                      .doc(id)
                      .delete()
                      .then(() => {
                        console.log("User deleted!");
                        dispatch({
                          type: APPROVE_SUCCESS,
                          payload: true,
                        });
                        dispatch({
                          type: LOADING,
                          payload: false,
                        });
                      });
                  })
                  .catch((err) => {
                    console.log("admin re logged error", err);
                    dispatch({
                      type: ERROR_USER_REQUEST,
                      payload: "Admin log in error.",
                    });
                    dispatch({
                      type: LOADING,
                      payload: false,
                    });
                  });

                console.log(
                  "from sign out success new user",
                  currentLoggedInUser.email,
                  currentLoggedInUser.password
                );
              })
              .catch((error) => {
                // An error happened.
                console.log(error, "sign out new user error");
                dispatch({
                  type: ERROR_USER_REQUEST,
                  payload: "New user sign out error",
                });
                dispatch({
                  type: LOADING,
                  payload: false,
                });
                //admin re sign in
                firebase
                  .auth()
                  .signInWithEmailAndPassword(
                    currentLoggedInUser.email,
                    currentLoggedInUser.password
                  )
                  .then((user) => {
                    console.log("admin re logged success");
                  })
                  .catch((err) => {
                    dispatch({
                      type: ERROR_USER_REQUEST,
                      payload: "Admin log in error",
                    });
                    dispatch({
                      type: LOADING,
                      payload: false,
                    });
                    console.log("admin re logged error", err);
                  });
                console.log(
                  "from sign out error new user",
                  currentLoggedInUser.email,
                  currentLoggedInUser.password
                );
              });
          })
          .catch((error) => {
            dispatch({
              type: ERROR_USER_REQUEST,
              payload: error,
            });
            dispatch({
              type: LOADING,
              payload: false,
            });
            console.log("new user added to firestore error", error);

            //new account sign out
            firebase
              .auth()
              .signOut()
              .then((data) => {
                console.log(data, "sign out new user successfull");

                //admin re sign in
                firebase
                  .auth()
                  .signInWithEmailAndPassword(
                    currentLoggedInUser.email,
                    currentLoggedInUser.password
                  )
                  .then((user) => {
                    console.log("admin re logged success");
                  })
                  .catch((err) => {
                    dispatch({
                      type: ERROR_USER_REQUEST,
                      payload: err,
                    });
                    dispatch({
                      type: LOADING,
                      payload: false,
                    });
                    console.log("admin re logged error", err);
                  });

                console.log(
                  currentLoggedInUser.email,
                  currentLoggedInUser.password
                );
              })
              .catch((error) => {
                dispatch({
                  type: ERROR_USER_REQUEST,
                  payload: true,
                });
                dispatch({
                  type: LOADING,
                  payload: false,
                });
                // An error happened.
                console.log(error, "sign out new user error");
                //admin re sign in
                firebase
                  .auth()
                  .signInWithEmailAndPassword(
                    currentLoggedInUser.email,
                    currentLoggedInUser.password
                  )
                  .then((user) => {
                    console.log("admin re logged success");
                  })
                  .catch((err) => {
                    dispatch({
                      type: ERROR_USER_REQUEST,
                      payload: true,
                    });
                    dispatch({
                      type: LOADING,
                      payload: false,
                    });
                    console.log("admin re logged error", err);
                  });
                console.log(
                  "from sign out error new user",
                  currentLoggedInUser.email,
                  currentLoggedInUser.password
                );
              });
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          dispatch({
            type: ERROR_USER_REQUEST,
            payload: "That email address is already in use!",
          });
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          dispatch({
            type: ERROR_USER_REQUEST,
            payload: "That email address is invalid!",
          });
          console.log("That email address is invalid!");
        }

        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  };
};

export const deleteUser = ({ id }) => {
  return (dispatch) => {
    const db = firebase.firestore();
    //delete temp record
    db.collection("tempUser")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_SUCCESS,
          payload: true,
        });
        console.log("User deleted!");
      });
  };
};

export const delete_false = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SUCCESS,
      payload: false,
    });
  };
};

export const error_false = () => {
  return (dispatch) => {
    dispatch({
      type: ERROR_USER_REQUEST,
      payload: false,
    });
  };
};

export const approve_false = () => {
  return (dispatch) => {
    dispatch({
      type: APPROVE_SUCCESS,
      payload: false,
    });
  };
};
