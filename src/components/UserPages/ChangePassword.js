import React, { useState } from "react";
import firebase from "firebase";

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
import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

// import { KeyboardAvoidingView } from "react-native";

import { Picker } from "@react-native-community/picker";
import Icon from "react-native-vector-icons/FontAwesome5";

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setloading] = useState(false);

  const [passwordValid, setpasswordValid] = useState(false);
  const [confirmPwValid, setconfirmPwValid] = useState(false);

  const [passwordNotMatch, setpasswordNotMatch] = useState(false);
  const [passwordLengthCheck, setpasswordLengthCheck] = useState(false);

  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [hidenewPass, setHidenewPass] = useState(true);
  const [success, setSuccess] = useState(false);

  function reauthenticate(password) {
    var user = firebase.auth().currentUser;
    var credintials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    // console.log(password);
    return user.reauthenticateWithCredential(credintials);
  }

  // changePassword = (newpassword) => {
  //   console.log(newpassword);
  //   const db = firebase.firestore();

  //   reauthenticate(password)
  //     .then(() => {
  //       var user = firebase.auth().currentUser;
  //       user
  //         .updatePassword(newpassword)

  //         .then(() => {
  //           // console.log("Password updated!");
  //           Alert.alert("password updated successfully");
  //           db.collection("user")
  //             .doc(firebase.auth().currentUser.uid)
  //             .update({ password: newpassword });
  //         })
  //         .catch((error) => {
  //           Alert.alert(error.message);
  //         });
  //     })
  //     .catch((error) => {
  //       Alert.alert(error.message);
  //     });
  //   // console.log("press");
  // };

  const onCreate = async (newpassword) => {
    if (password === "") {
      setpasswordValid(true);
    } else if (password.length < 6) {
      setpasswordLengthCheck(true);
      setpasswordValid(false);
    } else if (confirmPassword === "") {
      setconfirmPwValid(true);
      setpasswordLengthCheck(false);
      setpasswordValid(false);
    } else {
      setpasswordLengthCheck(false);

      setpasswordValid(false);
      setconfirmPwValid(false);
      if (newpassword !== confirmPassword) {
        setpasswordNotMatch(true);
      } else {
        setpasswordNotMatch(false);
        setloading(true);
        const db = firebase.firestore();

        await reauthenticate(password)
          .then(() => {
            var user = firebase.auth().currentUser;
            user
              .updatePassword(newpassword)

              .then(() => {
                // console.log("Password updated!");
                // Alert.alert("password updated successfully");
                setSuccess(true);
                setloading(false);
                db.collection("user")
                  .doc(firebase.auth().currentUser.uid)
                  .update({ password: newpassword });
              })
              .catch((error) => {
                setloading(false);
                Alert.alert(error.message);
              });
          })
          .catch((error) => {
            setloading(false);
            Alert.alert(
              "ERROR",
              `${error.message}`,
              [
                // {
                //   text: "Cancel",
                //   onPress: () => console.log("Cancel Pressed"),
                //   style: "cancel",
                // },
                {
                  text: "OK",
                },
              ],
              { cancelable: true }
            );
            // Alert.alert(error.message);
          });
        // console.log("press");
      }
    }
  };

  if (success === true) {
    Alert.alert(
      "PASSWORD UPDATED",
      "PASSWORD UPDATED SUCCESS.",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => (
            setSuccess(false), navigation.navigate("ViewProfile")
          ),
        },
      ],
      { cancelable: false }
    );
    setSuccess(false);
    setPassword("");
    setConfirmPassword("");
    setnewpassword("");
  }

  const oncancel = () => {
    setpasswordNotMatch(false);

    setpasswordValid(false);
    setconfirmPwValid(false);
    setpasswordLengthCheck(false);

    setPassword("");
    setConfirmPassword("");
    setnewpassword("");
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <TopHeaderWithGoBack
          title={"Change password"}
          navigationFunc={navigation.goBack}
        />
        <View
          style={{
            backgroundColor: "#b2d8d8",
            borderWidth: 1,
            borderRadius: 1,
            borderColor: "#ddd",
            borderBottomWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 3,
            padding: 20,
            margin: 20,
            marginTop: 10,
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <ScrollView>
              <KeyboardAvoidingView
                style={styles.centerView}
                behavior="position"
              >
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={[styles.inputWrap, { marginBottom: 15, flex: 7 }]}
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
                      alignSelf: "flex-start",
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

                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={[styles.inputWrap, { marginBottom: 15, flex: 7 }]}
                    value={newpassword}
                    placeholder="New password"
                    secureTextEntry={hidenewPass ? true : false}
                    onChangeText={(password) => setnewpassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={true}
                    keyboardAppearance="default"
                  />
                  <View
                    style={{
                      alignItems: "flex-end",
                      alignSelf: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Icon
                      name={hidenewPass ? "eye-slash" : "eye"}
                      size={20}
                      color="grey"
                      onPress={() => setHidenewPass(!hidenewPass)}
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
                {passwordLengthCheck === true ? (
                  <View>
                    <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                      Password must be greater than six characters
                    </Text>
                  </View>
                ) : null}

                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={[styles.inputWrap, { marginBottom: 15, flex: 7 }]}
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
                      alignSelf: "flex-start",
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
                      onPress={() => oncancel()}
                    >
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        CANCEL
                      </Text>
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
                        onCreate(newpassword);
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 16 }}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    // flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default ChangePassword;
