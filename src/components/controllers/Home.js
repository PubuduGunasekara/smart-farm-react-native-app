import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

import { connect } from "react-redux";

const Home = ({ navigation, currentUser }) => {
  const [date, setdate] = useState(currentUser.shiftDate);
  const [currentDate, setcurrentDate] = useState("");
  useEffect(() => {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var shiftDate = day + "-" + month + "-" + year;
    setcurrentDate(shiftDate);

    // navigation.addListener("blur", () => {
    //   settodayDate(currentUser.shiftDate.toDate().getDate());
    //   settodayeMonth(currentUser.shiftDate.toDate().getMonth() + 1);
    //   settodayYear(currentUser.shiftDate.toDate().getFullYear());
    // });
    // navigation.addListener("focus", () => {
    //   settodayDate(currentUser.shiftDate.toDate().getDate());
    //   settodayeMonth(currentUser.shiftDate.toDate().getMonth() + 1);
    //   settodayYear(currentUser.shiftDate.toDate().getFullYear());
    // });
  }, [currentUser, navigation]);
  // console.log("date: ", todayDate, "month: ", todayeMonth, "year: ", todayYear);
  // console.log(currentUser.shiftDate.toDate());
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
    } else if (currentUser.accessLevel === "1" && date === currentDate) {
      return levelOne();
    } else if (currentUser.accessLevel === "2" && date === currentDate) {
      return levelTwo();
    } else if (currentUser.accessLevel === "3" && date === currentDate) {
      return levelThree();
    } else {
      return showMessage();
    }
  }

  return <View>{selectHomeStack()}</View>;
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
});

export default connect(mapStateToProps, null)(Home);
