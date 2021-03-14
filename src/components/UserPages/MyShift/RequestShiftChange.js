import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

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
  loading,
}) => {
  const { currentUser, timeFrom, timeTo, shiftDate, shiftId } = route.params;
  const [reason, setreason] = useState("");

  const onsubmit = () => {
    if (reason === "") {
      Alert.alert(
        "EMPTY FIELD",
        "Please enter your reason.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => setreason(""),
          },
        ],
        { cancelable: false }
      );
      Keyboard.dismiss();
    } else {
      RequestShiftChangeAction({
        currentUser,
        shiftId,
        timeFrom,
        timeTo,
        shiftDate,
        reason,
      });
      Keyboard.dismiss();
    }
  };

  if (shiftRequestError) {
    alert(shiftRequestError);
  }

  if (shiftRequestMessage === true) {
    Alert.alert(
      "SUCCESS",
      "Your request has beed submitted.",
      [
        {
          text: "OK",
          onPress: () => (success_false(), navigation.goBack()),
        },
      ],
      { cancelable: false }
    );
  }

  const oncancel = () => {
    if (reason !== "") {
      setreason("");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <TopHeaderWithGoBack
        title={"Request Shift Change"}
        navigationFunc={navigation.goBack}
      />
      <View style={{ margin: 20 }}>
        <View>
          <View
            style={{
              backgroundColor: "#b2d8d8",
              borderWidth: 1,
              borderRadius: 1,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              elevation: 3,
            }}
          >
            <TextInput
              editable
              multiline={true}
              numberOfLines={6}
              maxHeight={100}
              value={reason}
              placeholder="Enter your reason"
              onChangeText={(reason) => {
                setreason(reason);
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, margin: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                oncancel();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, margin: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 15,
              }}
              onPress={() => {
                onsubmit();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
