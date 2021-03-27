import { Providers } from "./src/Provider";
import firebase from "firebase";
import { View, LogBox } from "react-native";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhEvHVYS7FdViAOXb6z3LEYAOgRcDguNQ",
  authDomain: "smart-farm-project-7139a.firebaseapp.com",
  projectId: "smart-farm-project-7139a",
  storageBucket: "smart-farm-project-7139a.appspot.com",
  messagingSenderId: "1085026915732",
  appId: "1:1085026915732:web:3abcaf23951bf7cc096b81",
  measurementId: "G-253JV0D0YB",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreAllLogs();

export default Providers;
