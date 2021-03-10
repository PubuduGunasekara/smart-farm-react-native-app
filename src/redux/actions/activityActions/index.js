import {
  ACTIVITY_ERROR,
  MY_ACTIVITIES,
  ALL_ACTIVITIES,
  LOADING,
} from "../../constants";
import firebase from "firebase";

export const addActivity = ({
  firstName,
  lastName,
  accessLevel,
  date,
  type,
  message,
}) => {
  return (dispatch) => {
    const db = firebase.firestore();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      userId: firebase.auth().currentUser.uid,
      firstName,
      lastName,
      accessLevel,
      date,
      type,
      message,
      createdAt: timestamp,
    };
    db.collection("activities")
      .add(data)
      .then((data) => {
        console.log("activity added successfully");
      })
      .catch((err) => {
        dispatch({
          type: ACTIVITY_ERROR,
          payload: "SOMETHING WENT WRONG!",
        });
        console.log("activity add err", err);
      });
  };
};

export const showAllActivities = ({ activityDate }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const allActivities = [];
    const db = firebase.firestore();
    db.collection("activities")
      .orderBy("createdAt", "desc")
      .where("date", "==", `${activityDate}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            if (doc.data().createdAt !== null) {
              allActivities.push({
                id: doc.id,
                createdAt: doc.data().createdAt,
                accessLevel: doc.data().accessLevel,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                message: doc.data().message,
                type: doc.data().type,
                userId: doc.data().userId,
              });
            }
          });
          console.log("allActivities", allActivities);
          dispatch({
            type: ALL_ACTIVITIES,
            payload: allActivities,
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
        console.log("my activity error", err);
      });
  };
};

export const showMyActivities = ({ activityDate, userId }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const myActivities = [];
    const db = firebase.firestore();
    db.collection("activities")
      .orderBy("createdAt", "desc")
      .where("date", "==", `${activityDate}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            if (doc.data().userId === userId) {
              if (doc.data().createdAt !== null) {
                myActivities.push({
                  id: doc.id,
                  createdAt: doc.data().createdAt,
                  accessLevel: doc.data().accessLevel,
                  firstName: doc.data().firstName,
                  lastName: doc.data().lastName,
                  message: doc.data().message,
                  type: doc.data().type,
                  userId: doc.data().userId,
                });
              }
            }
          });
          console.log("myActivities", myActivities);
          dispatch({
            type: MY_ACTIVITIES,
            payload: myActivities,
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
        console.log("my activity error", err);
      });
  };
};
