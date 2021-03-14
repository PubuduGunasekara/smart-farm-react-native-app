import {
  REQUEST_MESSAGES_FOR_ADMIN,
  LOADING,
  REQUEST_MESSAGES_SUCCESS,
} from "../../constants";
import firebase from "firebase";

export const ShowShiftChangesRequest = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    const messages = [];

    const db = firebase.firestore();

    db.collection("shiftRequestMessages")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          messages.push({
            ...doc.data(),
            requestId: doc.id,
          });
        });
        if (messages.length === 0) {
          dispatch({
            type: REQUEST_MESSAGES_SUCCESS,
            payload: false,
          });
        }
        dispatch({
          type: REQUEST_MESSAGES_FOR_ADMIN,
          payload: messages,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: REQUEST_MESSAGES_SUCCESS,
          payload: true,
        });
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
