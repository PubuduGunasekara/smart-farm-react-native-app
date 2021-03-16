import firebase from "firebase";

import {
  INCIDENT_SUCCESS,
  LOADING,
  INCIDENT_ERROR,
  INCIDENT_LIST,
} from "../constants";

export const submitIncident = ({
  message,
  issuetype,
  firstName,
  lastName,
  accessLevel,
}) => {
  return (dispatch) => {
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    //  var currentUser= firebase.auth().currentUser;
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    // console.log("timestamp", );

    var date = day + "-" + month + "-" + year;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const db = firebase.firestore();

    const data = {
      id: firebase.auth().currentUser.uid,
      firstName,
      lastName,
      message,
      date: date,
      issuetype,
      createdAt: timestamp,
      accessLevel,
    };

    dispatch({
      type: LOADING,
      payload: true,
    });

    db.collection("incident")

      .add(data)
      .then(() => {
        dispatch({
          type: INCIDENT_SUCCESS,
          payload: true,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        console.log("incident error: ", err);
      });
  };
};

export const viewMyIncident = ({ date }) => {
  const userId = firebase.auth().currentUser.uid;

  return (dispatch) => {
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
            if (doc.data().id === userId) {
              incidents.push({
                ...doc.data(),
                IncidentId: doc.id,
              });
            }
          });
          dispatch({
            type: INCIDENT_LIST,
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
        console.log("my activity error", err);
      });
  };
};

export const success_false = () => {
  return (dispatch) => {
    dispatch({
      type: INCIDENT_SUCCESS,
      payload: false,
    });
  };
};
