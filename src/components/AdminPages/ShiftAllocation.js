import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  Button,
  ActivityIndicator,
  Platform,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";

import TopHeaderWithGoBack from "../../components/helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ListUsers,
  shiftAllocate,
  success_false,
  success_false_user_list_loading_success,
} from "../../redux/actions/shiftActions/ListUsersToShiftAllocation";

import {
  ListUsersFromDateCheck,
  success_false_user_list_loading_date_success,
} from "../../redux/actions/shiftActions/ListShiftDetailsAndUpdateAction";
import {
  CheckShiftExist,
  CheckShiftExist_setFalse,
} from "../../redux/actions/shiftActions/checkShiftDate";
import { addNotifications } from "../../redux/actions/notificationActions";

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

const ShiftAllocation = ({
  navigation,
  ListUsers,
  success_false,
  shiftAllocate,
  loading,
  loadingShift,
  userList,
  userListError,
  userListSuccess,
  ListUsersFromDateCheck,
  userListDateCheck,
  CheckShiftExist,
  shiftExistStatus,
  CheckShiftExist_setFalse,
  addNotifications,
  // userListDateCheckLoadingSuccessStatus,
  // userListLoadingSuccessStatus,
  // success_false_user_list_loading_success,
  // success_false_user_list_loading_date_success,
}) => {
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

  const [WorkGroupLeve, setWorkGroupLevel] = useState("");

  const [listUsers, setListUsers] = useState([]);
  const [listUsersDateCheck, setListUsersDateCheck] = useState([]);
  const [data, setdata] = useState([]);
  const [shiftExistValue, setshiftExistValue] = useState(false);

  const [checkDateSelect, setcheckDateSelect] = useState(false);

  useEffect(() => {
    setshiftExistValue(shiftExistStatus);
    setListUsers(userList);
    setListUsersDateCheck(userListDateCheck);
    navigation.addListener("blur", () => {
      setdata([]);
      setshiftExistValue(false);
    });
    navigation.addListener("focus", () => {
      setdata([]);
      setshiftExistValue(false);
    });
  }, [
    userList,
    userListError,
    userListSuccess,
    userListDateCheck,
    shiftExistStatus,
    // userListDateCheckLoadingSuccessStatus,
    // userListLoadingSuccessStatus,
  ]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    setcheckDateSelect(true);
    setdata([]);
    setWorkGroupLevel("");
  };
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var shiftDate = day + "-" + month + "-" + year;
  const onChangeTIMEFROM = (event, selectedTimeFrom) => {
    const current = selectedTimeFrom || date;
    setShowTimeFrom(Platform.OS === "ios");
    settimeFrom(current);
  };
  const onChangeTIMETO = (event, selectedTimeTo) => {
    const current = selectedTimeTo || date;
    setShowTimeTo(Platform.OS === "ios");
    settimeTo(current);
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const showTimeFrompicker = () => {
    setShowTimeFrom(true);
  };

  const showTimeTopicker = () => {
    setShowTimeTo(true);
  };

  const mapUserList = () => {
    if (userList && userListDateCheck) {
      var flag = false;
      const List = listUsers.map((item) => {
        // console.log("user list date check", userListDateCheck);
        flag = false;
        return {
          ...item,
          selected: listUsersDateCheck.map((item2) => {
            if (item.id === item2.id) {
              flag = true;
              return "1";
            } else {
              if (flag === true) {
                return "1";
              } else {
                flag = false;
                return "2";
              }
            }
          }),
        };
      });
      const List2 = List.map((item) => {
        if (item.selected[item.selected.length - 1] == "1") {
          return {
            firstName: item.firstName,
            lastName: item.lastName,
            accessLevel: item.accessLevel,
            id: item.id,
            selected: true,
          };
        } else {
          return {
            firstName: item.firstName,
            lastName: item.lastName,
            accessLevel: item.accessLevel,
            id: item.id,
            selected: false,
          };
        }
      });
      const listSelected = List2.filter((item) => item.selected == false);
      const listSelectedWithDetails = listSelected.map((item, index) => {
        return {
          ...item,
          shiftDate: shiftDate,
          timeFrom: timeFrom,
          timeTo: timeTo,
        };
      });
      // success_false_user_list_loading_success();
      // success_false_user_list_loading_date_success();
      setdata(listSelectedWithDetails);
    }
  };

  const onValueChange = (itemSelected, index) => {
    const newData = data.map((item) => {
      if (item.id == itemSelected.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return {
        ...item,
        selected: item.selected,
      };
    });
    setdata(newData);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ marginTop: 7, flexDirection: "row", flex: 6 }}>
          <Text style={{ marginRight: 5 }}>{item.firstName}</Text>
          <Text>{item.lastName}</Text>
        </View>

        <CheckBox
          style={{ width: 40, height: 40, flex: 1 }}
          disabled={false}
          value={item.selected}
          onValueChange={() => onValueChange(item, index)}
        />
      </View>
    );
  };

  const showData = () => {
    return (
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  if (userListError) {
    alert(userListError);
  }

  if (loadingShift || loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  if (userListSuccess === true) {
    Alert.alert(
      "SUCCESS",
      "SHIFT ALLOCATION SUCCESS.",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => (success_false(), navigation.navigate("Home")),
        },
      ],
      { cancelable: false }
    );
  }

  const submitWorkGroupLevel = ({ level }) => {
    if (checkDateSelect) {
      if (level === "4") {
        return alert("Please select Work group.");
      } else {
        setWorkGroupLevel(level);
        ListUsers({ level, date: date });
        ListUsersFromDateCheck({
          shiftDate: shiftDate,
          accessLevel: level,
        });
        setdata([]);
      }
    } else {
      alert("Please select the Date first");
    }
  };

  // const submitWorkGroupLevel = ({ level }) => {
  //   if (level === "4") {
  //     return alert("Please select Work group.");
  //   } else {
  //     if (checkDateSelect) {
  //       if (level === "4") {
  //         return alert("Please select Work group.");
  //       }
  //       setWorkGroupLevel(level);
  //       ListUsers({ level, date: date });
  //       ListUsersFromDateCheck({
  //         shiftDate: shiftDate,
  //         accessLevel: level,
  //       });
  //       if (
  //         userListLoadingSuccessStatus === true &&
  //         userListDateCheckLoadingSuccessStatus === true
  //       ) {
  //         mapUserList();
  //       }
  //     } else {
  //       alert("Please select the Date first");
  //     }
  //   }

  //   // setWorkGroupLevel(level);
  //   // ListUsers({ level });
  //   // if (checkDateSelect) {
  //   //   if (level === "4") {
  //   //     return alert("Please select Work group.");
  //   //   }
  //   //   setWorkGroupLevel(level);
  //   //   ListUsers({ level, date });
  //   //   ListUsersFromDateCheck({
  //   //     shiftDate: shiftDate,
  //   //     accessLevel: level,
  //   //   });
  //   //   if (loading) {
  //   //     return (
  //   //       <View style={[styles.container, styles.horizontal]}>
  //   //         <ActivityIndicator size="large" color="#008080" />
  //   //       </View>
  //   //     );
  //   //   }
  //   //   mapUserList();
  //   // } else {
  //   //   alert("Please select the Date first");
  //   // }
  // };

  const onsubmit = () => {
    if (!data) {
      return alert("Please select work group and allocate users.");
    } else {
      const listSelected = data.filter((item) => item.selected == true);
      if (listSelected.length !== 0) {
        // alert(shiftDate);
        var min = 1;
        var max = 1000000;
        var rand = min + Math.random() * (max - min);
        var shiftId = `${rand}`;

        const listSelectedWithDate = listSelected.map((item, index) => {
          return {
            ...item,
            shiftDate: shiftDate,
            timeFrom: timeFrom,
            timeTo: timeTo,
            shiftId: shiftId,
          };
        });

        shiftAllocate({
          date: shiftDate,
          timeFrom: timeFrom,
          timeTo: timeTo,
          selectedUsersList: listSelectedWithDate,
          WorkGroupLevel: WorkGroupLeve,
          shiftId: shiftId,
        });
        listSelected.map((item) => {
          addNotifications({
            userId: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            accessLevel: item.accessLevel,
            type: "ADD",
            message: `New shift added on ${item.shiftDate}`,
          });
        });
      } else {
        return alert("Please select users.");
      }
    }
  };

  const oncancel = () => {
    if (data.length !== 0) {
      setdata([]);
    }
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Shift Allocation"}
        navigationFunc={navigation.goBack}
      />
      <View style={styles.centeredView}>
        <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              fontSize: 18,
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            Date
          </Text>
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
                marginTop: 6,
              }}
            >
              From
            </Text>
            <View style={{ flex: 2, alignContent: "flex-start" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#008080",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={showTimeFrompicker}
              >
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  {moment(timeFrom).format(" h:mm a")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 18,
                justifyContent: "center",
                marginTop: 6,
              }}
            >
              To
            </Text>
            <View style={{ flex: 2, alignContent: "flex-start" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#008080",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={showTimeTopicker}
              >
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  {moment(timeTo).format(" h:mm a")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2 }}>
              <Picker
                selectedValue={WorkGroupLeve}
                onValueChange={(level, itemIndex) => {
                  CheckShiftExist({ shiftDate, WorkGroupLevel: level });
                  submitWorkGroupLevel({ level });
                }}
                color="#008080"
                style={{ margin: 0, padding: 0 }}
              >
                <Picker.Item label="Select Access Level" value="4" />
                <Picker.Item label="Controller Admin Level" value="1" />
                <Picker.Item label="Food & Water controller Level" value="2" />
                <Picker.Item label="Cleaning Controller Level" value="3" />
              </Picker>
            </View>
            <View>
              <Button
                disabled={
                  checkDateSelect && WorkGroupLeve !== "" ? false : true
                }
                color="#008080"
                title="Show"
                onPress={() => {
                  shiftExistValue === false
                    ? mapUserList()
                    : Alert.alert(
                        "Alert",
                        "Already have a shift for this group on this day.Please view all shift and update.",
                        [
                          {
                            text: "OK",
                            onPress: () => CheckShiftExist_setFalse(),
                          },
                        ],
                        { cancelable: false }
                      );
                }}
              />
            </View>
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
          <ScrollView
            height="45%"
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
              marginTop: 10,
              marginBottom: 10,
              padding: 10,
              marginTop: 0,
            }}
          >
            <View>
              {data ? (
                <View>
                  {loading ? (
                    <View style={[styles.container, styles.horizontal]}>
                      <ActivityIndicator size="large" color="#008080" />
                    </View>
                  ) : (
                    <View>
                      {data.length !== 0 ? (
                        showData()
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
                              <Text style={{ color: "#545454" }}>
                                Select Date
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#545454",
                                  justifyContent: "center",
                                }}
                              >
                                All users of this work group has a shift for
                                this date
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#545454", justifyContent: "center" }}>
                    No Data
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 25 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                oncancel();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 25 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
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
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  userList: store.shiftReducer.userList,
  userListSuccess: store.shiftReducer.userListSuccess,
  userListError: store.shiftReducer.userListError,
  loadingShift: store.shiftReducer.loadingShift,
  userListDateCheck: store.shiftReducer.userListDateCheck,
  userListDateCheckLoadingSuccessStatus:
    store.shiftReducer.userListDateCheckLoadingSuccessStatus,
  userListLoadingSuccessStatus: store.shiftReducer.userListLoadingSuccessStatus,
  shiftExistStatus: store.shiftReducer.shiftExistStatus,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      ListUsers,
      shiftAllocate,
      success_false,
      ListUsersFromDateCheck,
      success_false_user_list_loading_success,
      success_false_user_list_loading_date_success,
      CheckShiftExist,
      CheckShiftExist_setFalse,
      addNotifications,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(ShiftAllocation);
