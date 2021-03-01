import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { Center } from "./Center";
import { AuthContext } from "./AuthProvider";
import { AsyncStorage } from "react-native";
import AppDrawer from "./AppDrawer";
import { AuthStack } from "./AuthStack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkLoginState } from "../src/redux/actions/userLogin";

const Index = ({ currentUser, checkLoginState }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  //console.log("current user", currentUser);

  useEffect(() => {
    // if (currentUser) {
    //   setLoggedIn(true);
    // }
    checkLoginState();
  }, []);

  return (
    <NavigationContainer>
      {currentUser ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ checkLoginState }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Index);
