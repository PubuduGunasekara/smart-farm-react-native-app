import React, { useState } from "react";
import { View, Text, Picker, Button, Alert } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userApprove, deleteUser } from "../../redux/actions/userRequestReview";

const viewSingleUserRequest = ({
  route,
  navigation,
  userApprove,
  deleteUser,
  currentLoggedInUser,
  useRequestError,
  approveSuccess,
  deleteSuccess,
}) => {
  const [accessLevel, setAccessLevel] = useState("");

  const userApproveFunc = async () => {
    await userApprove({
      id,
      firstName,
      lastName,
      email,
      password,
      accessLevel,
      currentLoggedInUser,
    });
    console.log(approveSuccess);
    // if (approveSuccess) {
    //   Alert.alert(
    //     "SUCCESS",
    //     "APPROVED SUCCESSFULLY",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel",
    //       },
    //       { text: "OK", onPress: () => navigation.navigate("ApproveUser") },
    //     ],
    //     { cancelable: false }
    //   );
    // }
    console.log(useRequestError);
    if (useRequestError) {
      Alert.alert(
        "ERROR",
        "ERROR occured",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate("ApproveUser") },
        ],
        { cancelable: false }
      );
    }

    //console.log("from veiw", useRequestError);
    // if (useRequestError) {
    //   alert("Error occured");
    // }
    //console.log(accessLevel);
  };

  const userRejectFunc = () => {
    deleteUser({ id });
    console.log(deleteSuccess);
    if (deleteSuccess) {
      Alert.alert(
        "SUCCESS",
        "DELETE SUCCESSFULLY",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate("ApproveUser") },
        ],
        { cancelable: false }
      );
    }
  };

  const { id, firstName, lastName, email, password } = route.params;
  console.log(
    id,
    firstName,
    lastName,
    email,
    password,
    accessLevel,
    currentLoggedInUser
  );
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ID: {id}</Text>
      <Text>First Name: {firstName}</Text>
      <Text>Password: {password}</Text>
      <Text>ast Name: {lastName}</Text>
      <Text>Email: {email}</Text>

      <Picker
        selectedValue={accessLevel}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setAccessLevel(itemValue)}
      >
        <Picker.Item label="Admin (full access)" value="0" />
        <Picker.Item label="Full controller access" value="1" />
        <Picker.Item label="Food controller (Water controller)" value="2" />
        <Picker.Item label="Cleaning controller" value="3" />
      </Picker>
      <Button
        title="Approve user"
        onPress={() => {
          userApproveFunc();
        }}
      />
      <Button
        title="Reject user"
        onPress={() => {
          userRejectFunc();
        }}
      />
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,
  useRequestError: store.adminReducer.useRequestError,
  approveSuccess: store.adminReducer.approveSuccess,
  deleteSuccess: store.adminReducer.deleteSuccess,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userApprove, deleteUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchProps
)(viewSingleUserRequest);
