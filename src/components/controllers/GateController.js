import React, { useState, useEffect } from "react";
import {
  View,
  Switch,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GateControllerActionOOPENCLOSE } from "../../redux/actions/controllerActions/gateControllerAction";

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
}) => {
  const [buttonEnable, setbuttonEnable] = useState(true);
  const [buttonEnableON, setbuttonEnableON] = useState(false);

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
    return alert(gate_error);
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  const handleOnOff = ({ openStatus }) => {
    if (openStatus === "1" || openStatus === "0") {
      GateControllerActionOOPENCLOSE({ openStatus });
    }
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Gate Controller"}
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
              <Button
                color="#008080"
                disabled={buttonEnableON}
                title="oPEN"
                onPress={() => handleOnOff({ openStatus: "1" })}
              />
            </View>
            <View style={{ flex: 2, margin: 25 }}>
              <Button
                color="#008080"
                disabled={buttonEnable}
                title="cLOSE"
                onPress={() => handleOnOff({ openStatus: "0" })}
              />
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
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      GateControllerActionOOPENCLOSE,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(GateController);
