import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import AppDrawer from "./AppDrawer";
import { AuthStack } from "./AuthStack";

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
