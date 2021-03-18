import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { WaterControllerActionOPENCLOSE } from "../../redux/actions/controllerActions/waterControllerAction";

import { addActivity } from "../../redux/actions/activityActions";

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

const WaterController = ({
  navigation,
  WaterControllerActionOPENCLOSE,
  water_error,
  loading,
  water_open_close_status,
  addActivity,
  currentUser,
}) => {
  const [buttonEnable, setbuttonEnable] = useState(true);
  const [buttonEnableON, setbuttonEnableON] = useState(false);

  const [date, setDate] = useState(new Date());

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var activityDate = day + "-" + month + "-" + year;

  useEffect(() => {
    navigation.addListener("blur", () => {
      WaterControllerActionOPENCLOSE({ openStatus: "0" });
    });
    if (water_open_close_status === true) {
      setbuttonEnable(false);
      setbuttonEnableON(true);
    } else {
      setbuttonEnable(true);
      setbuttonEnableON(false);
    }

    // navigation.addListener("focus", () => {
    //   WaterControllerActionOPENCLOSE({ openStatus: "0" });
    // });
  }, [water_open_close_status, navigation]);

  if (water_error) {
    alert(water_error);
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }
  const handleOnOff = ({ openStatus }) => {
    if (openStatus === "1") {
      WaterControllerActionOPENCLOSE({ openStatus });
      addActivity({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        accessLevel: currentUser.accessLevel,
        date: activityDate,
        type: "ON",
        message: "Water Tap on",
      });
    }
    if (openStatus === "0") {
      WaterControllerActionOPENCLOSE({ openStatus });
      addActivity({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        accessLevel: currentUser.accessLevel,
        date: activityDate,
        type: "OFF",
        message: "Water Tap off",
      });
    }
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Water Controller"}
        navigationFunc={navigation.goBack}
      />
      <View
        style={{
          backgroundColor: "#b2d8d8",
          alignContent: "stretch",
          marginTop: 30,
          margin: 25,
          height: "80%",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {water_open_close_status === true ? (
            <MaterialCommunityIcons
              style={{
                marginRight: 0,
                paddingRight: 0,
              }}
              name="water-pump"
              size={80}
              color="#008080"
            />
          ) : (
            <MaterialCommunityIcons
              style={{
                marginRight: 0,
                paddingRight: 0,
              }}
              name="water-pump-off"
              size={80}
              color="#008080"
            />
          )}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2, margin: 25 }}>
              <Button
                color="#008080"
                disabled={buttonEnableON}
                title="FILL"
                onPress={() => handleOnOff({ openStatus: "1" })}
              />
            </View>
            <View style={{ flex: 2, margin: 25 }}>
              <Button
                color="#008080"
                disabled={buttonEnable}
                title="STOP"
                onPress={() => handleOnOff({ openStatus: "0" })}
              />
            </View>
          </View>
          {/* <Switch
            style={{ marginTop: 10 }}
            trackColor={{ false: "#767577", true: "white" }}
            thumbColor={isEnabled ? "#008080" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          /> */}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  water_error: store.controllerReducer.water_error,
  water_open_close_status: store.controllerReducer.water_open_close_status,
  currentUser: store.userReducer.user,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      WaterControllerActionOPENCLOSE,
      addActivity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(WaterController);
