import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { viewMyShift } from "../../redux/actions/shiftActions/viewMyShiftAction";

import DateTimePicker from "@react-native-community/datetimepicker";
import { FlatList } from "react-native-gesture-handler";

import TopHeaderWithGoBack from "../../components/helperComponents/topHeaderWithGoBack";

const MyShift = ({
  viewMyShift,
  currentUser,
  myShiftData,
  myShiftEmpty,
  myShiftError,
  navigation,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  var day = date.getDate(); //change theese values
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var shiftDate = day + "-" + month + "-" + year;

  // useEffect(() => {
  //   viewMyShift({ shiftDate, accessLevel: currentUser.accessLevel });
  // }, [date]);

  const showDatepicker = () => {
    setShowDate(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);

    viewMyShift({ shiftDate, accessLevel: currentUser.accessLevel });
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"My Shifts"}
        navigationFunc={navigation.goBack}
      />

      <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
        <Text
          style={{
            flex: 1,
            textAlign: "left",
            fontSize: 18,
            justifyContent: "center",
          }}
        >
          Select Date :
        </Text>
        <View style={{ flex: 5, alignContent: "flex-start" }}>
          <Button
            color="#008080"
            onPress={showDatepicker}
            title={date.toDateString()}
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
      {myShiftData ? (
        <View>
          <Text>ID: {myShiftData.id}</Text>
          <Text>From : {myShiftData.timeFrom.toDate().toTimeString()}</Text>
          <Text>To : {myShiftData.timeTo.toDate().toTimeString()}</Text>
        </View>
      ) : (
        <View>
          <Text>No Shift found for this date</Text>
        </View>
      )}
      {/* {myShiftData ? (
        <View>
          <FlatList
            data={myShiftData}
            renderItem={(item) => {
              return (
                <View>
                  <Text>From : {item.timeFrom}</Text>
                  <Text>To : {item.timeTo}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View>
          <Text>Empty</Text>
        </View>
      )} */}

      {/* <Button
        title="press"
        onPress={() => {
          viewMyShift({ shiftDate, accessLevel: currentUser.accessLevel });
        }}
      /> */}
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
