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
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
    paddingRight: 50,
    marginBottom: 30,
  },

  centerView: {
    padding: 20,
    paddingTop: 5,
  },

  box1: {
    fontSize: 14,
    color: "#6a4595",
    paddingTop: 10,
    marginLeft: 10,
    width: 220,
    height: 35,
    backgroundColor: "#b2d8d8",
  },

  link1: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    textDecorationLine: "underline",
  },

  link2: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 75,
    textDecorationLine: "underline",
  },

  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    // alignItems: 'flex-end',
    height: 40,
    width: 100,
    marginLeft: 160,
    marginBottom: 100,
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

  useEffect(() => {
    if (loginError && !currentUser) {
      loginErrorFunc();
    }
    //checkLoginState();
  }, []);

  const onSignIn = async () => {
    userLogin({ email, password });
    await loginErrorFunc();
  };

  const loginErrorFunc = () => {
    if (loginError && currentUser == undefined) {
      alert(loginError);
    }
  };

  if (loading) {
    return (
      <View style={[styles.spinnerContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            marginTop: 50,
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
        <View style={styles.row}>
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
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              onSignIn();
            }}
            style={styles.submitContainer}
          >
            <Text
              style={[
                styles.text,
                { color: "#ffffff", fontWeight: "600", fontSize: 16 },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View>
            <TouchableOpacity>
              <Text style={[styles.link1]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={[styles.link2]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
    // <View>
    //   <TextInput
    //     value={email}
    //     placeholder="Email"
    //     onChangeText={(email) => setEmail(email)}
    //   />
    //   <TextInput
    //     value={password}
    //     placeholder="Password"
    //     onChangeText={(password) => setPassword(password)}
    //   />
    //   <Button
    //     title="Sign in"
    //     onPress={() => {
    //       onSignIn();
    //     }}
    //   />

    //   <Button
    //     title="Register"
    //     onPress={() => {
    //       navigation.navigate("Register");
    //     }}
    //   />
    // </View>
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
