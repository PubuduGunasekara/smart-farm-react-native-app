import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  FoodControllerActionONOFF,
  FoodControllerActionSpeedLevel,
  FoodControllerActionFORWARD_BACKWARD,
  FoodControllerActionCapOnOff,
} from "../../redux/actions/controllerActions/foodControllerAction";
import { addActivity } from "../../redux/actions/activityActions";
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

const FoodController = ({
  FoodControllerActionONOFF,
  FoodControllerActionSpeedLevel,
  FoodControllerActionFORWARD_BACKWARD,
  FoodControllerActionCapOnOff,
  navigation,
  loading,
  food_controller_on_off_status,
  motor_direction_status,
  food_error,
  motor_speed_status_value,
  food_cap_status,
  addActivity,
  currentUser,
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

  const [buttonEnable_food_cap_on, setbuttonEnable_food_cap_on] = useState(
    false
  );
  const [buttonEnable_food_cap_off, setbuttonEnable_food_cap_off] = useState(
    false
  );
  const [date, setDate] = useState(new Date());

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var activityDate = day + "-" + month + "-" + year;

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Warning",
          "No Internet!",
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            {
              text: "EXIT APP",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
      }
      navigation.addListener("blur", () => {
        FoodControllerActionONOFF({ motorStopStartStatus: "0" });
        FoodControllerActionFORWARD_BACKWARD({ motorDirection: "2" });
        FoodControllerActionCapOnOff({ openCloseStatus: "0" });
        FoodControllerActionSpeedLevel({ motorSpeed: "1" });
      });
    });

    // navigation.addListener("focus", () => {
    //   FoodControllerActionONOFF({ motorStopStartStatus: "0" });
    //   FoodControllerActionFORWARD_BACKWARD({ motorDirection: "2" });
    //   FoodControllerActionCapOnOff({ openCloseStatus: "2" });
    //   FoodControllerActionSpeedLevel({ motorSpeed: "1" });
    // });
    if (food_controller_on_off_status === true) {
      setbuttonEnable(false);
      setbuttonEnableON(true);
    } else {
      setbuttonEnable(true);
      setbuttonEnableON(false);
    }
    if (food_cap_status === true) {
      setbuttonEnable_food_cap_on(true);
      setbuttonEnable_food_cap_off(false);
    } else {
      setbuttonEnable_food_cap_on(false);
      setbuttonEnable_food_cap_off(true);
    }

    if (motor_direction_status === true) {
      setbuttonEnable_motor_direction_forward(true);
      setbuttonEnable_motor_direction_backward(false);
    } else {
      setbuttonEnable_motor_direction_forward(false);
      setbuttonEnable_motor_direction_backward(true);
    }
  }, [
    food_controller_on_off_status,
    motor_direction_status,
    food_cap_status,
    navigation,
  ]);

  const handleOnOff = ({ motorStopStartStatus }) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Warning",
          "No Internet!",
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            {
              text: "EXIT APP",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
      }
      if (motorStopStartStatus === "1" || motorStopStartStatus === "0") {
        FoodControllerActionSpeedLevel({ motorSpeed: "1" });
        FoodControllerActionONOFF({ motorStopStartStatus });
        FoodControllerActionFORWARD_BACKWARD({ motorDirection: "2" });
        if (motorStopStartStatus === "0") {
          FoodControllerActionCapOnOff({ openCloseStatus: "0" });
        } else {
          FoodControllerActionCapOnOff({ openCloseStatus: "2" });
        }
      }

      if (motorStopStartStatus === "1") {
        addActivity({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          accessLevel: currentUser.accessLevel,
          date: activityDate,
          type: "ON",
          message: "Food controller on",
        });
      }
      if (motorStopStartStatus === "0") {
        addActivity({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          accessLevel: currentUser.accessLevel,
          date: activityDate,
          type: "OFF",
          message: "Food controller off",
        });
      }
    });
  };

  const handleForwardBackward = ({ motorDirection }) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Warning",
          "No Internet!",
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            {
              text: "EXIT APP",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
      }

      if (motorDirection === "1" || motorDirection === "0") {
        FoodControllerActionFORWARD_BACKWARD({ motorDirection });
      }
    });
  };

  /*check this*/
  const handleSpeedLevel = ({ motorSpeed }) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Warning",
          "No Internet!",
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            {
              text: "EXIT APP",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
      }

      FoodControllerActionSpeedLevel({ motorSpeed });
    });
  };

  const handleFoodCap = ({ openCloseStatus }) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Warning",
          "No Internet!",
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel",
            // },
            {
              text: "EXIT APP",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false }
        );
      }

      FoodControllerActionCapOnOff({ openCloseStatus });
    });
  };

  if (food_error) {
    alert(food_error);
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
        title={"Food Controller"}
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, margin: 25 }}>
            <TouchableOpacity
              disabled={buttonEnableON}
              style={{
                backgroundColor: `${buttonEnableON ? `#cccccc` : `#008080`}`,
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => handleOnOff({ motorStopStartStatus: "1" })}
            >
              <Text
                style={{
                  color: `${buttonEnableON ? `#a8a8a8` : "#fff"}`,
                  fontSize: 14,
                }}
              >
                ON
              </Text>
            </TouchableOpacity>
            {/* <Button
              color="#008080"
              disabled={buttonEnableON}
              title="On"
              onPress={() => handleOnOff({ motorStopStartStatus: "1" })}
            /> */}
          </View>
          <View style={{ flex: 2, margin: 25 }}>
            <TouchableOpacity
              disabled={buttonEnable}
              style={{
                backgroundColor: `${buttonEnable ? `#cccccc` : `#008080`}`,
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => handleOnOff({ motorStopStartStatus: "0" })}
            >
              <Text
                style={{
                  color: `${buttonEnable ? `#a8a8a8` : "#fff"}`,
                  fontSize: 14,
                }}
              >
                OFF
              </Text>
            </TouchableOpacity>
            {/* <Button
              color="#008080"
              disabled={buttonEnable}
              title="Off"
              onPress={() => handleOnOff({ motorStopStartStatus: "0" })}
            /> */}
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
              marginTop: 10,
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
                color={
                  buttonEnable_motor_direction_forward === true ||
                  buttonEnable == true
                    ? "#cccccc"
                    : "#008080"
                }
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
                color={
                  buttonEnable_motor_direction_backward === true ||
                  buttonEnable == true
                    ? "#cccccc"
                    : "#008080"
                }
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
              height: 60,
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, margin: 25 }}>
            <TouchableOpacity
              disabled={buttonEnable ? buttonEnable : buttonEnable_food_cap_on}
              style={{
                backgroundColor: `${
                  buttonEnable || buttonEnable_food_cap_on
                    ? `#cccccc`
                    : `#008080`
                }`,
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => handleFoodCap({ openCloseStatus: "1" })}
            >
              <Text
                style={{
                  color: `${
                    buttonEnable || buttonEnable_food_cap_on
                      ? `#a8a8a8`
                      : "#fff"
                  }`,
                  fontSize: 14,
                }}
              >
                OPEN CAP
              </Text>
            </TouchableOpacity>
            {/* <Button
              color="#008080"
              disabled={buttonEnable ? buttonEnable : buttonEnable_food_cap_on}
              title="Open Cap"
              onPress={() => handleFoodCap({ openCloseStatus: "1" })}
            /> */}
          </View>
          <View style={{ flex: 2, margin: 25 }}>
            <TouchableOpacity
              disabled={buttonEnable ? buttonEnable : buttonEnable_food_cap_off}
              style={{
                backgroundColor: `${
                  buttonEnable || buttonEnable_food_cap_off
                    ? `#cccccc`
                    : `#008080`
                }`,
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => handleFoodCap({ openCloseStatus: "0" })}
            >
              <Text
                style={{
                  color: `${
                    buttonEnable || buttonEnable_food_cap_off
                      ? `#a8a8a8`
                      : "#fff"
                  }`,
                  fontSize: 14,
                }}
              >
                CLOSE CAP
              </Text>
            </TouchableOpacity>
            {/* <Button
              color="#008080"
              disabled={buttonEnable ? buttonEnable : buttonEnable_food_cap_off}
              title="Close Cap"
              onPress={() => handleFoodCap({ openCloseStatus: "0" })}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  food_controller_on_off_status:
    store.controllerReducer.food_controller_on_off_status,
  food_error: store.controllerReducer.food_error,
  motor_direction_status: store.controllerReducer.motor_direction_status,
  motor_speed_status_value: store.controllerReducer.motor_speed_status,
  food_cap_status: store.controllerReducer.food_cap_status,
  currentUser: store.userReducer.user,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      FoodControllerActionONOFF,
      FoodControllerActionSpeedLevel,
      FoodControllerActionFORWARD_BACKWARD,
      FoodControllerActionCapOnOff,
      addActivity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(FoodController);
