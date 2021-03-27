import _ from "lodash";

import React, { useState, useEffect } from "react";
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
import { Picker } from "@react-native-community/picker";

import { connect } from "react-redux";

import {
  userSave,
  employeeSaveSuccess,
  success_false,
} from "../../redux/actions/adminAction";
import { bindActionCreators } from "redux";
import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";

const EditUser = ({
  route,
  userSave,
  user,
  navigation,
  success_false,
  user_save_success,
}) => {
  const { id, firstName, lastName, accessLevel } = route.params;
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [AccessLevel, setAccessLevel] = useState("");
  // const [loading, setloading] = useState(false);

  useEffect(() => {
    setFirstName(firstName);
    setLastName(lastName);
    setAccessLevel(accessLevel);
  }, [firstName, lastName, accessLevel]);

  const onSave = async () => {
    if (FirstName === "" || LastName === "" || AccessLevel === "") {
      Alert.alert("Alert", "please insert field correctly");
    } else {
      await userSave({
        FirstName,
        LastName,
        id,
        email,
        // password,
        AccessLevel,
      });

      setFirstName("");
      setLastName("");

      setEmail("");
    }
  };

  if (user_save_success === true) {
    Alert.alert(
      "Alert",
      "User has been saved successfully",
      [
        {
          text: "OK",
          onPress: () => {
            success_false(), navigation.navigate("ManageUser");
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Edit User"}
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
          padding: 30,
          margin: 20,
          marginTop: 20,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginBottom: 30, alignItems: "center" }}>
          <Feather name="user" size={60} />
        </View>

        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                // alignSelf: "flex-start",
                // alignContent: "flex-start",
              }}
            >
              First Name:{" "}
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.TextInput}
              label="First Name"
              placeholder="firstname"
              value={FirstName}
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                alignSelf: "flex-start",
              }}
            >
              Last Name:{" "}
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.TextInput}
              label="Last Name"
              placeholder="lastname"
              value={LastName}
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
        </View>

        {/* <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Email : </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.link}> Change Email</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={AccessLevel}
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

        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
          <View style={{ flex: 1, marginRight: 15 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => navigation.navigate("ViewUser")}
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
                onSave();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderBottomWidth: 0.5,
    fontSize: 18,
  },

  link: {
    fontSize: 18,
    // fontWeight: "bold",
    // marginLeft: 17,
    color: "blue",
    fontWeight: "600",
    borderBottomWidth: 0.5,
    // padding: 5,
    // marginTop: 15,
    // paddingBottom: 10,
  },
});

const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,
  user: store.editUserReducer.user,
  user_save_success: store.editUserReducer.user_save,
});

//

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userSave, success_false }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(EditUser);
