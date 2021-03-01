import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  CleaningControllerActionONOFF,
  CleaningControllerActionSpeedLevel,
  CleaningControllerActionFORWARD_BACKWARD,
} from "../../redux/actions/controllerActions/cleaningControllersAction";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const CleaningController = ({
  CleaningControllerActionONOFF,
  CleaningControllerActionFORWARD_BACKWARD,
  CleaningControllerActionSpeedLevel,
  navigation,
  loading,
  cleanin_controller_on_off_status,
  motor_direction_status,
  cleaning_error,
  motor_speed_status_value,
}) => {
  const [buttonEnable, setbuttonEnable] = useState(true);
  const [buttonEnableON, setbuttonEnableON] = useState(false);
  const [
    buttonEnable_motor_direction_forward,
    setbuttonEnable_motor_direction_forward,
  ] = useState(false);
  const [
    buttonEnable_motor_direction_backward,
    setbuttonEnable_motor_direction_backward,
  ] = useState(false);

  useEffect(() => {
    navigation.addListener("blur", () => {
      CleaningControllerActionONOFF({ motorStopStartStatus: "0" });
      CleaningControllerActionFORWARD_BACKWARD({ motorDirection: "2" });
      CleaningControllerActionSpeedLevel({ motorSpeed: "1" });
    });

    navigation.addListener("focus", () => {
      CleaningControllerActionONOFF({ motorStopStartStatus: "0" });
      CleaningControllerActionFORWARD_BACKWARD({ motorDirection: "2" });
      CleaningControllerActionSpeedLevel({ motorSpeed: "1" });
    });

    if (cleanin_controller_on_off_status === true) {
      setbuttonEnable(false);
      setbuttonEnableON(true);
    } else {
      setbuttonEnable(true);
      setbuttonEnableON(false);
    }
    if (motor_direction_status === true) {
      setbuttonEnable_motor_direction_forward(true);
      setbuttonEnable_motor_direction_backward(false);
    } else {
      setbuttonEnable_motor_direction_forward(false);
      setbuttonEnable_motor_direction_backward(true);
    }
  }, [cleanin_controller_on_off_status, motor_direction_status, navigation]);

  const handleOnOff = ({ motorStopStartStatus }) => {
    if (motorStopStartStatus === "1" || motorStopStartStatus === "0") {
      CleaningControllerActionSpeedLevel({ motorSpeed: "1" });
      CleaningControllerActionONOFF({ motorStopStartStatus });
      CleaningControllerActionFORWARD_BACKWARD({ motorDirection: "2" });
    }
  };

  const handleForwardBackward = ({ motorDirection }) => {
    if (motorDirection === "1" || motorDirection === "0") {
      CleaningControllerActionFORWARD_BACKWARD({ motorDirection });
    }
  };

  /*check this*/
  const handleSpeedLevel = ({ motorSpeed }) => {
    CleaningControllerActionSpeedLevel({ motorSpeed });
  };

  if (cleaning_error) {
    return alert(cleaning_error);
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
        title={"Cleaning Controller"}
        navigationFunc={navigation.goBack}
      />
      <View
        style={{
          backgroundColor: "#ddf8f8",
          alignContent: "stretch",
          marginTop: 30,
          margin: 25,
          height: "80%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, margin: 25 }}>
            <Button
              color="#008080"
              disabled={buttonEnableON}
              title="On"
              onPress={() => handleOnOff({ motorStopStartStatus: "1" })}
            />
          </View>
          <View style={{ flex: 2, margin: 25 }}>
            <Button
              color="#008080"
              disabled={buttonEnable}
              title="Off"
              onPress={() => handleOnOff({ motorStopStartStatus: "0" })}
            />
          </View>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "stretch",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: 50,
              alignContent: "stretch",
            }}
          >
            <TouchableOpacity
              disabled={
                buttonEnable
                  ? buttonEnable
                  : buttonEnable_motor_direction_forward
              }
              onPress={() => {
                handleForwardBackward({ motorDirection: "1" });
              }}
            >
              <Ionicons
                style={{
                  marginRight: 0,
                  paddingRight: 0,
                }}
                name="chevron-up-circle-outline"
                size={80}
                color="#008080"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <TouchableOpacity
              disabled={
                buttonEnable
                  ? buttonEnable
                  : buttonEnable_motor_direction_backward
              }
              onPress={() => {
                handleForwardBackward({ motorDirection: "0" });
              }}
            >
              <Ionicons
                style={{ marginRight: 0, paddingRight: 0 }}
                name="chevron-down-circle-outline"
                size={80}
                color="#008080"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <View style={{ alignItems: "center", marginTop: 25 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Speed Level : {motor_speed_status_value}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Slider
            disabled={buttonEnable}
            style={{
              width: "100%",
              height: 100,
            }}
            onValueChange={(val) => {
              handleSpeedLevel({ motorSpeed: val });
            }}
            step={1}
            minimumValue={1}
            maximumValue={4}
            thumbTintColor="#008080"
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  cleanin_controller_on_off_status:
    store.controllerReducer.cleanin_controller_on_off_status,
  cleaning_error: store.controllerReducer.cleaning_error,
  motor_direction_status: store.controllerReducer.motor_direction_status,
  motor_speed_status_value: store.controllerReducer.motor_speed_status,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      CleaningControllerActionONOFF,
      CleaningControllerActionFORWARD_BACKWARD,
      CleaningControllerActionSpeedLevel,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(CleaningController);
