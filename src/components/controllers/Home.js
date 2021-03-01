import React, { useState } from "react";
import { View, Text, Button } from "react-native";

import { connect } from "react-redux";

const Home = ({ navigation, currentUser }) => {
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
  function selectHomeStack() {
    if (currentUser.accessLevel === "0") {
      return levelZero();
    }
    if (currentUser.accessLevel === "1") {
      return levelOne();
    }
    if (currentUser.accessLevel === "2") {
      return levelTwo();
    }
    if (currentUser.accessLevel === "3") {
      return levelThree();
    }
  }

  return <View>{selectHomeStack()}</View>;
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
});

export default connect(mapStateToProps, null)(Home);
