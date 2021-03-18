import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";

import TopHeaderWithGoBack from "../../components/helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userRegister, success_false } from "../../redux/actions/userRegister";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  text: {
    paddingTop: 10,
    marginLeft: 28,
  },

  text1: {
    paddingTop: 100,
    fontSize: 18,
  },

  image1: {
    height: 100,
    paddingLeft: 160,
    paddingTop: 50,
  },

  row: {
    // marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  row2: {
    marginTop: -50,
    flexDirection: "column",
    alignItems: "flex-end",
    height: 20,
    marginRight: 230,
    paddingBottom: 300,
  },

  centerView: {
    paddingTop: 50,
    padding: 20,

    flexDirection: "column",
  },

  inputWrap: {
    marginTop: 15,
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    padding: 5,
  },

  txtinput: {
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    fontSize: 18,
  },

  link1: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  link2: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 22,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    // alignItems: 'flex-end',
    height: 40,
    width: 100,
    marginLeft: 172,
    marginBottom: 100,
    marginTop: 30,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const Register = ({
  registerError,
  registerSuccess,
  userRegister,
  navigation,
  loading,
  success_false,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailValid, setemailValid] = useState(false);
  const [passwordValid, setpasswordValid] = useState(false);
  const [confirmPwValid, setconfirmPwValid] = useState(false);
  const [firstNameValid, setfirstNameValid] = useState(false);
  const [lastNameValid, setlastNameValid] = useState(false);
  const [passwordNotMatch, setpasswordNotMatch] = useState(false);
  const [emailFormatValid, setemailFormatValid] = useState(false);

  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const onSignUp = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (firstName === "") {
      setfirstNameValid(true);
    } else if (lastName === "") {
      setlastNameValid(true);
      setfirstNameValid(false);
    } else if (email === "") {
      setemailValid(true);
      setlastNameValid(false);
      setfirstNameValid(false);
    } else if (reg.test(email) === false) {
      setemailFormatValid(true);
      setemailValid(false);
      setlastNameValid(false);
      setfirstNameValid(false);
    } else if (password === "") {
      setpasswordValid(true);
      setemailFormatValid(false);
      setemailValid(false);
      setlastNameValid(false);
      setfirstNameValid(false);
    } else if (confirmPassword === "") {
      setconfirmPwValid(true);
      setpasswordValid(false);
      setemailValid(false);
      setlastNameValid(false);
      setfirstNameValid(false);
    } else {
      setfirstNameValid(false);
      setlastNameValid(false);
      setemailValid(false);
      setpasswordValid(false);
      setconfirmPwValid(false);
      if (password !== confirmPassword) {
        setpasswordNotMatch(true);
      } else {
        setpasswordNotMatch(false);
        userRegister({ firstName, lastName, email, password });
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
      }
    }
  };

  if (loading) {
    return (
      <View style={[styles.spinnerContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  if (registerSuccess === true) {
    Alert.alert(
      "SUCCESS",
      "Your request has been registered successfully.",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => (success_false(), navigation.navigate("Login")),
        },
      ],
      { cancelable: false }
    );
  }

  if (registerError) {
    Alert.alert(
      "ERROR",
      `${registerError}`,
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ],
      { cancelable: false }
    );
  }

  const oncancel = () => {
    setpasswordNotMatch(false);
    setemailFormatValid(false);
    setfirstNameValid(false);
    setlastNameValid(false);
    setemailValid(false);
    setpasswordValid(false);
    setconfirmPwValid(false);
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <TopHeaderWithGoBack
            title={"Register"}
            navigationFunc={navigation.goBack}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity>
            <View>
              <Feather name="user" size={50} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <ScrollView>
            <KeyboardAvoidingView style={styles.centerView} behavior="position">
              <TextInput
                style={styles.inputWrap}
                value={firstName}
                maxLength={25}
                placeholder="First name"
                onChangeText={(firstName) => setFirstName(firstName)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance="default"
              />
              {firstNameValid === true ? (
                <View>
                  <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                    First name cannot be empty
                  </Text>
                </View>
              ) : null}

              <TextInput
                style={styles.inputWrap}
                value={lastName}
                placeholder="Last name"
                onChangeText={(lastName) => setLastName(lastName)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance="default"
              />
              {lastNameValid === true ? (
                <View>
                  <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                    Last name cannot be empty
                  </Text>
                </View>
              ) : null}

              <TextInput
                style={styles.inputWrap}
                value={email}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                keyboardAppearance="default"
              />
              {emailValid === true ? (
                <View>
                  <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                    Email cannot be empty
                  </Text>
                </View>
              ) : null}
              {emailFormatValid === true ? (
                <View>
                  <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                    Wrong Email
                  </Text>
                </View>
              ) : null}

              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <TextInput
                  style={[styles.inputWrap, { flex: 7 }]}
                  value={password}
                  placeholder="Password"
                  secureTextEntry={hidePass ? true : false}
                  onChangeText={(password) => setPassword(password)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  keyboardAppearance="default"
                />
                <View
                  style={{
                    alignItems: "flex-end",
                    alignSelf: "center",
                    marginTop: 7,
                    flex: 1,
                  }}
                >
                  <Icon
                    name={hidePass ? "eye-slash" : "eye"}
                    size={20}
                    color="grey"
                    onPress={() => setHidePass(!hidePass)}
                  />
                </View>
              </View>
              {passwordValid === true ? (
                <View>
                  <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                    Password cannot be empty
                  </Text>
                </View>
              ) : null}

              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <TextInput
                  style={[styles.inputWrap, { flex: 7 }]}
                  value={confirmPassword}
                  placeholder="Confirm password"
                  secureTextEntry={hideConfirmPass ? true : false}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  keyboardAppearance="default"
                />
                <View
                  style={{
                    alignItems: "flex-end",
                    alignSelf: "center",
                    flex: 1,
                  }}
                >
                  <Icon
                    name={hideConfirmPass ? "eye-slash" : "eye"}
                    size={20}
                    color="grey"
                    onPress={() => setHideConfirmPass(!hideConfirmPass)}
                  />
                </View>
              </View>
              {passwordNotMatch === true ? (
                <View>
                  <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                    Password not matched
                  </Text>
                </View>
              ) : null}
              {confirmPwValid === true ? (
                <View>
                  <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                    Confirm password cannot be empty
                  </Text>
                </View>
              ) : null}

              <View style={{ flexDirection: "row", marginTop: 25 }}>
                <View style={{ flex: 1, marginRight: 25 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#008080",
                      alignItems: "center",
                      padding: 8,
                    }}
                    onPress={() => {
                      oncancel();
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginLeft: 25 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#008080",
                      alignItems: "center",
                      padding: 8,
                    }}
                    onPress={() => {
                      onSignUp();
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      REGISTER
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (store) => ({
  registerError: store.userReducer.registerError,
  registerSuccess: store.userReducer.registerSuccess,
  loading: store.loadinReducer.loading,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userRegister, success_false }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Register);
