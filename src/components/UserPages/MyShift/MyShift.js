import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

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
    console.log("inside on change", myShiftData);
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
      <TopHeaderWithGoBack
        title={"My Shifts"}
        navigationFunc={navigation.goBack}
      />

      <View style={{ flexDirection: "row", margin: 20 }}>
        <View style={{ flex: 5, alignContent: "flex-start" }}>
          <Button
            color={checkDateSelect ? "#008080" : "#000000"}
            onPress={showDatepicker}
            title={checkDateSelect ? date.toDateString() : "Select Date"}
          />
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
        <View>
          <View
            style={{
              justifyContent: "flex-start",
              alignContent: "center",
              margin: 20,
            }}
          >
            <Text>
              Start Time : {myShiftData.timeFrom.toDate().toTimeString()}
            </Text>
            <Text>End Time : {myShiftData.timeTo.toDate().toTimeString()}</Text>
          </View>
          {date.getDay() >= new Date().getDay() ? (
            <View style={{ flexDirection: "row", margin: 20 }}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 1 }}>
                <Button
                  color="#008080"
                  title="Request Shift Change"
                  onPress={() => {
                    navigation.navigate("RequestShiftChange", {
                      currentUser,
                      timeFrom: myShiftData.timeFrom,
                      timeTo: myShiftData.timeTo,
                      shiftDate: date,
                      shiftId: myShiftData.shiftId,
                    });
                  }}
                />
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
