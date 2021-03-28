import React, { useState, useEffect } from "react";
import {
  View,
  Switch,
  Text,
  Button,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GateControllerActionOOPENCLOSE } from "../../redux/actions/controllerActions/gateControllerAction";

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

const GateController = ({
  navigation,
  GateControllerActionOOPENCLOSE,
  gate_error,
  loading,
  gate_open_close_status,
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
    if (gate_open_close_status === true) {
      setbuttonEnable(false);
      setbuttonEnableON(true);
    } else {
      setbuttonEnable(true);
      setbuttonEnableON(false);
    }
  }, [gate_open_close_status, navigation]);

  if (gate_error) {
    alert(gate_error);
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  const handleOnOff = ({ openStatus }) => {
    // if (openStatus === "1" || openStatus === "0") {
    //   GateControllerActionOOPENCLOSE({ openStatus });

    // }

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
      if (openStatus === "1") {
        GateControllerActionOOPENCLOSE({ openStatus });
        addActivity({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          accessLevel: currentUser.accessLevel,
          date: activityDate,
          type: "ON",
          message: "Gate open",
        });
      }
      if (openStatus === "0") {
        GateControllerActionOOPENCLOSE({ openStatus });
        addActivity({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          accessLevel: currentUser.accessLevel,
          date: activityDate,
          type: "OFF",
          message: "Gate close",
        });
      }
    });
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Gate Controller"}
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
          {gate_open_close_status === true ? (
            <FontAwesome5
              style={{
                marginRight: 0,
                paddingRight: 0,
              }}
              name="door-open"
              size={80}
              color="#008080"
            />
          ) : (
            <FontAwesome5
              style={{
                marginRight: 0,
                paddingRight: 0,
              }}
              name="door-closed"
              size={80}
              color="#008080"
            />
          )}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2, margin: 25 }}>
              <TouchableOpacity
                disabled={buttonEnableON}
                style={{
                  backgroundColor: `${buttonEnableON ? `#cccccc` : `#008080`}`,
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => handleOnOff({ openStatus: "1" })}
              >
                <Text
                  style={{
                    color: `${buttonEnableON ? `#a8a8a8` : "#fff"}`,
                    fontSize: 14,
                  }}
                >
                  OPEN
                </Text>
              </TouchableOpacity>
              {/* <Button
                color="#008080"
                disabled={buttonEnableON}
                title="oPEN"
                onPress={() => handleOnOff({ openStatus: "1" })}
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
                onPress={() => handleOnOff({ openStatus: "0" })}
              >
                <Text
                  style={{
                    color: `${buttonEnable ? `#a8a8a8` : "#fff"}`,
                    fontSize: 14,
                  }}
                >
                  CLOSE
                </Text>
              </TouchableOpacity>
              {/* <Button
                color="#008080"
                disabled={buttonEnable}
                title="cLOSE"
                onPress={() => handleOnOff({ openStatus: "0" })}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  gate_error: store.controllerReducer.gate_error,
  gate_open_close_status: store.controllerReducer.gate_open_close_status,
  currentUser: store.userReducer.user,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      GateControllerActionOOPENCLOSE,
      addActivity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(GateController);
