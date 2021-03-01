import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  Button,
  Platform,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
// import Button from "../helperComponents/Button";
// import { colors } from "theme";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import TopHeaderWithGoBack from "../../components/helperComponents/topHeaderWithGoBack";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  centeredView: {
    padding: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    height: 100,
  },
  inputWrap: {
    flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingTop: 20,
  },
  inputData: {
    fontSize: 14,
    color: "#6a4595",
    paddingTop: 20,
  },
  inputcvv: {
    fontSize: 14,
    marginBottom: -12,
    color: "#6a4595",
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const ShiftAllocation = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [timeFrom, settimeFrom] = useState(new Date());
  const [timeTo, settimeTo] = useState(new Date());

  const [todayDate, settodayDate] = useState(new Date().getDate());
  const [todayeMonth, settodayeMonth] = useState(new Date().getMonth());
  const [todayYear, settodayYear] = useState(new Date().getFullYear());

  const [todayHRS, settodayHRS] = useState(new Date().getHours());
  const [todayeMIN, settodayeMIN] = useState(new Date().getMinutes());
  const [todaySEC, settodaySEC] = useState(new Date().getSeconds());

  const [showDate, setShowDate] = useState(false);
  const [showTimeFrom, setShowTimeFrom] = useState(false);
  const [showTimeTo, setShowTimeTo] = useState(false);

  const [isSelectedCheckBox, setSelectionCheckBox] = useState(false);

  useEffect(() => {}, [date]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    console.log(
      "Current date from on date change ",
      currentDate.toDateString()
    );
  };
  const onChangeTIMEFROM = (event, selectedTimeFrom) => {
    const current = selectedTimeFrom || date;
    setShowTimeFrom(Platform.OS === "ios");
    settimeFrom(current);
    console.log("Current time from ", current.toTimeString());
  };
  const onChangeTIMETO = (event, selectedTimeTo) => {
    const current = selectedTimeTo || date;
    setShowTimeTo(Platform.OS === "ios");
    settimeTo(current);
    console.log("Current time from to ", current.toTimeString());
  };
  console.log(
    "date state",
    date.toDateString(),
    "time from state",
    timeFrom.toTimeString(),
    "time to state",
    timeTo.toTimeString()
  );

  const showDatepicker = () => {
    setShowDate(true);
  };

  const showTimeFrompicker = () => {
    setShowTimeFrom(true);
  };

  const showTimeTopicker = () => {
    setShowTimeTo(true);
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Shift Allocation"}
        navigationFunc={navigation.goBack}
      />
      <View style={styles.centeredView}>
        <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              fontSize: 18,
              justifyContent: "center",
            }}
          >
            Date
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
            minimumDate={new Date(todayYear, todayeMonth, todayDate)}
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}

        {showTimeFrom && (
          <DateTimePicker
            minimumDate={
              new Date(
                todayYear,
                todayeMonth,
                todayDate,
                todayHRS,
                todayeMIN,
                todaySEC
              )
            }
            testID="dateTimePicker"
            value={timeFrom}
            mode="time"
            is24Hour={true}
            display="clock"
            onChange={onChangeTIMEFROM}
          />
        )}

        {showTimeTo && (
          <DateTimePicker
            minimumDate={
              new Date(
                todayYear,
                todayeMonth,
                todayDate,
                todayHRS,
                todayeMIN,
                todaySEC
              )
            }
            testID="dateTimePicker"
            value={timeTo}
            mode="time"
            is24Hour={true}
            display="clock"
            onChange={onChangeTIMETO}
          />
        )}

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                flex: 1,
                textAlign: "left",
                fontSize: 18,
                justifyContent: "center",
              }}
            >
              From
            </Text>
            <View style={{ flex: 2, alignContent: "flex-start" }}>
              <Button
                color="#008080"
                onPress={showTimeFrompicker}
                title={timeFrom.toTimeString()}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 18,
                justifyContent: "center",
              }}
            >
              To
            </Text>
            <View style={{ flex: 2, alignContent: "flex-start" }}>
              <Button
                color="#008080"
                onPress={showTimeTopicker}
                title={timeFrom.toTimeString()}
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                flex: 1,
                textAlign: "left",
                fontSize: 18,
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              Work Group
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={null}
              color="#008080"
              style={{ margin: 0, padding: 0 }}
            >
              <Picker.Item label="User 1" value="user1" />
              <Picker.Item label="User 2" value="user2" />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: "column", marginTop: 10 }}>
          <View>
            <Text
              style={{
                textAlign: "left",
                fontSize: 18,
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              Workers
            </Text>
          </View>
          <ScrollView height={300} style={{ margin: 20, marginTop: 0 }}>
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 100,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text>Name : </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    value={isSelectedCheckBox}
                    onValueChange={setSelectionCheckBox}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text>Name : </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    value={isSelectedCheckBox}
                    onValueChange={setSelectionCheckBox}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text>Name : </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    value={isSelectedCheckBox}
                    onValueChange={setSelectionCheckBox}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text>Name : </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    value={isSelectedCheckBox}
                    onValueChange={setSelectionCheckBox}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text>Name : </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    value={isSelectedCheckBox}
                    onValueChange={setSelectionCheckBox}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text>Name : </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    value={isSelectedCheckBox}
                    onValueChange={setSelectionCheckBox}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 2, marginRight: 25 }}>
            <Button color="#008080" title="Cancel" onPress={() => {}} />
          </View>
          <View style={{ flex: 2, marginLeft: 25 }}>
            <Button color="#008080" title="Submit" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShiftAllocation;
