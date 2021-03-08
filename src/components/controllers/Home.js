import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

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

    CheckShiftDate({ shiftDate });
    navigation.addListener("blur", () => {
      CheckShiftDate({ shiftDate });
    });
    navigation.addListener("focus", () => {
      CheckShiftDate({ shiftDate });
    });
  }, [currentUser, navigation]);

  function levelZero() {
    return (
      <View>
        <Button
          title="Cleaning Controller"
          onPress={() => {
            navigation.navigate("CleaningController");
          }}
        />
        <Button
          title="Food Controller"
          onPress={() => {
            navigation.navigate("FoodController");
          }}
        />
        <Button
          title="Gate Controller"
          onPress={() => {
            navigation.navigate("GateController");
          }}
        />
        <Button
          title="Water Controller"
          onPress={() => {
            navigation.navigate("WaterController");
          }}
        />
        <Button
          title="Approve User"
          onPress={() => {
            navigation.navigate("ApproveUser");
          }}
        />
        <Button
          title="Manage User"
          onPress={() => {
            navigation.navigate("ManageUser");
          }}
        />
        <Button
          title="Shift Allocation"
          onPress={() => {
            navigation.navigate("ShiftAllocation");
          }}
        />
        <Button
          title="Shift Change Requests"
          onPress={() => {
            navigation.navigate("ShiftChangeRequests");
          }}
        />
      </View>
    );
  }

  function levelOne() {
    return (
      <View>
        <Button
          title="Cleaning Controller"
          onPress={() => {
            navigation.navigate("CleaningController");
          }}
        />
        <Button
          title="Food Controller"
          onPress={() => {
            navigation.navigate("FoodController");
          }}
        />
        <Button
          title="Gate Controller"
          onPress={() => {
            navigation.navigate("GateController");
          }}
        />
        <Button
          title="Water Controller"
          onPress={() => {
            navigation.navigate("WaterController");
          }}
        />
      </View>
    );
  }

  function levelTwo() {
    return (
      <View>
        <Button
          title="Cleaning Controller"
          onPress={() => {
            navigation.navigate("CleaningController");
          }}
        />
        <Button
          title="Gate Controller"
          onPress={() => {
            navigation.navigate("GateController");
          }}
        />
      </View>
    );
  }

  function levelThree() {
    return (
      <View>
        <Button
          title="Food Controller"
          onPress={() => {
            navigation.navigate("FoodController");
          }}
        />
        <Button
          title="Gate Controller"
          onPress={() => {
            navigation.navigate("GateController");
          }}
        />
        <Button
          title="Water Controller"
          onPress={() => {
            navigation.navigate("WaterController");
          }}
        />
      </View>
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
      <View>
        <Text
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Please check My Shift tab for your SHIFT DETAILS.
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
