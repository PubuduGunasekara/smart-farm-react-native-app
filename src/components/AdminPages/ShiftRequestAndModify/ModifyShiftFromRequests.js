import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";

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
    // ListUsersForModify({ accessLevel });
    // ListUsersFromDateCheck({ shiftDate, accessLevel });
    // ListDateCheckIdsFunc({ shiftDate, accessLevel });
    // setrequestBtnToggler(false);
    if (userListForShiftUpdate && userListDateCheck && listDateCheckIds) {
      setUsersListOfAccessLevel(userListForShiftUpdate);
      setUsersListDateChecked(userListDateCheck);
      setDateCkeckedIds(listDateCheckIds);
    }
  }, [userListForShiftUpdate, userListDateCheck, listDateCheckIds]);

  // console.log("list date ckeck ids", listDateCheckIds);
  // console.log("userListForShiftUpdate", userListForShiftUpdate);
  // console.log(shiftId, accessLevel, shiftDate, timeTo, timeFrom, requestId);

  // const mapUserList = () => {
  //   const List = userListForShiftUpdate.map((item) => {
  //     if (item.shiftDate == shiftDate) {
  //       return {
  //         ...item,
  //         selected: true,
  //       };
  //     }
  //     return {
  //       ...item,
  //       selected: false,
  //     };
  //   });
  //   setUserList(List);
  // };

  const mapUserList = () => {
    var flag = false;
    const List = usersListOfAccessLevel.map((item) => {
      // console.log("user list date check", userListDateCheck);
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
              <Button
                title="Request Data"
                onPress={() => {
                  ListUsersForModify({ accessLevel });
                  ListUsersFromDateCheck({ shiftDate, accessLevel });
                  ListDateCheckIdsFunc({ shiftDate, accessLevel });
                  setrequestBtnToggler(true);
                }}
              />
            ) : (
              <Button
                title="Your data is ready. Click to show"
                onPress={() => {
                  mapUserList();
                }}
              />
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
    // console.log("initialUserListWithSelected", initialUserListWithSelected);
    // console.log("userList", userList);
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
    console.log("date check with ids", initListWithDateCheckId);
    initListWithDateCheckId.map((item) => {
      userList.map((item2) => {
        if (item.id === item2.id) {
          if (item.selected !== item2.selected) {
            if (item.selected === true && item2.selected === false) {
              deleteDateCkeckDoc({
                DateCheckId: item.DateCheckId[item.DateCheckId.length - 1],
              });
            } else {
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

    // const List2 = List.map((item) => {
    //   if (item.selected[0] == "1") {
    //     console.log("zero", item.selected[0]);
    //     return {
    //       firstName: item.firstName,
    //       lastName: item.lastName,
    //       accessLevel: item.accessLevel,
    //       id: item.id,
    //       selected: true,
    //     };
    //   } else {
    //     console.log("one", item.selected.length);
    //     return {
    //       firstName: item.firstName,
    //       lastName: item.lastName,
    //       accessLevel: item.accessLevel,
    //       id: item.id,
    //       selected: false,
    //     };
    //   }
    // });

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
  };

  if (shiftModifyUpdate === true) {
    Alert.alert(
      "SUCCESS",
      "SUCCESS",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
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

  // if (usersListOfAccessLevel && usersListDateChecked && dateCkeckedIds) {
  //   if (shiftDate < today) {
  //     Alert.alert(
  //       "SUCCESS",
  //       "This is a old shift",
  //       [
  //         // {
  //         //   text: "Cancel",
  //         //   onPress: () => console.log("Cancel Pressed"),
  //         //   style: "cancel",
  //         // },
  //         {
  //           text: "OK",
  //           onPress: () => navigation.goBack(),
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // }

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Modify Shift"}
        navigationFunc={navigation.goBack}
      />
      {usersListOfAccessLevel && usersListDateChecked && dateCkeckedIds ? (
        <View>
          <View>
            <Text>Shift Date : {shiftDate}</Text>
            <Text>Shift Time From : {timeTo.toDate().toTimeString()}</Text>
            <Text>Shift Time To : {timeFrom.toDate().toTimeString()}</Text>
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
            <ScrollView height="45%" style={{ margin: 20, marginTop: 0 }}>
              <View>{showData()}</View>
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 2, marginRight: 25 }}>
              <Button color="#008080" title="Cancel" onPress={() => {}} />
            </View>
            <View style={{ flex: 2, marginLeft: 25 }}>
              <Button
                color="#008080"
                title="Submit"
                onPress={() => {
                  onsubmit();
                }}
              />
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchProps
)(ModifyShiftFromRequests);
