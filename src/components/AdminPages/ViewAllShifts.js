import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import moment from "moment";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

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
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Shift : </Text>
          </View>
          <View>
            <Text>
              From{moment(item.timeFrom.toDate()).format(" h:mm a")} to
              {moment(item.timeTo.toDate()).format(" h:mm a")}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Access Level :
            </Text>
          </View>
          <View>
            <Text>{item.accessLevel}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              No of workers:{" "}
            </Text>
          </View>
          <View>
            <Text>{item.selectedUsersList.length}</Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate("ModifyShiftFromRequests", {
                  shiftId: item.shiftId,
                  accessLevel: item.accessLevel,
                  shiftDate: item.shiftDate,
                  timeTo: item.timeTo,
                  timeFrom: item.timeFrom,
                });
              }}
            >
              <AntDesign name="edit" size={30} color="#008080" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const showData = () => {
    return (
      <View>
        {allShiftDetails.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#cccccc" }}>No shifts found</Text>
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
      <ScrollView
        height="75%"
        style={{
          margin: 20,
          marginTop: 0,
        }}
      >
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
