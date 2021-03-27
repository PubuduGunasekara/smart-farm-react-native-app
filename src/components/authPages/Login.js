import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin, checkLoginState } from "../../redux/actions/userLogin";

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
  },
  text: {
    paddingTop: 10,
    marginLeft: 28,
  },

  text1: {
    paddingTop: 20,
  },

  row: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  centerView: {
    padding: "15%",
    paddingTop: 5,
    paddingBottom: 0,
  },

  box1: {
    fontSize: 14,
    color: "#6a4595",
    paddingTop: 10,
    marginLeft: 10,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#b2d8d8",
  },

  link1: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "flex-start",
    textDecorationLine: "underline",
  },

  link2: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 75,
    alignContent: "flex-end",
    textDecorationLine: "underline",
  },

  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  btn: {
    marginTop: 170,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
    paddingLeft: 30,
    paddingRight: 35,
    justifyContent: "space-between",
    marginBottom: 100,
  },
});

const Login = ({ currentUser, userLogin, loginError, navigation, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [lognErrorStatus, setlognErrorStatus] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (loginError && !currentUser) {
      loginErrorFunc();
    }
    navigation.addListener("focus", () => {
      setlognErrorStatus(false);
      setEmpty(false);
    });
    //checkLoginState();
  }, [loginError]);

  const onSignIn = async () => {
    if (email === "" || password === "") {
      setEmpty(true);
      setlognErrorStatus(false);
    } else {
      await userLogin({ email, password });

      await loginErrorFunc();
    }
  };

  const loginErrorFunc = () => {
    if (loginError && currentUser == undefined) {
      setEmpty(false);
      setlognErrorStatus(true);
    }
  };

  if (loading) {
    return (
      <View style={[styles.spinnerContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <StatusBar />
        <View>
          <View
            style={{
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/sfImage.png")}
              style={{
                width: 300,
                height: 200,
                paddingLeft: 30,
                paddingRight: 30,
                marginTop: 50,
              }}
              resizeMode="contain"
            ></Image>
          </View>
        </View>

        <View style={styles.centerView}>
          {lognErrorStatus === true ? (
            <View style={styles.row}>
              <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                Wrong Email or Password
              </Text>
            </View>
          ) : null}
          {empty === true ? (
            <View style={styles.row}>
              <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                Email or Password may empty
              </Text>
            </View>
          ) : null}
          <View style={[styles.row]}>
            <View>
              <Feather name="user" size={30} />
            </View>
            <View style={styles.box1}>
              <TextInput
                value={email}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View>
              <Feather name="lock" size={30} />
            </View>
            <View style={styles.box1}>
              <TextInput
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                blurOnSubmit={true}
                keyboardAppearance="default"
                onChangeText={(password) => setPassword(password)}
              />
            </View>
          </View>

          <View
            style={[
              styles.row,
              {
                width: "100%",
                marginLeft: 20,
              },
            ]}
          >
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
              onPress={() => {
                onSignIn();
              }}
              style={styles.submitContainer}
            >
              <Text
                style={[{ color: "#ffffff", fontWeight: "600", fontSize: 16 }]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            {
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            },
          ]}
        >
          <View
            style={{
              flex: 1,

              alignItems: "flex-start",
              marginLeft: "5%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text style={[styles.link1]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,

              alignItems: "flex-end",
              marginRight: "5%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={[styles.link2]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
  loginError: store.userReducer.loginError,
  loading: store.loadinReducer.loading,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userLogin, checkLoginState }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Login);
