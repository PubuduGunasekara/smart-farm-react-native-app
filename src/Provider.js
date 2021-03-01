import React from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
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
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Index />
      </SafeAreaView>
    </Provider>
  );
};
