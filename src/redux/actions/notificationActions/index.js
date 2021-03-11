import { SHIFT_ERROR, LOADING, NOTOFICATIONS } from "../../constants";
import firebase from "firebase";

export const addNotifications = ({
  userId,
  firstName,
  lastName,
  accessLevel,
  type,
  message,
}) => {
  return (dispatch) => {
    const db = firebase.firestore();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      userId,
      firstName,
      lastName,
      accessLevel,
      type,
      message,
      createdAt: timestamp,
    };
    db.collection("notifications")
      .add(data)
      .then((data) => {
        console.log("notification added successfully");
      })
      .catch((err) => {
        dispatch({
          type: SHIFT_ERROR,
          payload: "SOMETHING WENT WRONG!",
        });
        console.log("notification add err", err);
      });
  };
};

export const getNotifications = ({ userId }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const notifications = [];
    const db = firebase.firestore();

    db.collection("notifications")
      .orderBy("createdAt", "desc")
      .where("userId", "==", `${userId}`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().createdAt !== null) {
            notifications.push({
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
        console.log("noti", notifications);
        dispatch({
          type: NOTOFICATIONS,
          payload: notifications,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("Notifications error", error);
      });
  };
};
