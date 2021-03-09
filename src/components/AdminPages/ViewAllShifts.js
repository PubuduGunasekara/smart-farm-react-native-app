import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";

import DateTimePicker from "@react-native-community/datetimepicker";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ViewAllShift } from "../../redux/actions/shiftActions/ViewAllShifts";

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

const ViewAllShifts = ({
  navigation,
  ViewAllShift,
  allShiftError,
  allShiftData,
  loading,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const [checkDateSelect, setcheckDateSelect] = useState(false);
  const [allShiftDetails, setAllShiftDetails] = useState([]);

  useEffect(() => {
    if (allShiftData) {
      setAllShiftDetails(allShiftData);
    }

    navigation.addListener("blur", () => {
      setAllShiftDetails([]);
      setcheckDateSelect(false);
      setDate(new Date());
    });
    navigation.addListener("focus", () => {
      setAllShiftDetails([]);
      setcheckDateSelect(false);
      setDate(new Date());
    });
  }, [allShiftData]);

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
    ViewAllShift({ shiftDate });
    console.log("inside on change", shiftDate);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  if (allShiftError) {
    alert(allShiftError);
  }

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Text>start time : {item.timeFrom.toDate().toTimeString()}</Text>
        <Text>end time : {item.timeTo.toDate().toTimeString()}</Text>
        <Text>access Level : {item.accessLevel}</Text>
        <Text>No of workers: {item.selectedUsersList.length}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              title="modify"
              onPress={() => {
                navigation.navigate("ModifyShiftFromRequests", {
                  shiftId: item.shiftId,
                  accessLevel: item.accessLevel,
                  shiftDate: item.shiftDate,
                  timeTo: item.timeTo,
                  timeFrom: item.timeFrom,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const showData = () => {
    return (
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          flex: 1,
          elevation: 100,
          margin: 20,
        }}
      >
        {allShiftDetails.length === 0 ? (
          <View>
            <Text>No shifts found</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={allShiftDetails}
              renderItem={renderItem}
              keyExtractor={(item) => item.shiftId}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"All Shifts"}
        navigationFunc={navigation.goBack}
      />
      <View style={{ margin: 20 }}>
        <Button
          color={checkDateSelect ? "#008080" : "#000000"}
          onPress={showDatepicker}
          title={checkDateSelect ? date.toDateString() : "Select Date"}
        />
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
      <ScrollView height="80%" style={{ margin: 20, marginTop: 0 }}>
        <View>{showData()}</View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  allShiftData: store.shiftReducer.allShiftData,
  allShiftError: store.shiftReducer.allShiftError,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      ViewAllShift,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(ViewAllShifts);
