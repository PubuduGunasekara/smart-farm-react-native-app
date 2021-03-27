import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Picker } from "@react-native-community/picker";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  userApprove,
  deleteUser,
  delete_false,
  error_false,
  approve_false,
} from "../../redux/actions/userRequestReview";

import TopHeaderWithGoBack from "../../components/helperComponents/topHeaderWithGoBack";

const styles = StyleSheet.create({
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

const viewSingleUserRequest = ({
  route,
  navigation,
  userApprove,
  deleteUser,
  currentLoggedInUser,
  useRequestError,
  approveSuccess,
  delete_false,
  deleteSuccess,
  error_false,
  approve_false,
  loading,
}) => {
  const { id, firstName, lastName, email, password } = route.params;
  const [accessLevel, setAccessLevel] = useState("");

  const userApproveFunc = async () => {
    if (accessLevel === "4" || accessLevel === "") {
      return alert("Please select Work group.");
    } else {
      await userApprove({
        id,
        firstName,
        lastName,
        email,
        password,
        accessLevel,
        currentLoggedInUser,
      });
    }
  };

  const userRejectFunc = () => {
    Alert.alert(
      "WARNING",
      "This operation will permanently delete the user. Are you sure to do this?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteUser({ id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  if (useRequestError !== false) {
    Alert.alert(
      "ERROR",
      `${useRequestError}`,
      [
        {
          text: "OK",
          onPress: () => {
            error_false(), navigation.navigate("ApproveUser");
          },
        },
      ],
      { cancelable: false }
    );
  }

  // if (approveSuccess !== false) {
  //   Alert.alert(
  //     "SUCCESS",
  //     "User request has been approved sucessfully.",
  //     [
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           approve_false(), navigation.navigate("ApproveUser");
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // }

  if (deleteSuccess) {
    Alert.alert(
      "SUCCESS",
      "DELETE SUCCESSFULLY",
      [
        {
          text: "OK",
          onPress: () => {
            delete_false(), navigation.navigate("ApproveUser");
          },
        },
      ],
      { cancelable: false }
    );
  }

  const submitWorkGroupLevel = (itemValue) => {
    if (itemValue === "4") {
      return alert("Please select Work group.");
    } else {
      setAccessLevel(itemValue);
    }
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Approve User"}
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
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              First Name :{" "}
            </Text>
          </View>
          <View>
            <Text>{firstName}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Last Name :{" "}
            </Text>
          </View>
          <View>
            <Text>{lastName}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Email : </Text>
          </View>
          <View>
            <Text>{email}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={accessLevel}
              onValueChange={(itemValue, itemIndex) =>
                submitWorkGroupLevel(itemValue)
              }
              color="#008080"
              style={{ margin: 0, padding: 0 }}
            >
              <Picker.Item
                style={{ fontWeight: "bold", fontSize: 15 }}
                label="Select Access Level"
                value="4"
              />
              <Picker.Item label="Admin (full access)" value="0" />
              <Picker.Item label="Controller Admin Level" value="1" />
              <Picker.Item label="Food & Water controller Level" value="2" />
              <Picker.Item label="Cleaning Controller Level" value="3" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 25 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                userRejectFunc();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>REJECT</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 25 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                userApproveFunc();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>APPROVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,
  useRequestError: store.adminReducer.useRequestError,
  approveSuccess: store.adminReducer.approveSuccess,
  deleteSuccess: store.adminReducer.deleteSuccess,
  loading: store.loadinReducer.loading,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { userApprove, deleteUser, delete_false, error_false, approve_false },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchProps
)(viewSingleUserRequest);
