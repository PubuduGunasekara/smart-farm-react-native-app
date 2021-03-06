import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import TopHeaderWithGoBack from "../../helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  RequestShiftChangeAction,
  success_false,
} from "../../../redux/actions/shiftActions/RequestShiftChange";

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

const RequestShiftChange = ({
  route,
  navigation,
  RequestShiftChangeAction,
  shiftRequestError,
  shiftRequestMessage,
  success_false,
}) => {
  const { currentUser, timeFrom, timeTo, shiftDate, shiftId } = route.params;
  const [reason, setreason] = useState("");

  const onsubmit = () => {
    RequestShiftChangeAction({
      currentUser,
      shiftId,
      timeFrom,
      timeTo,
      shiftDate,
      reason,
    });
  };

  if (shiftRequestError) {
    alert(shiftRequestError);
  }

  if (shiftRequestMessage === true) {
    Alert.alert(
      "SUCCESS",
      "SUccessfully send shift request.",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => (success_false(), navigation.goBack()),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Request Shift Change"}
        navigationFunc={navigation.goBack}
      />
      <View>
        <Text style={{}}>Reason:</Text>
        <TextInput
          value={reason}
          placeholder="Enter reason"
          style={{ height: 50 }}
          onChangeText={(reason) => {
            setreason(reason);
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, margin: 20 }}>
          <Button title="Cancel" onPress={() => {}} />
        </View>
        <View style={{ flex: 1, margin: 20 }}>
          <Button
            title="Submit"
            onPress={() => {
              onsubmit();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  currentUser: store.userReducer.user,
  shiftRequestError: store.shiftReducer.shiftRequestError,
  shiftRequestMessage: store.shiftReducer.shiftRequestMessage,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      RequestShiftChangeAction,
      success_false,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(RequestShiftChange);
