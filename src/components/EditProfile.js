import _ from "lodash";
import React, { Component } from "react";
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
import firebase from "firebase";
import {
  employeeUpdate,
  employeeSave,
  employeeSaveSuccess,
  employeeFetch,
} from "../redux/actions/EmployeeAction";
import TopHeaderWithGoBack from "../../src/components/helperComponents/topHeaderWithGoBack";

class EmployeeEdit extends Component {
  componentDidMount() {
    // const { CurrentUser } = firebase.auth();
    // const { firstname, lastname, email } = this.props;

    // this.props.employeeFetch({ firstname });

    _.each(this.props.employee, (props, value) => {
      this.props.employeeUpdate({ props, value });
    });
  }

  onButtonPress = async () => {
    const { firstName, lastName, email } = this.props;
    if (firstName === "" || lastName === "") {
      Alert.alert("Alert", "please insert field correctly");
    } else {
      this.props.employeeSave({
        firstName,
        lastName,
        email,
      });
    }
    if (employeeSaveSuccess) {
      Alert.alert(
        "Alert",
        "User has been updated successfully.",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("ViewProfile"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <View>
        <TopHeaderWithGoBack
          title={"Edit Profile"}
          navigationFunc={this.props.navigation.goBack}
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
                First Name :{" "}
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.TextInput}
                label="First Name"
                placeholder="firstname"
                value={this.props.firstName}
                onChangeText={(value) =>
                  this.props.employeeUpdate({ prop: "firstName", value })
                }
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
                Last Name :{" "}
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.TextInput}
                label="Last Name"
                placeholder="lastname"
                value={this.props.lastName}
                onChangeText={(value) =>
                  this.props.employeeUpdate({ prop: "lastName", value })
                }
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Email : </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ChangeEmail")}
              >
                <Text style={styles.link}> Change Email</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                password :{" "}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ChangePassword")}
              >
                <Text style={styles.link}> Change password</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}
          >
            <View style={{ flex: 1, marginRight: 15 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#008080",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => this.props.navigation.navigate("ViewProfile")}
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
                onPress={this.onButtonPress.bind(this)}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

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

const mapStateToProps = (state) => {
  const { firstName, lastName, email } = state.employee;

  return { firstName, lastName, email };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeFetch,
})(EmployeeEdit);
