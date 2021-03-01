import { USER_REGISTER_ERROR, USER_REGISTER_SUCCESS } from "../constants";
import firebase from "firebase";

export const userRegister = ({ firstName, lastName, email, password }) => {
  return (dispatch) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const db = firebase.firestore();
    const data = {
      firstName,
      lastName,
      email,
      password,
      createdAt: timestamp,
    };

    console.log(data);

    db.collection("tempUser")
      .add(data)
      .then((data) => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });
        console.log(data);
        Keyboard.dismiss();
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTER_ERROR,
          payload: error,
        });
        alert(error);
      });
  };
};
