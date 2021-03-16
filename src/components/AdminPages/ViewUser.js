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
  Delete_false,
  EditUser,
  deleteSuccess,
}) => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    accessLevel,
  } = route.params;

  // useEffect(() => {
  //   userSave();
  // }, []);

  // const [FirstName, setFirstName] = useState(firstName);

  const confirmDelete = ({ id }) => {
    Alert.alert(
      "DELETE",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            removeUser({ id }),
              Delete_false(),
              navigation.navigate("ManageUser");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container}>
      <View>
        <TopHeaderWithGoBack
          title={`${firstName} ${lastName}`}
          navigationFunc={navigation.goBack}
        />
      </View>
      <View style={styles.image1}>
        <Feather name="user" size={60} />
      </View>

      <View style={styles.centerView}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.front}> First Name:</Text>
            <Text style={styles.txtinput}> {firstName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.front}> Last Name:</Text>
            <Text style={styles.txtinput}> {lastName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.front}> Access level:</Text>
            <Text style={styles.txtinput}> {accessLevel}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.front}> Email: </Text>
            <Text style={styles.txtinput}>{email} </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 4, alignItems: "flex-start" }}>
            <TouchableOpacity
              onPress={() => {
                confirmDelete({ id });
              }}
              style={styles.submitContainer}
            >
              <Text style={styles.link1}>Remove</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditUser", {
                  id,
                  firstName,
                  lastName,
                  accessLevel,
                })
              }
              style={styles.submitContainer}
            >
              <Text style={styles.link2}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   backgroundColor: "#ffffff",
  // },

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
    paddingTop: 50,
    height: 150,
  },

  row: {
    // marginTop: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
    paddingRight: 10,
    marginBottom: 20,
    paddingLeft: 0,
  },

  row2: {
    marginTop: -40,
    flexDirection: "column",
    alignItems: "flex-end",
    height: 20,
    marginRight: 202,
  },

  centerView: {
    paddingLeft: 20,
  },

  content: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  txtinput: {
    borderColor: "#000000",
    fontSize: 16,
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
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
    marginLeft: 20,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  front: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    flexDirection: "row",
    alignItems: "flex-start",
    // flex: 1,
  },
  link2: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 8,
  },

  submitContainer: {
    backgroundColor: "#008080",
    flexDirection: "row",
    // alignItems: 'flex-end',
    height: 40,
    width: 100,
    marginRight: 30,
    marginLeft: 15,
    marginTop: 40,
  },
  box1: {
    fontSize: 14,
    color: "#6a4595",
    paddingTop: 5,
    marginLeft: 10,
    width: 200,
    height: 30,
    backgroundColor: "#b2d8d8",
    // textAlign: "center",
  },
});

const mapStateToProps = (store) => ({
  currentLoggedInUser: store.userReducer.user,

  deleteSuccess: store.adminReducer.deleteSuccess,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ removeUser, userSave, Delete_false }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ViewUser);
