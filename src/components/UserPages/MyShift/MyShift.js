import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { viewMyShift } from "../../../redux/actions/shiftActions/viewMyShiftAction";

import DateTimePicker from "@react-native-community/datetimepicker";

import TopHeaderWithGoBack from "../../helperComponents/topHeaderWithGoBack";

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

const MyShift = ({
  viewMyShift,
  currentUser,
  myShiftData,
  myShiftEmpty,
  myShiftError,
  navigation,
  loading,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const [checkDateSelect, setcheckDateSelect] = useState(false);

  useEffect(() => {}, [myShiftData]);

  const showDatepicker = () => {
    setShowDate(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    setcheckDateSelect(true);

    var day = currentDate.getDate(); //change theese values
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var shiftDate = day + "-" + month + "-" + year;

    viewMyShift({ shiftDate, accessLevel: currentUser.accessLevel });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  if (myShiftError) {
    alert(myShiftError);
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "stretch",
          marginTop: 5,
        }}
      >
        <View style={{ alignItems: "stretch", marginLeft: 20 }}></View>
        <View style={{ alignItems: "stretch" }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 0,
              paddingLeft: 0,
              marginTop: 3,
            }}
          >
            My Shift
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", margin: 20 }}>
        <View style={{ flex: 5, alignContent: "flex-start" }}>
          <TouchableOpacity
            style={{
              backgroundColor: `${checkDateSelect ? "#008080" : "#000000"}`,
              alignItems: "center",
              padding: 15,
            }}
            onPress={showDatepicker}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {checkDateSelect ? date.toDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      {myShiftData && checkDateSelect ? (
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
            marginBottom: 10,
            padding: 10,
            margin: 20,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Shift : </Text>
            </View>
            <View>
              <Text>
                From{moment(myShiftData.timeFrom.toDate()).format(" h:mm a")} to
                {moment(myShiftData.timeTo.toDate()).format(" h:mm a")}
              </Text>
            </View>
          </View>

          {date.getDay() >= new Date().getDay() ? (
            <View
              style={{
                flexDirection: "row",
                margin: 20,
                marginBottom: 0,
                marginRight: 0,
              }}
            >
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: `${
                      checkDateSelect ? "#008080" : "#000000"
                    }`,
                    alignItems: "center",
                    padding: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("RequestShiftChange", {
                      currentUser,
                      timeFrom: myShiftData.timeFrom,
                      timeTo: myShiftData.timeTo,
                      shiftDate: date,
                      shiftId: myShiftData.shiftId,
                    });
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    Request Shift Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      ) : (
        <View>
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              color: "#d3d3d3",
              margin: 20,
            }}
          >
            I cannot find any shifts. Please change the date and try again.
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  currentUser: store.userReducer.user,
  myShiftData: store.shiftReducer.myShiftData,
  myShiftEmpty: store.shiftReducer.myShiftEmpty,
  myShiftError: store.shiftReducer.myShiftError,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      viewMyShift,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(MyShift);
