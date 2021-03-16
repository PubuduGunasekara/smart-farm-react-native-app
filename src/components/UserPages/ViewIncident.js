import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import moment from "moment";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { viewMyIncident } from "../../redux/actions/incidentAction";
import DateTimePicker from "@react-native-community/datetimepicker";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  // },
  // horizontal: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   padding: 10,
  // },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  text: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
  },
  text1: {
    // fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 60,
    paddingTop: 10,
  },

  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
  },

  row2: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 30,
  },
  row3: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 25,
  },

  centerView: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    backgroundColor: "#b2d8d8",
  },

  box2: {
    marginTop: 30,
    height: 200,
    width: 300,
    backgroundColor: "#35B5AC",
  },
  box3: {
    marginTop: 40,
    height: 50,
    width: 320,
    backgroundColor: "#35B5AC",
  },

  input: {
    fontSize: 16,
    marginLeft: 10,
  },

  messagebox: {
    marginTop: 5,

    marginLeft: 3,
    width: 170,
  },

  dropdownbox: {
    color: "#6a4595",
    marginLeft: 10,
    width: 100,
    height: 30,
    backgroundColor: "#b2d8d8",
  },

  dropdownbox2: {
    color: "#6a4595",
    marginLeft: 10,
    width: 180,
    height: 50,
    backgroundColor: "#b2d8d8",
    // marginBottom: 20,
  },
});

const ViewIncident = ({
  incidentList,
  loading,
  viewMyIncident,
  currentUser,
  navigation,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const [checkDateSelect, setcheckDateSelect] = useState(false);
  // const [activities, setactivities] = useState(myActivities);
  const [incident, setincident] = useState([]);

  useEffect(() => {
    setincident(incidentList);
  }, [incidentList]);

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

    var incidentDate = day + "-" + month + "-" + year;

    viewMyIncident({
      // activityDate: activityDate,
      date: incidentDate,

      // userId: currentUser.uid
    });
  };

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
        <View style={{ marginBottom: 5, flexDirection: "row" }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Type : </Text>
          </View>
          <View>
            <Text>{item.issuetype}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 5, flexDirection: "row", flex: 1 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Issue : </Text>
          </View>
          <View>
            <Text style={{ flexWrap: "wrap" }} numberOfLines={5}>
              {item.message}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2, alignItems: "flex-end" }}>
            <Text style={{ color: "#a8a8a8", fontSize: 12 }}>
              {moment(item.createdAt.toDate()).calendar()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // console.log("hdhd", incidentList);

  const showIncident = () => {
    return (
      <FlatList
        data={incident}
        renderItem={renderItem}
        keyExtractor={(item) => item.IncidentId}
      />
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
            My Incident
          </Text>
        </View>
      </View>

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

      <ScrollView height="75%" style={{ padding: 20, marginTop: 0 }}>
        {incident.length !== 0 ? (
          <View>{showIncident()}</View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              margin: 20,
            }}
          >
            <Text style={{ color: "#cccccc" }}>No Incidents</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  // myActivities: store.activityReducer.myActivities,
  incidentList: store.incidentReducer.incidentList,
  currentUser: store.userReducer.user,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      viewMyIncident,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(ViewIncident);
