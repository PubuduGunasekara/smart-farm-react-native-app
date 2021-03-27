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

const ChangeEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newemail, setnewEmail] = useState("");

  const [emailValid, setemailValid] = useState(false);
  const [emailFormatValid, setemailFormatValid] = useState(false);

  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState("");

  const [loading, setloading] = useState(false);

  const [success, setSuccess] = useState(false);

  function reauthenticate(password) {
    var user = firebase.auth().currentUser;
    var credintials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    // console.log(password);
    return user.reauthenticateWithCredential(credintials);
  }

  //   changeEmail = (password,newEmail) => {
  //     console.log(password);
  //     const db = firebase.firestore();

  //     reauthenticate(password)
  //       .then(() => {
  //         var user = firebase.auth().currentUser;
  //         user
  //         .updateEmail(newEmail)

  //           .then(() => {
  //             // console.log("Password updated!");
  //             Alert.alert("email updated successfully");
  //             db.collection("user")
  //               .doc(firebase.auth().currentUser.uid)
  //               .update({ email: newEmail });
  //           })
  //           .catch((error) => {
  //             Alert.alert(error.message);
  //           });
  //       })
  //       .catch((error) => {
  //         Alert.alert(error.message);
  //       });
  //     // console.log("press");
  //   };

  //   changeEmail = (currentPassword, newEmail) => {
  //     this.reauthenticate(currentPassword)
  //       .then(() => {
  //         var user = firebase.auth().currentUser;
  //         user
  //           .updateEmail(newEmail)
  //           .then(() => {
  //             console.log("Email updated!");
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  const onCreate = async (newemail, password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      setemailValid(true);
    } else if (reg.test(email) === false) {
      setemailFormatValid(true);
      setemailValid(false);
    } else {
      setloading(true);
      const db = firebase.firestore();
      console.log(password, newemail);
      await reauthenticate(password)
        .then(() => {
          var user = firebase.auth().currentUser;
          user
            .updateEmail(newemail)

            .then(() => {
              setSuccess(true);
              setloading(false);
              // console.log("Password updated!");
              // Alert.alert("password updated successfully");

              db.collection("user")
                .doc(firebase.auth().currentUser.uid)
                .update({ email: newemail });
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
  };

  if (success === true) {
    Alert.alert(
      "EMAIL UPDATED",
      "EMAIL UPDATED SUCCESS.",
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
    setEmail("");
    setnewEmail("");
    setPassword("");
  }

  const oncancel = () => {
    setPassword("");
    setEmail("");
    setnewEmail("");
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
          title={"Change Email"}
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
                    value={email}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={true}
                    keyboardAppearance="default"
                  />
                </View>
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

                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={[styles.inputWrap, { marginBottom: 15, flex: 7 }]}
                    value={newemail}
                    placeholder="New email"
                    onChangeText={(password) => setnewEmail(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={true}
                    keyboardAppearance="default"
                  />
                </View>

                {emailValid === true ? (
                  <View>
                    <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                      New Email cannot be empty
                    </Text>
                  </View>
                ) : null}
                {emailFormatValid === true ? (
                  <View>
                    <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                      Wrong New Email
                    </Text>
                  </View>
                ) : null}

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
                        onCreate(newemail, password);
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        SUBMIT
                      </Text>
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

export default ChangeEmail;
