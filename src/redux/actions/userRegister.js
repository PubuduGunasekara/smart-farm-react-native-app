import {
  USER_REGISTER_ERROR,
  USER_REGISTER_SUCCESS,
  LOADING,
} from "../constants";
import firebase from "firebase";
import { Keyboard } from "react-native";

export const userRegister = ({ firstName, lastName, email, password }) => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
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
          payload: true,
        });

        console.log(data);
        Keyboard.dismiss();
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTER_ERROR,
          payload: error,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log(error);
      });
  };
};

export const success_false = () => {
  return (dispatch) => {
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: false,
    });
  };
};
