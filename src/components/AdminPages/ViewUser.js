import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  removeUser,
  userSave,
  Delete_false,
} from "../../redux/actions/adminAction";

const ViewUser = ({
  route,
  navigation,
  removeUser,
  EditUser,
  deleteSuccess,
  Delete_false,
  loading,
}) => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    accessLevel,
  } = route.params;

  const userRemove = ({ id }) => {
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
            removeUser({ id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (deleteSuccess === true) {
    Alert.alert(
      "SUCCESS",
      "User has been removed successfully.",
      [
        {
          text: "OK",
          onPress: () => {
            Delete_false(), navigation.navigate("ManageUser");
          },
        },
      ],
      { cancelable: false }
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return (
    <View>
      <TopHeaderWithGoBack
        title={"View User"}
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
          marginTop: 30,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginBottom: 50, alignItems: "center" }}>
          <Feather name="user" size={60} />
        </View>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
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
            <Text style={styles.textStyle}>{firstName}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
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
            <Text style={styles.textStyle}>{lastName}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              AccessLevel :{" "}
            </Text>
          </View>
          <View>
            <Text style={styles.textStyle}>{accessLevel}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Email : </Text>
          </View>
          <View>
            <Text style={styles.textStyle}>{email}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 90, marginBottom: 40 }}>
          <View style={{ flex: 1, marginRight: 25 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                userRemove({ id: id });
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Remove</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 25 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() =>
                navigation.navigate("EditUser", {
                  id,
                  firstName,
                  lastName,
                  accessLevel,
                })
              }
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
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

const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,
  loading: store.loadinReducer.loading,
  deleteSuccess: store.adminReducer.deleteSuccess,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ removeUser, userSave, Delete_false }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ViewUser);
