import {
  MESSAGE_ADMIN_ERROR,
  ADMIN_MESSAGES,
  USER_MESSAGES,
  LOADING,
  MESSAGE_USER_ERROR,
} from "../../constants";
import firebase from "firebase";

export const sendMessage = ({ WorkGroupLevel, message }) => {
  return (dispatch) => {
    const db = firebase.firestore();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      accessLevel: WorkGroupLevel,
      message,
      createdAt: timestamp,
    };
    db.collection("communications")
      .add(data)
      .then((data) => {
        console.log("message successfully");
      })
      .catch((err) => {
        dispatch({
          type: MESSAGE_ADMIN_ERROR,
          payload: true,
        });
        console.log("activity add err", err);
      });
  };
};

export const getMessageUser = ({ accessLevel }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const messages = [];
    const db = firebase.firestore();

    db.collection("communications")
      .orderBy("createdAt", "desc")
      .limit(30)
      .where("accessLevel", "==", `${accessLevel}`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().createdAt !== null) {
            messages.push({
              message: doc.data().message,
              accessLevel: doc.data().accessLevel,
              createdAt: doc.data().createdAt,
              id: doc.id,
            });
          }
        });
        console.log("fro admin", messages);
        dispatch({
          type: USER_MESSAGES,
          payload: messages,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: MESSAGE_USER_ERROR,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("messages get user error", error);
      });
    // .onSnapshot(
    //   (snapshot) => {
    //     snapshot.forEach((doc) => {
    //       if (doc.data().createdAt !== null) {
    //         messages.push({
    //           message: doc.data().message,
    //           accessLevel: doc.data().accessLevel,
    //           createdAt: doc.data().createdAt,
    //           id: doc.id,
    //         });
    //       }
    //     });

    //     dispatch({
    //       type: USER_MESSAGES,
    //       payload: messages,
    //     });
    //     dispatch({
    //       type: LOADING,
    //       payload: false,
    //     });
    //   },
    //   (error) => {
    //     dispatch({
    //       type: LOADING,
    //       payload: false,
    //     });
    //     dispatch({
    //       type: MESSAGE_USER_ERROR,
    //       payload: true,
    //     });
    //     console.log("messages get USER error", error);
    //   }
    // );
  };
};

export const getMessageAdmin = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const messages = [];
    const db = firebase.firestore();

    db.collection("communications")
      .orderBy("createdAt", "desc")
      .limit(30)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().createdAt !== null) {
            messages.push({
              message: doc.data().message,
              accessLevel: doc.data().accessLevel,
              createdAt: doc.data().createdAt,
              id: doc.id,
            });
          }
        });
        console.log("fro admin", messages);
        dispatch({
          type: ADMIN_MESSAGES,
          payload: messages,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: MESSAGE_ADMIN_ERROR,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log("messages get ADMIN error", error);
      });
  };
};
