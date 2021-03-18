import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
} from "react-native";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import firebase from "firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckShiftDate } from "../../redux/actions/shiftActions/checkShiftDate";

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

  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  btnBox: {
    color: "#6a4595",
    paddingTop: 10,
    height: 45,
    backgroundColor: "#b2d8d8",
    alignItems: "center",
    marginBottom: 20,
  },
});

const Home = ({
  navigation,
  currentUser,
  CheckShiftDate,
  shiftDateStatus,
  loading,
}) => {
  useEffect(() => {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var shiftDate = day + "-" + month + "-" + year;

    // CheckShiftDate({ shiftDate });
    // navigation.addListener("blur", () => {
    //   CheckShiftDate({ shiftDate });
    // });
    navigation.addListener("focus", () => {
      CheckShiftDate({ shiftDate });
    });

    //notification permission
    () => registerForPushNotificationsAsync();
  }, [currentUser, navigation]);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    console.log(token);
    //update notifi token
    const res = await firebase.firestore
      .collection("user")
      .doc(currentUser.uid)
      .update({
        expoNotificationToken: token,
      });

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  function levelZero() {
    return (
      <ScrollView style={{ margin: 30 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CleaningController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Cleaning Controller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FoodController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Food Controller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GateController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Gate Controller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WaterController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Water Controller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ApproveUser");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Approve User</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ManageUser");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Manage User</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ShiftAllocation");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Shift Allocation</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ViewAllShifts");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>All Shifts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ShiftChangeRequests");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Shift Change Requests</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  function levelOne() {
    return (
      <ScrollView style={{ margin: 30 }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CleaningController");
            }}
          >
            <View style={styles.btnBox}>
              <Text style={styles.text}>Cleaning Controller</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FoodController");
            }}
          >
            <View style={styles.btnBox}>
              <Text style={styles.text}>Food Controller</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GateController");
            }}
          >
            <View style={styles.btnBox}>
              <Text style={styles.text}>Gate Controller</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WaterController");
            }}
          >
            <View style={styles.btnBox}>
              <Text style={styles.text}>Water Controller</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  function levelThree() {
    return (
      <ScrollView style={{ margin: 30 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CleaningController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Cleaning Controller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GateController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Gate Controller</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  function levelTwo() {
    return (
      <ScrollView style={{ margin: 30 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FoodController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Food Controller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GateController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Gate Controller</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WaterController");
          }}
        >
          <View style={styles.btnBox}>
            <Text style={styles.text}>Water Controller</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  function showMessage() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Text style={styles.text}>
          You don not have a shift today.Please check your shift details.
        </Text>
      </View>
    );
  }

  function selectHomeStack() {
    if (currentUser.accessLevel === "0") {
      return levelZero();
    }

    if (shiftDateStatus) {
      if (currentUser.accessLevel === "1" && shiftDateStatus.length >= 1) {
        return levelOne();
      } else if (
        currentUser.accessLevel === "2" &&
        shiftDateStatus.length >= 1
      ) {
        return levelTwo();
      } else if (
        currentUser.accessLevel === "3" &&
        shiftDateStatus.length >= 1
      ) {
        return levelThree();
      } else {
        return showMessage();
      }
    }
  }

  return <View>{selectHomeStack()}</View>;
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
  shiftDateStatus: store.shiftReducer.shiftDateStatus,
  loading: store.loadinReducer.loading,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      CheckShiftDate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Home);
