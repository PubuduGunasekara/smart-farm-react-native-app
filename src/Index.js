import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import AppDrawer from "./AppDrawer";
import { AuthStack } from "./AuthStack";

import NetInfo from "@react-native-community/netinfo";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkLoginState } from "../src/redux/actions/userLogin";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   horizontal: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10,
//   },
// });

const Index = ({ currentUser, checkLoginState }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginState();
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
              text: "OK",
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

  // const backAction = () => {
  //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     { text: 'YES', onPress: () => BackHandler.exitApp() },
  //   ]);
  //   return true;
  // };

  // if (loading) {
  //   return (
  //     <View style={[styles.container, styles.horizontal]}>
  //       <ActivityIndicator size="large" color="#008080" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {currentUser ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = (store) => ({
  // loading: store.loadinReducer.loading,
  currentUser: store.userReducer.user,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ checkLoginState }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Index);
