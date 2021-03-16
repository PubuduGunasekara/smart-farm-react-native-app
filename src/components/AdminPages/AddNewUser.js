import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { employeeCreate } from "../../redux/actions/adminAction";

import { bindActionCreators } from "redux";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";
import { KeyboardAvoidingView } from "react-native";

import { Picker } from "@react-native-community/picker";

const AddNewUser = ({
  employeeCreate,
  createUserError,
  CreateUserSuccess,
  navigation,
  currentLoggedInUser,
}) => {
  //   onButtonPress() {
  //     const { firstName, lastName, email, password, accessLevel } = this.props;

  //     this.props.employeeCreate({
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       accessLevel,
  //     });
  //   }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [loading, setloading] = useState(false);

  const onCreate = async () => {
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
  };

  if (loading) {
    return (
      <View style={[styles.spinnerContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const oncancel = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setEmail("");
    setAccessLevel("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container}>
      <View>
        <TopHeaderWithGoBack
          title={"Add new user"}
          navigationFunc={navigation.goBack}
        />
      </View>
      {/* <View>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View> */}

      <View style={styles.row}>
        <TouchableOpacity>
          <View style={styles.image1}>
            <Feather name="user" size={50} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.centerView}>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={{ fontSize: 18 }}
              value={firstName}
              placeholder="First name"
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={{ fontSize: 18 }}
              value={lastName}
              placeholder="Last name"
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={{ fontSize: 18 }}
              value={email}
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.text1} fl>
            Access level:{" "}
          </Text>

          <Picker
            selectedValue={accessLevel}
            style={styles.picker}
            onValueChange={(accessLevel) => setAccessLevel(accessLevel)}
          >
            <Picker.Item label="Admin (full access)" value="0" />
            <Picker.Item label="Full controller access" value="1" />
            <Picker.Item label="Food controller (Water controller)" value="2" />
            <Picker.Item label="Cleaning controller" value="3" />
          </Picker>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              value={password}
              placeholder="Password"
              style={{ fontSize: 18 }}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={{ fontSize: 18 }}
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(password) => setConfirmPassword(password)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <TouchableOpacity
              onPress={() => {
                onCreate();
              }}
              style={styles.submitContainer}
            >
              <Text style={styles.link1}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => {
              oncancel();
            }}
          >
            <Text style={styles.link2}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// const mapStateToProps = (state) => {
//   //employeeForm is coming from reducers index.js
//   const { firstName, lastName, email, password, accessLevel } = state.employee;

//   return { firstName, lastName, email, password, accessLevel };
// };

// export default connect(mapStateToProps, {
//   employeeUpdate,
//   employeeCreate,
// })(AddNewUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  text1: {
    fontSize: 18,
    flex: 3,
  },

  image1: {
    height: 90,
    paddingLeft: 160,
    paddingTop: 10,
  },

  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
    paddingRight: 50,
    marginBottom: 20,
  },

  row2: {
    marginTop: -40,
    flexDirection: "column",
    alignItems: "flex-end",
    height: 20,
    marginRight: 230,
    paddingBottom: 180,
  },

  centerView: {
    paddingTop: 70,
    paddingLeft: 40,
  },

  inputWrap: {
    flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    // fontSize: 28,
  },

  txtinput: {
    borderColor: "#000000",
    borderBottomWidth: 0.5,
    fontSize: 28,
  },

  link1: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 27,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  link2: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 18,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    // alignItems: 'flex-end',
    height: 40,
    width: 90,
    marginLeft: 172,
    marginBottom: 90,
    marginTop: 30,
  },
  picker: {
    width: 150,
    marginTop: -13,
    flex: 4,
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
