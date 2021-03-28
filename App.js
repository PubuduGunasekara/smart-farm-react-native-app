import { Providers } from "./src/Provider";
import firebase from "firebase";
import { View, LogBox } from "react-native";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /**put your firebase connetction details */
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreAllLogs();

export default Providers;
