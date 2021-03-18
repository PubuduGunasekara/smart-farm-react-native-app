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
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { employeeCreate } from "../../redux/actions/adminAction";
import { bindActionCreators } from "redux";
import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

// import { KeyboardAvoidingView } from "react-native";

import { Picker } from "@react-native-community/picker";
import Icon from "react-native-vector-icons/FontAwesome5";

const AddNewUser = ({
  employeeCreate,
  createUserError,
  CreateUserSuccess,
  navigation,
  currentLoggedInUser,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [loading, setloading] = useState(false);

  const [emailValid, setemailValid] = useState(false);
  const [passwordValid, setpasswordValid] = useState(false);
  const [confirmPwValid, setconfirmPwValid] = useState(false);
  const [firstNameValid, setfirstNameValid] = useState(false);
  const [lastNameValid, setlastNameValid] = useState(false);
  const [passwordNotMatch, setpasswordNotMatch] = useState(false);
  const [emailFormatValid, setemailFormatValid] = useState(false);
  const [passwordLengthCheck, setpasswordLengthCheck] = useState(false);

  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const onCreate = async () => {
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
    } else if (password.length < 6) {
      setpasswordLengthCheck(true);
      setpasswordValid(false);
      setemailFormatValid(false);
      setemailValid(false);
      setlastNameValid(false);
      setfirstNameValid(false);
    } else if (confirmPassword === "") {
      setconfirmPwValid(true);
      setpasswordLengthCheck(false);
      setpasswordValid(false);
      setemailValid(false);
      setlastNameValid(false);
      setfirstNameValid(false);
    } else {
      setpasswordLengthCheck(false);
      setfirstNameValid(false);
      setlastNameValid(false);
      setemailValid(false);
      setpasswordValid(false);
      setconfirmPwValid(false);
      if (password !== confirmPassword) {
        setpasswordNotMatch(true);
      } else {
        setpasswordNotMatch(false);
        await employeeCreate({
          firstName,
          lastName,
          email,
          password,
          accessLevel,
          currentLoggedInUser,
        });

        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setAccessLevel("");
        setConfirmPassword("");
        if (CreateUserSuccess) {
          Alert.alert(
            "Alert",
            "New User Create successFully",
            [{ text: "OK", onPress: () => navigation.navigate("ManageUser") }],
            { cancelable: false }
          );
        }
      }
    }
  };

  const oncancel = () => {
    setpasswordNotMatch(false);
    setemailFormatValid(false);
    setfirstNameValid(false);
    setlastNameValid(false);
    setemailValid(false);
    setpasswordValid(false);
    setconfirmPwValid(false);
    setpasswordLengthCheck(false);
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  };

  if (loading) {
    return (
      <View style={[styles.spinnerContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Add New User"}
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
        <View
          style={{ marginBottom: 20, marginTop: -15, alignItems: "center" }}
        >
          <Feather name="user" size={60} />
        </View>

        <View>
          <ScrollView>
            <KeyboardAvoidingView style={styles.centerView} behavior="position">
              <TextInput
                style={[styles.inputWrap, { marginBottom: 15 }]}
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
                style={[styles.inputWrap, { marginBottom: 15 }]}
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
                style={[styles.inputWrap, { marginBottom: 15 }]}
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

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Picker
                    selectedValue={accessLevel}
                    // style={styles.picker}
                    onValueChange={(accessLevel) => setAccessLevel(accessLevel)}
                  >
                    <Picker.Item label="Admin (full access)" value="0" />
                    <Picker.Item label="Full controller access" value="1" />
                    <Picker.Item
                      label="Food controller (Water controller)"
                      value="2"
                    />
                    <Picker.Item label="Cleaning controller" value="3" />
                  </Picker>
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
                      onCreate();
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      ADD USER
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>

        {/* <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                // alignSelf: "flex-start",
                // alignContent: "flex-start",
              }}
            >
              First Name :{" "}
            </Text>
          </View>
          <View style={{ flex: 2 }}>
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
          </View>
        </View>
        {firstNameValid === true ? (
          <View>
            <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
              First name cannot be empty
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              Last Name :{" "}
            </Text>
          </View>
          <View>
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
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Email : </Text>
          </View>
          <View>
            <TextInput
              style={styles.inputWrap}
              value={email}
              placeholder="test@test.com"
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
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              Password :{" "}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 5,
              }}
            >
              <TextInput
                style={styles.inputWrap}
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
              <Icon
                style={{ marginLeft: 40 }}
                name={hidePass ? "eye-slash" : "eye"}
                size={20}
                color="grey"
                onPress={() => setHidePass(!hidePass)}
              />
            </View>

            {passwordValid === true ? (
              <View>
                <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                  Password cannot be empty
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              Confirm Password :{" "}
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.inputWrap}
              value={confirmPassword}
              placeholder="Confirm password"
              secureTextEntry={hidePass ? true : false}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              blurOnSubmit={true}
              keyboardAppearance="default"
            />
            {passwordNotMatch === true ? (
              <View>
                <Text style={{ color: "#dc0000", fontWeight: "bold" }}>
                  Password not match
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
          </View>
        </View>

        <View
          style={{ flexDirection: "row", marginBottom: 15, marginTop: -30 }}
        >
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={accessLevel}
              // style={styles.picker}
              onValueChange={(accessLevel) => setAccessLevel(accessLevel)}
            >
              <Picker.Item label="Admin (full access)" value="0" />
              <Picker.Item label="Full controller access" value="1" />
              <Picker.Item
                label="Food controller (Water controller)"
                value="2"
              />
              <Picker.Item label="Cleaning controller" value="3" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: -10, marginBottom: 0 }}>
          <View style={{ flex: 1, marginRight: 15 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => navigation.navigate("ManageUser")}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                onCreate();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    // flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    fontSize: 16,
  },
});

const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,

  createUserError: store.CreateUserReducer.createUserError,
  CreateUserSuccess: store.CreateUserReducer.CreateUserSuccess,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ employeeCreate }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AddNewUser);
