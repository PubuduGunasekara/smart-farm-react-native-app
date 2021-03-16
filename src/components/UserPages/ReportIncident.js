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
  ActivityIndicator,
  Alert,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { Picker } from "@react-native-community/picker";
import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  submitIncident,
  success_false,
} from "../../redux/actions/incidentAction";

const ReportIncident = ({
  incidentSuccess,
  currentLoggedInUser,
  navigation,
  submitIncident,
  loading,
  success_false,
}) => {
  const [issuetype, setIssueType] = useState("");
  const [message, setMessage] = useState("");

  const onsubmit = async () => {
    if (issuetype === "") {
      alert("Please select the type");
    } else if (message === "") {
      alert("Please insert the message");
    } else {
      await submitIncident({
        message,
        issuetype,
        accessLevel: currentLoggedInUser.accessLevel,
        firstName: currentLoggedInUser.firstName,
        lastName: currentLoggedInUser.lastName,
      });
      setIssueType("");
      setMessage("");
    }
  };

  if (incidentSuccess === true) {
    Alert.alert(
      "SUCCESS",
      "Incident reported successfully.",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => (success_false(), navigation.navigate("Home")),
        },
      ],
      { cancelable: false }
    );
  }

  const submitIssueType = (issueType) => {
    if (issueType === "" || issueType === undefined) {
      alert("please select the type.");
    } else {
      setIssueType(issueType);
    }
  };

  if (loading) {
    return (
      <View style={[styles.containerLoading, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <View
        style={{
          flexDirection: "row",
          alignContent: "stretch",
          marginTop: 5,
        }}
      >
        <View style={{ alignItems: "stretch", marginLeft: 20 }}></View>
        <View style={{ alignItems: "stretch" }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 0,
              paddingLeft: 0,
              marginTop: 3,
            }}
          >
            Report Incident
          </Text>
        </View>
      </View>

      <View contentContainerStyle={styles.container}>
        <View style={styles.outter}>
          <View style={styles.centerView}>
            <View style={styles.row}>
              <Text style={styles.text}>Incident type: </Text>
              <Picker
                selectedValue={issuetype}
                style={styles.picker}
                onValueChange={(issueType) => submitIssueType(issueType)}
              >
                <Picker.Item label="Select Type" value="" />
                <Picker.Item label="Water" value="water" />
                <Picker.Item label="Food " value="Food" />
                <Picker.Item label="Gate " value="Gate" />
                <Picker.Item label="Cleaning " value="Cleaning" />
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.messagebox}>
              <TextInput
                editable
                multiline={true}
                numberOfLines={6}
                maxHeight={80}
                value={message}
                placeholder="Enter message"
                onChangeText={(text) => setMessage(text)}
              />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <View style={styles.row}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onsubmit();
                  }}
                  style={styles.submitContainer}
                >
                  <Text style={styles.link1}>Submit</Text>
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
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
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
  },

  text1: {
    fontSize: 18,
    flex: 3,
  },
  txtinput: {
    fontSize: 16,
    marginLeft: 10,
  },

  image1: {
    height: 100,
    paddingLeft: 160,
    paddingTop: 50,
  },

  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
    paddingRight: 50,
    marginBottom: 30,
  },

  row2: {
    marginTop: -50,
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 222,
  },

  outter: {
    marginLeft: 45,
    marginTop: 80,
  },

  text: {
    fontWeight: "bold",
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
    marginLeft: 18,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },
  messagebox: {
    marginLeft: 3,
    width: 255,
    height: 100,
    backgroundColor: "#b2d8d8",
  },
  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    // alignItems: 'flex-end',
    height: 40,
    width: 90,
    marginLeft: 168,
    marginBottom: 100,
    marginTop: 60,
  },

  picker: {
    width: 150,
    marginTop: -10,
    flex: 3,
  },
});

const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,
  incidentSuccess: store.incidentReducer.incidentSuccess,
  loading: store.loadinReducer.loading,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ submitIncident, success_false }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ReportIncident);
