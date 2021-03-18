import firebase from "firebase";

import {
  VIEW_ALL_USER,
  View_USERS_EMPTY,
  LOADING,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  DELETE_SUCCESS,
  USER_SAVE_SUCCESS,
  USER_SAVE_ERROR,
  USER_UPDATE,
  INCIDENT_ADMIN_LIST,
} from "../constants";

// export const userUpdate = ({ prop, value }) => {
//   return {
//     type: USER_UPDATE,
//     payload: { prop, value },
//   };
// };

export const viewAllUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const db = firebase.firestore();

    db.collection("user")
      .get()
      .then((querySnapshot) => {
        const users = [];

        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          dispatch({
            type: LOADING,
            payload: false,
          });

          dispatch({
            type: VIEW_ALL_USER,
            payload: users,
          });
        } else {
          dispatch({
            type: View_USERS_EMPTY,
            payload: "NO USERS FOUND!",
          });
        }
      })
      .catch((err) => {
        console.log("view user error", err);
      });
  };
};

export const employeeCreate = ({
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
                    console
                      .log("admin re logged success")

                      .then(() => {
                        dispatch({
                          type: CREATE_USER_SUCCESS,
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
                      type: CREATE_USER_ERROR,
                      payload: true,
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
                  type: CREATE_USER_ERROR,
                  payload: true,
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
                      type: CREATE_USER_ERROR,
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
          })
          .catch((error) => {
            dispatch({
              type: CREATE_USER_ERROR,
              payload: true,
            });
            dispatch({
              type: LOADING,
              payload: false,
            });
            console.log("new user added to firestore error", error);
            dispatch({
              type: CREATE_USER_ERROR,
              payload: true,
            });
            dispatch({
              type: LOADING,
              payload: false,
            });
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
                      type: CREATE_USER_ERROR,
                      payload: true,
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
                  type: CREATE_USER_ERROR,
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
                      type: CREATE_USER_ERROR,
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
      .catch((err) => {
        dispatch({
          type: CREATE_USER_ERROR,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log(" new user created error", err);
      });
  };
};

export const removeUser = ({ id }) => {
  return (dispatch) => {
    const db = firebase.firestore();
    dispatch({
      type: LOADING,
      payload: true,
    });
    //delete temp record
    db.collection("user")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_SUCCESS,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("User deleted!");
      })
      .catch((err) => {
        console.log("delete error", err);
      });
  };
};

export const Delete_false = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SUCCESS,
      payload: false,
    });
  };
};

export const userSave = ({ FirstName, LastName, AccessLevel, id }) => {
  return (dispatch) => {
    const data = {
      firstName: FirstName,

      lastName: LastName,
      accessLevel: AccessLevel,
    };

    dispatch({
      type: LOADING,
      payload: true,
    });
    //user login
    const db = firebase.firestore();

    //stre current user
    db.collection("user")
      .doc(id)
      .update(data)
      .then((data) => {
        dispatch({
          type: USER_SAVE_SUCCESS,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        console.log("edit user error: ", err);
      });
  };
};

export const success_false = () => {
  return (dispatch) => {
    dispatch({
      type: USER_SAVE_SUCCESS,
      payload: false,
    });
  };
};

export const viewAllIncident = ({ date, firstName, lastName }) => {
  // const userId = firebase.auth().currentUser.uid;
  console.log(firstName, lastName);
  return (dispatch) => {
    console.log(date);
    dispatch({
      type: LOADING,
      payload: true,
    });
    const incidents = [];
    const db = firebase.firestore();
    db.collection("incident")
      .orderBy("createdAt", "desc")
      .where("date", "==", `${date}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          // querySnapshot.forEach((documentSnapshot) => {
          //   incidentList.push({
          //     ...documentSnapshot.data(),
          //     key: documentSnapshot.id,
          //   });
          // });

          querySnapshot.forEach((doc) => {
            // if (doc.data().id === userId) {
            incidents.push({
              ...doc.data(),
              IncidentId: doc.id,
            });
            // }
          });
          dispatch({
            type: INCIDENT_ADMIN_LIST,
            payload: incidents,
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
          console.log("No data");
        }
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("INCIDENTS error", err);
      });
  };
};
