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
import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";

import { userSave } from "../../redux/actions/adminAction";
import { bindActionCreators } from "redux";

import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";

const EditUser = ({ route, userSave, user, navigation }) => {
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
    await userSave({
      FirstName,
      LastName,
      id,
      email,
      // password,
      AccessLevel,
      // currentLoggedInUser,
    });
    console.log(FirstName, LastName, AccessLevel, id);

    setFirstName("");
    setLastName("");

    setEmail("");
  };

  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container}>
      <View>
        <TopHeaderWithGoBack
          title={`${firstName} ${lastName}`}
          navigationFunc={navigation.goBack}
        />
      </View>
      <View style={styles.outterbox}>
        <View style={styles.row}>
          <TouchableOpacity>
            <View style={styles.image1}>
              <Feather name="user" size={50} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.centerView}>
          <View style={styles.row}>
            <Text style={styles.front}>Access level: </Text>
            <Picker
              selectedValue={AccessLevel}
              style={styles.picker}
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

          <View style={styles.row}>
            <Text style={styles.front}> First Name:</Text>
            <View style={styles.inputWrap}>
              <TextInput
                label="First Name"
                placeholder="firstname"
                value={FirstName}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.front}> Last Name:</Text>
            <View style={styles.inputWrap}>
              <TextInput
                label="Last Name"
                placeholder="lastname"
                value={LastName}
                onChangeText={(lastName) => setLastName(lastName)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.front}> Email:</Text>
            <TouchableOpacity>
              <Text style={styles.link}> Change Email</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  onSave();
                }}
                style={styles.submitContainer}
              >
                <Text style={styles.link1}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row2}>
            <TouchableOpacity style={styles.submitContainer}>
              <Text style={styles.link2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    paddingLeft: 160,
    paddingTop: 60,
    height: 120,
  },

  row: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
    paddingRight: 60,
    marginBottom: 30,
  },

  row2: {
    marginTop: -50,
    flexDirection: "column",
    alignItems: "flex-end",
    height: 20,
    marginRight: 202,
    paddingBottom: 300,
  },

  centerView: {
    paddingTop: 90,
    paddingLeft: 50,
  },

  inputWrap: {
    flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 0.8,
    marginRight: 10,
  },

  txtinput: {
    borderColor: "#000000",
    fontSize: 16,
  },

  outterbox: {
    //height:500,
    width: 380,
  },

  link: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 1,
    textDecorationLine: "underline",
  },

  link1: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  front: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  link2: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 40,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    // alignItems: 'flex-end',
    height: 40,
    width: 135,
    marginLeft: 155,
  },
  picker: {
    width: 150,
    marginTop: -13,
  },
});
const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,
  user: store.editUserReducer.user,
  // CreateUserSuccess: store.CreateUserReducer.CreateUserSuccess,
});

//

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userSave }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(EditUser);
