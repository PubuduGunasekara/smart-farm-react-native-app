import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";
import moment from "moment";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ListUsersForModify,
  UpdateModifiedShift,
  success_false,
  ListUsersFromDateCheck,
  ListDateCheckIdsFunc,
  addDateCkeckDoc,
  deleteDateCkeckDoc,
} from "../../../redux/actions/shiftActions/ListShiftDetailsAndUpdateAction";
import { addNotifications } from "../../../redux/actions/notificationActions";

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

function ModifyShiftFromRequests({
  route,
  navigation,
  userListForShiftUpdate,
  ListUsersForModify,
  UpdateModifiedShift,
  shiftModifyUpdate,
  loading,
  success_false,
  userListDateCheck,
  ListUsersFromDateCheck,
  listDateCheckIds,
  ListDateCheckIdsFunc,
  addDateCkeckDoc,
  deleteDateCkeckDoc,
  addNotifications,
}) {
  const {
    shiftId,
    accessLevel,
    shiftDate,
    timeFrom,
    timeTo,
    requestId,
  } = route.params;
  const [userList, setUserList] = useState([]);
  const [
    initialUserListWithSelected,
    setinitialUserListWithSelected,
  ] = useState([]);
  const [usersListOfAccessLevel, setUsersListOfAccessLevel] = useState([]);
  const [usersListDateChecked, setUsersListDateChecked] = useState([]);
  const [dateCkeckedIds, setDateCkeckedIds] = useState([]);
  const [requestBtnToggler, setrequestBtnToggler] = useState(false);
  useEffect(() => {
    if (userListForShiftUpdate && userListDateCheck && listDateCheckIds) {
      setUsersListOfAccessLevel(userListForShiftUpdate);
      setUsersListDateChecked(userListDateCheck);
      setDateCkeckedIds(listDateCheckIds);
    }
  }, [userListForShiftUpdate, userListDateCheck, listDateCheckIds]);

  const mapUserList = () => {
    var flag = false;
    const List = usersListOfAccessLevel.map((item) => {
      flag = false;
      return {
        ...item,
        selected: usersListDateChecked.map((item2) => {
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
    setinitialUserListWithSelected(List2);
    setUserList(List2);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  const onValueChange = (itemSelected, index) => {
    const newData = userList.map((item) => {
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

    setUserList(newData);
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
        {userList.length === 0 ? (
          <View>
            {requestBtnToggler === false ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#008080",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => {
                  ListUsersForModify({ accessLevel });
                  ListUsersFromDateCheck({ shiftDate, accessLevel });
                  ListDateCheckIdsFunc({ shiftDate, accessLevel });
                  setrequestBtnToggler(true);
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  Request Data
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "#008080",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => {
                  mapUserList();
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  Your data is ready. Click to show
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
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

  const onsubmit = () => {
    var flag = false;
    var temp = "";
    const initListWithDateCheckId = initialUserListWithSelected.map((item) => {
      flag = false;
      return {
        ...item,
        DateCheckId: dateCkeckedIds.map((item2) => {
          if (item.id === item2.userId) {
            flag = true;
            temp = item2.id;
            return item2.id;
          } else {
            if (flag === true) {
              return temp;
            } else {
              flag = false;
            }
          }
        }),
      };
    });
    var tempFlag = false;
    initListWithDateCheckId.map((item) => {
      userList.map((item2) => {
        if (item.id === item2.id) {
          if (item.selected !== item2.selected) {
            tempFlag = true;
          }
        }
      });
    });

    if (tempFlag === false) {
      alert("No changes have been made");
    } else {
      initListWithDateCheckId.map((item) => {
        userList.map((item2) => {
          if (item.id === item2.id) {
            if (item.selected !== item2.selected) {
              tempFlag = true;
              if (item.selected === true && item2.selected === false) {
                addNotifications({
                  userId: item2.id,
                  firstName: item2.firstName,
                  lastName: item2.lastName,
                  accessLevel: item2.accessLevel,
                  type: "DELETED",
                  message: `shift deleted on ${shiftDate}`,
                });
                deleteDateCkeckDoc({
                  DateCheckId: item.DateCheckId[item.DateCheckId.length - 1],
                });
              } else {
                addNotifications({
                  userId: item2.id,
                  firstName: item2.firstName,
                  lastName: item2.lastName,
                  accessLevel: item2.accessLevel,
                  type: "ADD",
                  message: `New shift added on ${shiftDate}`,
                });
                addDateCkeckDoc({
                  accessLevel: item2.accessLevel,
                  firstName: item2.firstName,
                  lastName: item2.lastName,
                  userId: item2.id,
                  shiftDate: shiftDate,
                  shiftId: shiftId,
                });
              }
            }
          }
        });
      });
      const listSelected = userList.filter((item) => item.selected == true);
      const listSelectedWithDetails = listSelected.map((item, index) => {
        return {
          ...item,
          shiftDate: shiftDate,
          timeFrom: timeFrom,
          timeTo: timeTo,
          shiftId: shiftId,
        };
      });
      UpdateModifiedShift({
        shiftId,
        selectedUsersList: listSelectedWithDetails,
      });
    }
  };

  const oncancel = () => {
    if (userList.length !== 0) {
      setUserList([]);
    }
  };

  if (shiftModifyUpdate === true) {
    Alert.alert(
      "SUCCESS",
      "SUCCESS",
      [
        {
          text: "OK",
          onPress: () => {
            success_false(), navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  }

  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  var today = day + "-" + month + "-" + year;

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Modify Shift"}
        navigationFunc={navigation.goBack}
      />
      {usersListOfAccessLevel && usersListDateChecked && dateCkeckedIds ? (
        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Shift Date :
              </Text>
            </View>
            <View>
              <Text>{shiftDate}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Time : </Text>
            </View>
            <View>
              <Text>
                From{moment(timeFrom.toDate()).format(" h:mm a")} to
                {moment(timeTo.toDate()).format(" h:mm a")}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column" }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Workers:</Text>
            </View>
            <ScrollView
              height="70%"
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
              }}
            >
              <View>{showData()}</View>
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 2, marginRight: 25 }}>
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
            <View style={{ flex: 2, marginLeft: 25 }}>
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
      ) : (
        <View>
          <Text>Loadin</Text>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  userListForShiftUpdate: store.shiftReducer.userListForShiftUpdate,
  shiftModifyUpdate: store.shiftReducer.shiftModifyUpdate,
  userListDateCheck: store.shiftReducer.userListDateCheck,
  listDateCheckIds: store.shiftReducer.listDateCheckIds,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      ListUsersForModify,
      UpdateModifiedShift,
      success_false,
      ListUsersFromDateCheck,
      ListDateCheckIdsFunc,
      addDateCkeckDoc,
      deleteDateCkeckDoc,
      addNotifications,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchProps
)(ModifyShiftFromRequests);
