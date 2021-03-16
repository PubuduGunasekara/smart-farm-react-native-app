import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { AuthProvider } from "./AuthProvider";
import Index from "./Index";
import { Provider } from "react-redux";
import { store } from "../src/redux/store/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export const Providers = ({}) => {
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Warning",
          "No Internet!",
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            {
              text: "EXIT APP",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
      }

      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  }, []);
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};
