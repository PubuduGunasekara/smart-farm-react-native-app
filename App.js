import { Providers } from "./src/Provider";
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default Providers;
