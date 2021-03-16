import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  // ScrollView,
  StatusBar,
  TextInput,
  Alert,
  // FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { viewAllUser } from "../../redux/actions/adminAction";
import { bindActionCreators } from "redux";
import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";

const ManageUser = ({
  viewUserList,
  viewAllUser,
  loading,
  userEmpty,
  navigation,
}) => {
  useEffect(() => {
    // return () => {
    navigation.addListener("blur", () => {
      viewAllUser();
    });
    navigation.addListener("focus", () => {
      viewAllUser();
    });

    viewAllUser();
  }, []);

  if (loading) {
    return (
      <View style={[styles.containerLoading, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return (
    <View>
      <View>
        <TopHeaderWithGoBack
          title={"Manage users"}
          navigationFunc={navigation.goBack}
        />
      </View>

      <View style={styles.submitContainer2}>
        <TouchableOpacity onPress={() => navigation.navigate("AddNewUser")}>
          <Text style={styles.link1}>Add New User</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* <View style={styles.centerContent}></View> */}
        <View>
          <FlatList
            data={viewUserList}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  backgroundColor: "#b2d8d8",
                  padding: 10,
                }}
              >
                <View style={{ flex: 3, alignItems: "flex-start" }}>
                  <Text style={styles.front}>
                    {item.firstName} {item.lastName}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ViewUser", {
                        id: item.key,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        password: item.password,
                        accessLevel: item.accessLevel,
                      });
                    }}
                    style={{ backgroundColor: "#008080" }}
                  >
                    <Text style={styles.link1}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
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
    height: "90%",
    backgroundColor: "#ffffff",
    padding: 20,
  },

  text1: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: "center",
    // padding: 30,
    paddingLeft: 150,
    paddingTop: 10,
  },

  // image1: {
  //   paddingLeft: 160,
  //   paddingTop: 50,
  //   height: 120,
  // },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,

    // flex: 4,
  },

  row2: {
    marginTop: -50,
    flexDirection: "column",
    alignItems: "flex-end",
    height: 20,
    marginRight: 140,
  },

  centerView: {
    paddingTop: 10,
    // padding: 80,
    marginLeft: 20,
    marginRight: 20,
  },

  // centerContent: {
  //   padding: 50,
  //   paddingTop: 10,
  // },

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
    padding: 10,
    paddingLeft: 15,
    color: "#ffffff",
    justifyContent: "center",
  },

  front: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    padding: 10,
    justifyContent: "center",
    // flex: 1,
  },

  submitContainer: {
    backgroundColor: "#008080",
    // flexDirection: "row",
    // alignItems: 'flex-end',

    // marginLeft: 150,
    textAlign: "center",
  },
  submitContainer2: {
    backgroundColor: "#008080",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 20,
  },
});
const mapStateToProps = (store) => ({
  viewUserList: store.adminReducer.viewUserList,
  loading: store.loadinReducer.loading,
  userEmpty: store.adminReducer.userEmpty,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ viewAllUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ManageUser);
