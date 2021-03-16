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
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import moment from "moment";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showMyActivities } from "../../redux/actions/activityActions";

import DateTimePicker from "@react-native-community/datetimepicker";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

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

const MyActivities = ({
  showMyActivities,
  loading,
  myActivities,
  currentUser,
  navigation,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const [checkDateSelect, setcheckDateSelect] = useState(false);
  const [activities, setactivities] = useState(myActivities);

  useEffect(() => {
    setactivities(myActivities);
  }, [myActivities]);
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

    var activityDate = day + "-" + month + "-" + year;

    var day1 = date.getDate(); //change theese values
    var month1 = date.getMonth() + 1;
    var year1 = date.getFullYear();

    var check = day1 + "-" + month1 + "-" + year1;
    if (currentDate !== check) {
      showMyActivities({
        activityDate: activityDate,
        userId: currentUser.userId,
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: item.type === "ON" ? "#cdf0ed" : "#f9e1de",
          padding: 10,
        }}
      >
        <View>
          <Text>{item.message}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={{ color: "#cccccc" }}>
              {moment(item.createdAt.toDate()).calendar()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const showActivities = () => {
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
        }}
      >
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
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
            My Activities
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
            {/* <Button
              color={checkDateSelect ? "#008080" : "#000000"}
              title={checkDateSelect ? date.toDateString() : "Select Date"}
            /> */}
          </TouchableOpacity>
          {/* <Button
            color={checkDateSelect ? "#008080" : "#000000"}
            onPress={showDatepicker}
            title={checkDateSelect ? date.toDateString() : "Select Date"}
          /> */}
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
      <View>
        <ScrollView height="78%" style={{ marginTop: 10 }}>
          {activities.length !== 0 ? (
            <View>{showActivities()}</View>
          ) : (
            <View style={{ flex: 1 }}>
              {checkDateSelect === false ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#cccccc" }}>Select Date</Text>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#cccccc" }}>No Activity Found</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  myActivities: store.activityReducer.myActivities,
  currentUser: store.userReducer.user,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      showMyActivities,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(MyActivities);
